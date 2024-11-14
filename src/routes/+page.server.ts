import { type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { getAllGameListings } from "$lib/controllers/listingController";

export const load: ServerLoad = async ({ cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  const allListings = await getAllGameListings();

  return { token, listings: allListings };
};
