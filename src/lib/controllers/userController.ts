import pool from "$lib/db";
import bcrypt from "bcrypt";
import { UserVariant } from "$lib/models/UserVariant";
import type { BuyerModel } from "$lib/models/BuyerModel";
import type { ModeratorModel } from "$lib/models/ModeratorModel";
import type { BannedSellerModel, SellerModel } from "$lib/models/SellerModel";

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
  targetSeller: number,
  mdusername: string
): Promise<boolean> => {
  try {
    await pool.query("INSERT INTO BAN_LIST (target_seller) VALUES (?)", [targetSeller]);

    return true;
  } catch (_) {
    return false;
  }
};

export const unbanUser = async (
  targetSeller: number
): Promise<boolean> => {
  try {
    await pool.query("DELETE FROM BAN_LIST WHERE target_seller = ?", [targetSeller]);

    return true;
  } catch (_) {
    return false;
  }
};
