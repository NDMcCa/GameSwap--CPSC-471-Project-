import { getGameListingsBySellerUsername } from "$lib/controllers/listingController";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ params }) => {
  const { sellerUsername } = params;

  if (sellerUsername) {
    const sellerListings = await getGameListingsBySellerUsername(
      sellerUsername
    );

    if (sellerListings === undefined) {
      return new Response("Internal server error", { status: 500 });
    }

    return new Response(JSON.stringify(sellerListings), { status: 200 });
  } else {
    return new Response("No seller username provided", { status: 400 });
  }
};
