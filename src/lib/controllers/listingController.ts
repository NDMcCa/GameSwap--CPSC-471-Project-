import pool from "$lib/db";
import type { GameListingModel } from "$lib/models/GameListingModel";
import type { SellerModel } from "$lib/models/SellerModel";

export const getAllGameListings = async (): Promise<
  (GameListingModel & SellerModel)[] | undefined
> => {
  try {
    const result = await pool.query(
      "SELECT * FROM GAME_LISTING JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id"
    );

    return result[0] as (GameListingModel & SellerModel)[];
  } catch (_) {
    return undefined;
  }
};

export const getGameListingsByTitle = async (
  gameTitle: string
): Promise<(GameListingModel & SellerModel)[] | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM GAME_LISTING JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id WHERE game LIKE ?",
      [gameTitle]
    );

    return result[0] as (GameListingModel & SellerModel)[];
  } catch (_) {
    return undefined;
  }
};

export const getGameListingsBySellerUsername = async (
  sellerUsername: string
): Promise<(GameListingModel & SellerModel)[] | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM GAME_LISTING JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id WHERE username LIKE ?",
      [sellerUsername]
    );

    return result[0] as (GameListingModel & SellerModel)[];
  } catch (_) {
    return undefined;
  }
};
