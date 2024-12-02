import pool from "$lib/db";
import type { JoinedOfferModel } from "$lib/models/SendsOfferModel";

export const getOffers = async (
  sellerId: number
): Promise<JoinedOfferModel[] | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM SENDS_OFFER_TO JOIN BUYER ON SENDS_OFFER_TO.buyer = BUYER.buyer_id WHERE seller = ?",
      [sellerId]
    );

    return result[0] as JoinedOfferModel[];
  } catch (_) {
    return undefined;
  }
};

export const deleteOffer = async (
  buyerId: number,
  sellerId: number
): Promise<boolean> => {
  try {
    console.log(buyerId, sellerId);
    const [result] = await pool.query(
      "DELETE FROM SENDS_OFFER_TO WHERE buyer = ? AND seller = ?",
      [buyerId, sellerId]
    );

    return (result as any).affectedRows > 0;
  } catch (_) {
    return false;
  }
};
