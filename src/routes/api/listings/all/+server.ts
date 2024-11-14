import { getAllGameListings } from "$lib/controllers/listingController";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async () => {
  const allListings = await getAllGameListings();

  if (allListings === undefined) {
    return new Response("Internal server error", { status: 500 });
  }

  return new Response(JSON.stringify(allListings), { status: 200 });
};
