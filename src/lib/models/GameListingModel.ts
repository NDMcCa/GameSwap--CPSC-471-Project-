import type { GameCategoryModel } from "./GameCategoryModel";
import type { GamePlatformModel } from "./GamePlatformModel";
import type { SellerModel } from "./SellerModel";

export interface GameListingModel {
  listing_id: number;
  description: string;
  title: string;
  price: number;
  is_sold: boolean;
  platform: string;
  category: string;
}

export type JoinedGameListingModel = GameListingModel &
  SellerModel &
  GamePlatformModel &
  GameCategoryModel & {
    platform_description: string;
  } & {
    category_description: string;
  };
