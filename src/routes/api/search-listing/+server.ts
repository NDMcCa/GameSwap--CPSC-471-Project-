import { getGameListings } from "$lib/controllers/listingController";
import type { SearchListingRequest } from "$lib/models/SearchListingRequest";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {
  const searchOptions: SearchListingRequest = {
    title: url.searchParams.get("title") ?? undefined,
    seller: url.searchParams.get("seller") ?? undefined,
    searchCategory: url.searchParams.get("searchCategory") ?? undefined,
    searchPlatform: url.searchParams.get("searchPlatform") ?? undefined,
  };

  if (searchOptions.title && searchOptions.seller) {
    return new Response(
      JSON.stringify({
        message: "Searching by title and seller must be mutually exclusive",
      }),
      {
        status: 400,
      }
    );
  }

  const listings = await getGameListings(
    searchOptions.searchCategory,
    searchOptions.searchPlatform,
    searchOptions.title,
    searchOptions.seller
  );

  if (!listings) {
    return new Response(
      JSON.stringify({ message: "Failed to retrieve listings" }),
      {
        status: 500,
      }
    );
  }

  return new Response(JSON.stringify(listings), {
    status: 200,
  });
};
