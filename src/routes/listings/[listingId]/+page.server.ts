import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { getGameListingById } from "$lib/controllers/listingController";

export const load: ServerLoad = async ({ cookies, params }) => {
  if (!params.listingId) {
    throw redirect(400, "/");
  }

  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  const listingId = parseInt(params.listingId);

  if (isNaN(listingId)) {
    throw redirect(400, "/");
  }

  const listing = await getGameListingById(listingId);

  if (!listing) {
    throw redirect(404, "/");
  }

  return { token, listing };
};
