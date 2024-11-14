import { type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import {
  getGameListingCategories,
  getGameListingPlatforms,
  getGameListings,
} from "$lib/controllers/listingController";

export const load: ServerLoad = async ({ cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  const listings = await getGameListings(
    undefined,
    undefined,
    undefined,
    undefined
  );
  const categories = await getGameListingCategories();
  const platforms = await getGameListingPlatforms();

  if (!listings || !categories || !platforms) {
    throw new Error("Failed to fetch data");
  }

  return { token, listings, categories, platforms };
};
