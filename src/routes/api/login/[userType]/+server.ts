import {
  authenticateBuyer,
  authenticateModerator,
  authenticateSeller,
  UserVariant,
  type UserType,
} from "$lib/controllers/userController";
import {
  generateToken,
  jwtCookieHeader,
  verifyToken,
  type TokenContent,
} from "$lib/jwt";
import type { AuthRequest } from "$lib/models/AuthRequest";
import type { AuthResponse } from "$lib/models/AuthResponse";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, params }) => {
  const { usernameOrEmail, password, token } =
    (await request.json()) as AuthRequest;

  if (params.userType == "token" && token) {
    const tokenContent = verifyToken<TokenContent>(token);

    // The token was value so we can just send the user back
    // Otherwise, we will try to authenticate the user through the database
    if (tokenContent) {
      const res: AuthResponse = {
        serializedToken: token,
        tokenContent,
      };

      return new Response(JSON.stringify(res), { status: 200 });
    }
  }

  if (!usernameOrEmail || !password) {
    return new Response(
      JSON.stringify({
        message: "Invalid username, email, or password",
      }),
      { status: 400 }
    );
  }

  let user: UserType | undefined;
  let userType: UserVariant;

  if (params.userType == "moderator") {
    userType = UserVariant.MODERATOR;
    user = await authenticateModerator(usernameOrEmail, password);
  } else if (params.userType == "buyer") {
    userType = UserVariant.BUYER;
    user = await authenticateBuyer(usernameOrEmail, password);
  } else if (params.userType == "seller") {
    userType = UserVariant.SELLER;
    user = await authenticateSeller(usernameOrEmail, password);
  } else {
    return new Response(
      JSON.stringify({
        message: "Invalid user type",
      }),
      { status: 400 }
    );
  }

  if (!user) {
    return new Response(
      JSON.stringify({
        message: `A ${userType} with that username or email and password was not found`,
      }),
      { status: 404 }
    );
  }

  const tokenContent: TokenContent = {
    user,
    variant: userType,
  };

  const newToken = generateToken(tokenContent);
  const res: AuthResponse = {
    tokenContent,
    serializedToken: newToken,
  };

  return new Response(JSON.stringify(res), {
    status: 200,
    headers: {
      "Set-Cookie": jwtCookieHeader(newToken),
    },
  });
};
