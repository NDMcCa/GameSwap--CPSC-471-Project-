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

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

const authenticateUser = async <UserType>(
  userVariant: UserVariant,
  usernameOrEmail: string,
  passwordHash: string
): Promise<UserType | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM ?? WHERE username = ? OR email = ? AND password_hash = ?",
      [UserVariant[userVariant], usernameOrEmail, usernameOrEmail, passwordHash]
    );

    const users = result[0] as UserType[];

    if (users.length === 0) {
      return undefined;
    }

    return users[0];
  } catch (error) {
    return undefined;
  }
};

export const authenticateModerator = async (
  usernameOrEmail: string,
  passwordHash: string
): Promise<ModeratorModel | undefined> => {
  return authenticateUser<ModeratorModel>(
    UserVariant.MODERATOR,
    usernameOrEmail,
    passwordHash
  );
};

export const authenticateSeller = async (
  usernameOrEmail: string,
  passwordHash: string
): Promise<SellerModel | undefined> => {
  return authenticateUser<SellerModel>(
    UserVariant.SELLER,
    usernameOrEmail,
    passwordHash
  );
};

export const authenticateBuyer = async (
  usernameOrEmail: string,
  passwordHash: string
): Promise<BuyerModel | undefined> => {
  return authenticateUser<BuyerModel>(
    UserVariant.BUYER,
    usernameOrEmail,
    passwordHash
  );
};

const insertUser = async (
  username: string,
  email: string,
  passwordHash: string,
  city: string,
  userType: "BUYER" | "SELLER"
): Promise<BuyerModel | SellerModel | undefined> => {
  try {
    const result = await pool.query(
      "INSERT INTO ?? (username, email, password_hash, city) VALUES (?, ?, ?, ?)",
      [userType, username, email, passwordHash, city]
    );

    const userId = (result as any).insertId as number;

    if (userType === "SELLER") {
      return {
        seller_id: userId,
        password_hash: passwordHash,
        username,
        email,
        city,
        avg_rating: 0,
      };
    } else if (userType === "BUYER") {
      return {
        buyer_id: userId,
        password_hash: passwordHash,
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
