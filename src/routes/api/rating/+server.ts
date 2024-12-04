
import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import type { RequestHandler } from "@sveltejs/kit";
import type { CreateRatingResponse, CreateSellerRating } from "$lib/models/SellerRating";
import { insertRating, updateAverageRating } from "$lib/controllers/userController";
  
  
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

    // Required to update the average rating of the seller right away
    // Checking for success is unimportant as the average will eventually update anyway
    const result2 = await updateAverageRating(
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
  