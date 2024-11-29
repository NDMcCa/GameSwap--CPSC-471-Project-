import pool from "$lib/db";
import type { JoinedOfferModel } from "$lib/models/SendsOfferModel";

export const getOffers = async (
  sellerId: number
): Promise<JoinedOfferModel[] | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM SENDS_OFFER JOIN BUYER ON SENDS_OFFER.buyer = BUYER.buyer_id WHERE seller = ?",
      [sellerId]
    );

    return result[0] as JoinedOfferModel[];
  } catch (_) {
    return undefined;
  }
};
