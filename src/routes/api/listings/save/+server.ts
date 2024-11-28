import { updateGameListing } from "$lib/controllers/listingController";
import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import type { SaveListingRequest } from "$lib/models/CreateListingRequest";
import type { SellerModel } from "$lib/models/SellerModel";
import type { RequestHandler } from "@sveltejs/kit";

export const PATCH: RequestHandler = async ({ request, cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (!token || token.variant != UserVariant.SELLER) {
    return new Response(JSON.stringify({ message: "Not Authorized" }), {
      status: 401,
    });
  }

  const user = token.user as SellerModel;
  const body = (await request.json()) as SaveListingRequest;

  const result = await updateGameListing(
    user.seller_id,
    body.listingId,
    body.title,
    body.description,
    body.price,
    body.platform,
    body.category
  );

  if (result) {
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
