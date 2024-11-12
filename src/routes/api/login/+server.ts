import {
  authenticateBuyer,
  authenticateModerator,
  authenticateSeller,
} from "$lib/controllers/userController";
import { generateToken, verifyToken } from "$lib/jwt";
import type { AuthRequest } from "$lib/models/AuthRequest";
import type { AuthResponse } from "$lib/models/AuthResponse";
import type { BuyerModel } from "$lib/models/BuyerModel";
import type { ModeratorModel } from "$lib/models/ModeratorModel";
import type { SellerModel } from "$lib/models/SellerModel";
import type { RequestHandler } from "@sveltejs/kit";

type UserType = ModeratorModel | BuyerModel | SellerModel;

export const POST: RequestHandler = async ({ request, url }) => {
  const { usernameOrEmail, password, token } =
    (await request.json()) as AuthRequest;

  if (!usernameOrEmail || !password) {
    return new Response(
      JSON.stringify({
        error: "Invalid username, email, or password",
      }),
      { status: 400 }
    );
  }

  if (token) {
    const user = verifyToken<UserType>(token);

    // The token was value so we can just send the user back
    // Otherwise, we will try to authenticate the user through the database
    if (user) {
      const res: AuthResponse = {
        user,
        token,
      };

      return new Response(JSON.stringify(res), { status: 200 });
    }
  }

  let user: UserType | undefined;
  let userType: string = "";

  if (url.pathname.includes("moderator")) {
    userType = "moderator";
    user = await authenticateModerator(usernameOrEmail, password);
  } else if (url.pathname.includes("buyer")) {
    userType = "buyer";
    user = await authenticateBuyer(usernameOrEmail, password);
  } else if (url.pathname.includes("seller")) {
    userType = "seller";
    user = await authenticateSeller(usernameOrEmail, password);
  } else {
    return new Response(
      JSON.stringify({
        error: "Invalid user type",
      }),
      { status: 400 }
    );
  }

  if (!user) {
    return new Response(
      JSON.stringify({
        error: `A ${userType} with that username or email and password was not found`,
      }),
      { status: 404 }
    );
  }

  const newToken = generateToken(user);
  const res: AuthResponse = {
    user,
    token: newToken,
  };

  return new Response(JSON.stringify(res), { status: 200 });
};
