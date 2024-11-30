import pool from "$lib/db";
import type { JoinedTransactionModel } from "$lib/models/TransactionModel";

export const getBuyerTransactions = async (
  buyerId: number
): Promise<JoinedTransactionModel[] | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM TRANSACTION JOIN SELLER ON TRANSACTION.recorded_seller = SELLER.seller_id JOIN GAME_LISTING ON TRANSACTION.for_listing = GAME_LISTING.listing_id WHERE recorded_buyer = ?",
      [buyerId]
    );

    return result[0] as JoinedTransactionModel[];
  } catch (_) {
    return undefined;
  }
};
