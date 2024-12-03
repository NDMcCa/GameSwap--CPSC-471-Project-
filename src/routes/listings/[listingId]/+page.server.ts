import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import type { SellerModel } from "$lib/models/SellerModel";
import {
  getGameListingById,
  getGameListingCategories,
  getGameListingPlatforms,
} from "$lib/controllers/listingController";
import { UserVariant } from "$lib/models/UserVariant";
import { getOffers } from "$lib/controllers/offerController";

export const load: ServerLoad = async ({ cookies, params }) => {
  if (!params.listingId) {
    throw redirect(400, "/");
  }

  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  const listingId = parseInt(params.listingId);

  if (isNaN(listingId)) {
    throw redirect(400, "/");
  }

  let sellerOffers = undefined;

  if (token?.variant === UserVariant.SELLER) {
    sellerOffers = await getOffers((token.user as SellerModel).seller_id);
  }

  const listing = await getGameListingById(listingId);
  const categories = await getGameListingCategories();
  const platforms = await getGameListingPlatforms();

  if (!listing) {
    throw redirect(404, "/");
  }

  return { token, listing, categories, platforms, sellerOffers };
};
