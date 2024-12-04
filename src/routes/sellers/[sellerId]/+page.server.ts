import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { getSellerById } from "$lib/controllers/userController";
import { getGameListingsBySellerId } from "$lib/controllers/listingController";

export const load: ServerLoad = async ({ cookies, params }) => {
  if (!params.sellerId) {
    console.log(params.sellerId);
    throw redirect(400, "/");
  }

  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  const sellerId = parseInt(params.sellerId);

  if (isNaN(sellerId)) {
    throw redirect(400, "/");
  }

  const seller = await getSellerById(sellerId);
  const sellerListings = await getGameListingsBySellerId(sellerId);

  if (!seller) {
    throw redirect(404, "/");
  }

  return { token, seller, sellerListings };
};
