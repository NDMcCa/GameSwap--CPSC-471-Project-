import pool from "$lib/db";
import bcrypt from "bcrypt";
import type { BuyerModel } from "$lib/models/BuyerModel";
import type { ModeratorModel } from "$lib/models/ModeratorModel";
import type { SellerModel } from "$lib/models/SellerModel";

export enum UserVariant {
  MODERATOR = "MODERATOR",
  SELLER = "SELLER",
  BUYER = "BUYER",
}

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

    const userId = (result as any).insertId as number;

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
