import pool from "$lib/db";
import type {
  JoinedBuyerTransactionModel,
  JoinedSellerTransactionModel,
} from "$lib/models/TransactionModel";

export const getSellerTransactions = async (
  sellerId: number
): Promise<JoinedSellerTransactionModel[] | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM TRANSACTION JOIN SELLER ON TRANSACTION.recorded_seller = SELLER.seller_id WHERE recorded_seller = ?",
      [sellerId]
    );

    return result[0] as JoinedSellerTransactionModel[];
  } catch (_) {
    return undefined;
  }
};

export const getBuyerTransactions = async (
  buyerId: number
): Promise<JoinedBuyerTransactionModel[] | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM TRANSACTION JOIN BUYER ON TRANSACTION.recorded_buyer = BUYER.buyer_id WHERE recorded_buyer = ?",
      [buyerId]
    );

    return result[0] as JoinedBuyerTransactionModel[];
  } catch (_) {
    return undefined;
  }
};
