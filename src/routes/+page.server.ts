import { type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { type SellerModel } from "$lib/models/SellerModel";
import {
  getGameListingCategories,
  getGameListingPlatforms,
  getGameListings,
} from "$lib/controllers/listingController";
import { UserVariant } from "$lib/models/UserVariant";
import { getOffers } from "$lib/controllers/offerController";

export const load: ServerLoad = async ({ cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  let receivedOffers = undefined;

  if (token && token.variant === UserVariant.SELLER) {
    const seller = token.user as SellerModel;
    receivedOffers = await getOffers(seller.seller_id);
  }

  const categories = await getGameListingCategories();
  const platforms = await getGameListingPlatforms();
  const listings = await getGameListings(
    undefined,
    undefined,
    undefined,
    undefined
  );

  if (!listings || !categories || !platforms) {
    throw new Error("Failed to fetch data");
  }

  return { token, listings, categories, platforms, receivedOffers };
};
