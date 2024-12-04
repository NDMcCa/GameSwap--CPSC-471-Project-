  import { editUser } from "$lib/controllers/userController";
  import { emailRegex } from "$lib/regex";
  import { verifyToken, type TokenContent } from "$lib/jwt";
  import type { EditProfileRequest } from "$lib/models/EditProfileRequest";
  import type { RequestHandler } from "@sveltejs/kit";
  import { UserVariant } from "$lib/models/UserVariant";
  
  export const POST: RequestHandler = async ({ request, params, cookies }) => {
    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
    if (!token) {
      return new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        { status: 401 }
      );
    }
    const { email, city } =
      (await request.json()) as EditProfileRequest;
  
    // Error checking
    if (!email && !city) {
      return new Response(
        JSON.stringify({
          message: "Invalid; fields cannot be empty",
        }),
        { status: 400 }
      );
    }
  
    // Validate email with regex
    if (email && !emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          message: "Invalid email",
        }),
        { status: 400 }
      );
    }

    let userType: UserVariant;
    let user_id: number;

    if (params.userType == "BUYER" && 'buyer_id' in token.user) {
        userType = UserVariant.BUYER;
        user_id = token.user.buyer_id;
    } else if (params.userType == "SELLER" && 'seller_id' in token.user) {
        userType = UserVariant.SELLER;
        user_id = token.user.seller_id;
    } else if (params.userType == "MODERATOR" && 'moderator_id' in token.user) {
        userType = UserVariant.MODERATOR;
        user_id = token.user.moderator_id;
    } else {
      return new Response(
        JSON.stringify({
          message: `${params.userType} is not a valid user type`,
        }),
        { status: 400 }
      );
    }

    const result = await editUser(user_id, userType, email, city);
  
    if (result) {
        return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        });
    }
  };
  