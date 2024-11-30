import type { GameListingModel } from "./GameListingModel";
import type { SellerModel } from "./SellerModel";

export interface TransactionModel {
  recorded_seller: number;
  recorded_buyer: number;
  for_listing: number;
  timestamp: string;
}

export type JoinedTransactionModel = TransactionModel &
  SellerModel &
  GameListingModel;
