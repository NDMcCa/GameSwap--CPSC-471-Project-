import pool from "$lib/db";
import type { GameCategoryModel } from "$lib/models/GameCategoryModel";
import type { JoinedGameListingModel } from "$lib/models/GameListingModel";
import type { GamePlatformModel } from "$lib/models/GamePlatformModel";

export const getGameListings = async (
  category: string | undefined,
  platform: string | undefined,
  title: string | undefined,
  seller: string | undefined
): Promise<JoinedGameListingModel[] | undefined> => {
  try {
    let query =
      "SELECT GAME_LISTING.*, SELLER.*, GAME_CATEGORY.description AS category_description, GAME_PLATFORM.description AS platform_description FROM GAME_LISTING JOIN SELLER ON GAME_LISTING.posted_by = SELLER.seller_id JOIN GAME_CATEGORY ON GAME_LISTING.category = GAME_CATEGORY.category_name JOIN GAME_PLATFORM ON GAME_LISTING.platform = GAME_PLATFORM.platform_name";

    if (category || platform || title || seller) {
      query += " WHERE";

      if (category) {
        query += ` category_name LIKE '%${category}%'`;
      }

      if (platform) {
        query += ` platform_name LIKE '%${platform}%'`;
      }

      if (title) {
        query += ` game LIKE '%${title}%'`;
      }

      if (seller) {
        query += ` username LIKE '%${seller}%'`;
      }
    }

    query += " ORDER BY listing_id DESC";

    const result = await pool.query(query);

    return result[0] as JoinedGameListingModel[];
  } catch (_) {
    return undefined;
  }
};

export const insertGameListing = async (
  title: string,
  description: string,
  price: number,
  posted_by: number,
  platform: string,
  category: string
): Promise<number | undefined> => {
  try {
    const result = await pool.query(
      "INSERT INTO GAME_LISTING (title, description, price, posted_by, platform, category) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, price, posted_by, platform, category]
    );

    return (result[0] as any).insertId as number;
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

export const getGameListingCategories = async (): Promise<
  GameCategoryModel[] | undefined
> => {
  try {
    const result = await pool.query("SELECT * FROM GAME_CATEGORY");

    return result[0] as GameCategoryModel[];
  } catch (_) {
    return undefined;
  }
};

export const getGameListingPlatforms = async (): Promise<
  GamePlatformModel[] | undefined
> => {
  try {
    const result = await pool.query("SELECT * FROM GAME_PLATFORM");

    return result[0] as GamePlatformModel[];
  } catch (_) {
    return undefined;
  }
};
