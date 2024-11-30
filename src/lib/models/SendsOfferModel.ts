import type { BuyerModel } from "./BuyerModel";

export interface SendsOfferModel {
  buyer: number;
  seller: number;
  offer_comment: string;
}

export type JoinedOfferModel = SendsOfferModel & BuyerModel;
