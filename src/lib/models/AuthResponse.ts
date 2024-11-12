import type { BuyerModel } from "./BuyerModel";
import type { ModeratorModel } from "./ModeratorModel";
import type { SellerModel } from "./SellerModel";

export interface AuthResponse {
  user: ModeratorModel | BuyerModel | SellerModel;
  token: string;
}
