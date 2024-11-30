import type { BuyerModel } from "./BuyerModel";
import type { SellerModel } from "./SellerModel";

export interface TransactionModel {
  recorded_seller: number;
  recorded_buyer: number;
  for_listing: number;
  timestamp: string;
}

export type JoinedSellerTransactionModel = TransactionModel & SellerModel;
export type JoinedBuyerTransactionModel = TransactionModel & BuyerModel;
