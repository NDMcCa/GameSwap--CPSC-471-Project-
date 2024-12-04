
import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import type { RequestHandler } from "@sveltejs/kit";
import type { CreateRatingResponse, CreateSellerRating } from "$lib/models/SellerRating";
import { insertRating } from "$lib/controllers/userController";
  
  
  export const POST: RequestHandler = async ({ request, cookies }) => {
    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  
    if (token?.variant != UserVariant.BUYER) {
      return new Response(JSON.stringify({ message: "Not Authorized" }), {
        status: 401,
      });
    }
  
    const body = (await request.json()) as CreateSellerRating;
  
    const result = await insertRating(
      body.rating,
      body.description,
      body.written_by,
      body.written_for
    );
  
    if (result) {
      const res: CreateRatingResponse = {
        insertedId: result,
      };
  
      return new Response(JSON.stringify(res), { status: 201 });
    } else {
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
      });
    }
  };
  