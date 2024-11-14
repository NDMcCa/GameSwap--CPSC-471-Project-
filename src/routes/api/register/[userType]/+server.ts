import {
  hashPassword,
  insertBuyer,
  insertSeller,
  UserVariant,
  type UserType,
} from "$lib/controllers/userController";
import { emailRegex } from "$lib/regex";
import type { RegisterRequest } from "$lib/models/RegisterRequest";
import type { RequestHandler } from "@sveltejs/kit";
import { generateToken, type TokenContent } from "$lib/jwt";
import type { AuthResponse } from "$lib/models/AuthResponse";

export const POST: RequestHandler = async ({ request, params }) => {
  const { username, password, email, city } =
    (await request.json()) as RegisterRequest;

  // Error checking
  if (!username || !password || !email || !city) {
    return new Response(
      JSON.stringify({
        message: "Invalid username, email, password, or city",
      }),
      { status: 400 }
    );
  }

  // Validate email with regex
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({
        message: "Invalid email",
      }),
      { status: 400 }
    );
  }

  let user: UserType | undefined;
  let userType: UserVariant;

  const passwordHash = await hashPassword(password);

  if (params.userType == "buyer") {
    userType = UserVariant.BUYER;
    user = await insertBuyer(username, email, passwordHash, city);
  } else if (params.userType == "seller") {
    userType = UserVariant.SELLER;
    user = await insertSeller(username, email, passwordHash, city);
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
        message: "A user with those credentials already exists",
      }),
      { status: 400 }
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

  return new Response(JSON.stringify(res), { status: 200 });
};