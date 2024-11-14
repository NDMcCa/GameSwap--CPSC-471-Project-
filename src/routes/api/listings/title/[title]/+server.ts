import { getGameListingsByTitle } from "$lib/controllers/listingController";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ params }) => {
  const { title } = params;

  if (title) {
    const listings = await getGameListingsByTitle(title);

    if (listings === undefined) {
      return new Response("Internal server error", { status: 500 });
    }

    return new Response(JSON.stringify(listings), { status: 200 });
  } else {
    return new Response("No game title provided", { status: 400 });
  }
};
