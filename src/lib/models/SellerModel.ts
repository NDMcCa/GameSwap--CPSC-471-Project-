import type { ModeratorModel } from "./ModeratorModel";

export interface SellerModel {
  seller_id: number;
  password_hash: string;
  email: string;
  city: string;
  username: string;
  avg_rating: number;
}

export type BannedSellerModel = SellerModel & ModeratorModel & {
  banned_user: string;
  banning_moderator: string;
};