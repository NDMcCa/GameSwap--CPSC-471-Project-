import { getGameListings } from "$lib/controllers/listingController";
import type { SearchListingRequest } from "$lib/models/SearchListingRequest";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ params }) => {
  const { title, seller, searchCategory, searchPlatform } =
    params as unknown as SearchListingRequest;

  if (title && seller) {
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
    searchCategory,
    searchPlatform,
    title,
    seller
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
