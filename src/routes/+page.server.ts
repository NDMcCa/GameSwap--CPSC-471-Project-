import { type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { type SellerModel } from "$lib/models/SellerModel";
import { type BuyerModel } from "$lib/models/BuyerModel";
import {
  getGameListingCategories,
  getGameListingPlatforms,
  getGameListings,
} from "$lib/controllers/listingController";
import { UserVariant } from "$lib/models/UserVariant";
import { getOffers } from "$lib/controllers/offerController";
import { getBuyerTransactions } from "$lib/controllers/transactionController";

export const load: ServerLoad = async ({ cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  let receivedOffers = undefined;
  let buyerTransactions = undefined;

  if (token) {
    switch (token.variant) {
      case UserVariant.BUYER:
        const buyer = token.user as BuyerModel;
        buyerTransactions = await getBuyerTransactions(buyer.buyer_id);

        if (!buyerTransactions) {
          throw new Error("Failed to fetch buyer transactions");
        }

        break;
      case UserVariant.SELLER:
        const seller = token.user as SellerModel;
        receivedOffers = await getOffers(seller.seller_id);

        if (!receivedOffers) {
          throw new Error("Failed to fetch seller offers");
        }

        break;
      default:
        break;
    }
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

  return {
    token,
    listings,
    categories,
    platforms,
    receivedOffers,
    buyerTransactions,
  };
};
