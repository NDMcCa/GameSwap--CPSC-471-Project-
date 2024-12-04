import pool from "$lib/db";
import bcrypt from "bcrypt";
import { UserVariant } from "$lib/models/UserVariant";
import type { BuyerModel } from "$lib/models/BuyerModel";
import type { ModeratorModel } from "$lib/models/ModeratorModel";
import type { BannedSellerModel, SellerModel } from "$lib/models/SellerModel";
import type { RowDataPacket } from "mysql2";

export type UserType = ModeratorModel | BuyerModel | SellerModel;

const authenticateUser = async (
  userVariant: UserVariant,
  usernameOrEmail: string,
  plaintextPassword: string
): Promise<UserType | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM ?? WHERE username = ? OR email = ?",
      [UserVariant[userVariant], usernameOrEmail, usernameOrEmail]
    );

    const users = result[0] as UserType[];

    if (users.length === 0) {
      return undefined;
    }

    const user = users[0];

    if (!(await bcrypt.compare(plaintextPassword, user.password_hash))) {
      return undefined;
    }

    if (userVariant === UserVariant.SELLER) {
      const seller = user as SellerModel;
      const banCheck = await pool.query(
        "SELECT * FROM BAN_LIST WHERE target_seller = ?",
        [seller.seller_id]
      ); 

      const bans = banCheck[0] as any[];
      if (bans.length > 0) {
        return undefined; // Seller is banned
      }
  
    }

    return users[0];
  } catch (_) {
    return undefined;
  }
};

export const authenticateModerator = async (
  usernameOrEmail: string,
  plaintextPassword: string
): Promise<ModeratorModel | undefined> => {
  return authenticateUser(
    UserVariant.MODERATOR,
    usernameOrEmail,
    plaintextPassword
  ) as Promise<ModeratorModel | undefined>;
};

export const authenticateSeller = async (
  usernameOrEmail: string,
  plaintextPassword: string
): Promise<SellerModel | undefined> => {
  return authenticateUser(
    UserVariant.SELLER,
    usernameOrEmail,
    plaintextPassword
  ) as Promise<SellerModel | undefined>;
};

export const authenticateBuyer = async (
  usernameOrEmail: string,
  plaintextPassword: string
): Promise<BuyerModel | undefined> => {
  return authenticateUser(
    UserVariant.BUYER,
    usernameOrEmail,
    plaintextPassword
  ) as Promise<BuyerModel | undefined>;
};

const insertUser = async (
  username: string,
  email: string,
  plaintextPassword: string,
  city: string,
  userType: "BUYER" | "SELLER"
): Promise<BuyerModel | SellerModel | undefined> => {
  try {
    const passwordHash = bcrypt.hashSync(plaintextPassword, 10);

    const result = await pool.query(
      "INSERT INTO ?? (username, email, password_hash, city) VALUES (?, ?, ?, ?)",
      [userType, username, email, passwordHash, city]
    );

    const userId = (result[0] as any).insertId as number;

    if (userType === "SELLER") {
      return {
        seller_id: userId,
        password_hash: plaintextPassword,
        username,
        email,
        city,
        avg_rating: 0,
      };
    } else if (userType === "BUYER") {
      return {
        buyer_id: userId,
        password_hash: plaintextPassword,
        username,
        email,
        city,
      };
    }
  } catch (error) {
    return undefined;
  }
};

export const insertBuyer = async (
  username: string,
  email: string,
  passwordHash: string,
  city: string
): Promise<BuyerModel | undefined> => {
  return insertUser(username, email, passwordHash, city, "BUYER") as Promise<
    BuyerModel | undefined
  >;
};

export const insertSeller = async (
  username: string,
  email: string,
  passwordHash: string,
  city: string
): Promise<SellerModel | undefined> => {
  return insertUser(username, email, passwordHash, city, "SELLER") as Promise<
    SellerModel | undefined
  >;
};

export const getBannedUsers = async (
): Promise<BannedSellerModel[] | undefined> => {
  try {
    const result = await pool.query(
      `SELECT 
         SELLER.username AS banned_user, 
         SELLER.seller_id AS seller_id, 
         MODERATOR.username AS banning_moderator
       FROM 
         BAN_LIST 
       JOIN 
         SELLER ON BAN_LIST.target_seller = SELLER.seller_id
       JOIN 
         MODERATOR ON BAN_LIST.banned_by = MODERATOR.moderator_id;`
    );

    return result[0] as BannedSellerModel[];
  } catch (_) {
    return undefined;
  }
};

export const banUser = async (
  banned_by: number,
  target_seller: number
): Promise<boolean> => {
  try {
    await pool.query("INSERT INTO BAN_LIST (banned_by, target_seller) VALUES (?, ?)", [banned_by, target_seller]);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const unbanUser = async (
  target_seller: number
): Promise<boolean> => {
  try {
    await pool.query("DELETE FROM BAN_LIST WHERE target_seller = ?", [target_seller]);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getSellers = async (): Promise<
  SellerModel[] | undefined
> => {
  try {
    const result = await pool.query(`SELECT s.* FROM SELLER AS s
                                     LEFT JOIN BAN_LIST AS b ON s.seller_id = b.target_seller
                                      WHERE b.target_seller IS NULL;`);

    return result[0] as SellerModel[];
  } catch (_) {
    return undefined;
  }
};

export const getSellerById = async (
  seller_id: number
): Promise<SellerModel | undefined> => {
  try {
    const result = await pool.query(
      `SELECT s.* FROM SELLER s
       LEFT JOIN BAN_LIST b ON s.seller_id = b.target_seller
        WHERE b.target_seller IS NULL AND s.seller_id = ?`,
      [seller_id]
    );

    return (result[0] as SellerModel[])[0];
  } catch (_) {
    return undefined;
  }
};

export const getBuyerById = async (
  buyer_id: number
): Promise<BuyerModel | undefined> => {
  try {
    const result = await pool.query(
      `SELECT b.* FROM BUYER b WHERE b.buyer_id = ?`,
      [buyer_id]
    );

    return (result[0] as BuyerModel[])[0];
  } catch (_) {
    return undefined;
  }
};

export const getModeratorById = async (
  moderator_id: number
): Promise<ModeratorModel | undefined> => {
  try {
    const result = await pool.query(
      `SELECT m.* FROM MODERATOR m WHERE m.moderator_id = ?`,
      [moderator_id]
    );

    return (result[0] as ModeratorModel[])[0];
  } catch (_) {
    return undefined;
  }
};

export const editUser = async (
  user_id: number,
  type: "BUYER" | "SELLER" | "MODERATOR",
  email: string | undefined,
  city: string | undefined
): Promise<boolean> => {  


  try {
    if (type === "BUYER") {
      if (email && !city) {
        await pool.query("UPDATE BUYER SET email = ? WHERE buyer_id = ?", [email, user_id]);
      } else if (!email && city) {
        await pool.query("UPDATE BUYER SET city = ? WHERE buyer_id = ?", [city, user_id]);
      } else {
        await pool.query("UPDATE BUYER SET email = ?, city = ? WHERE buyer_id = ?", [email, city, user_id]);
      }

    } else if (type === "SELLER") {
      if (email && !city) {
        await pool.query("UPDATE SELLER SET email = ? WHERE seller_id = ?", [email, user_id]);
      } else if (!email && city) {
        await pool.query("UPDATE SELLER SET city = ? WHERE seller_id = ?", [city, user_id]);
      } else {
        await pool.query("UPDATE SELLER SET email = ?, city = ? WHERE seller_id = ?", [email, city, user_id]);
      }
    } else {
      await pool.query("UPDATE MODERATOR SET email = ? WHERE  moderator_id = ?", [email, user_id]);
    }
    return true;
  } catch (_) {
    return false;
  }

};

export const insertRating = async (
  rating: number,
  description: string,
  written_by: number,
  written_for: number
): Promise<number | undefined> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT 1 FROM SELLER_REVIEW WHERE written_by = ? AND written_for = ?",
      [written_by, written_for]
    );

    if (rows.length > 0) {
        return undefined;
    }

    const result = await pool.query(
      "INSERT INTO SELLER_REVIEW (written_by, written_for, rating, comment) VALUES (?, ?, ?, ?)",
      [written_by, written_for, rating, description]
    );

    return (result[0] as any).insertId as number;
  } catch (_) {
    return undefined;
  }
}