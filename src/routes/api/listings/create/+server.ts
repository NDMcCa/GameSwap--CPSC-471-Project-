import { insertGameListing } from "$lib/controllers/listingController";
import { verifyToken, type TokenContent } from "$lib/jwt";
import type { CreateListingRequest } from "$lib/models/CreateListingRequest";
import type { CreateListingResponse } from "$lib/models/CreateListingResponse";
import type { SellerModel } from "$lib/models/SellerModel";
import { UserVariant } from "$lib/models/UserVariant";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (token?.variant != UserVariant.SELLER) {
    return new Response(JSON.stringify({ message: "Not Authorized" }), {
      status: 401,
    });
  }

  const seller = token.user as SellerModel;
  const body = (await request.json()) as CreateListingRequest;

  const result = await insertGameListing(
    body.title,
    body.description,
    body.price,
    seller.seller_id,
    body.platform,
    body.category
  );

  if (result) {
    const res: CreateListingResponse = {
      insertedId: result,
    };

    return new Response(JSON.stringify(res), { status: 201 });
  } else {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
