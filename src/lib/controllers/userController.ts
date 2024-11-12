import pool from "$lib/db";
import type { BuyerModel } from "$lib/models/BuyerModel";
import type { ModeratorModel } from "$lib/models/ModeratorModel";
import type { SellerModel } from "$lib/models/SellerModel";

type UserVariants = "MODERATOR" | "SELLER" | "BUYER";

const authenticateUser = async <UserType>(
  userVariant: UserVariants,
  usernameOrEmail: string,
  password: string
): Promise<UserType | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM ?? WHERE username = ? OR email = ? AND password_hash = ?",
      [userVariant, usernameOrEmail, usernameOrEmail, password]
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
  password: string
): Promise<ModeratorModel | undefined> => {
  return authenticateUser<ModeratorModel>(
    "MODERATOR",
    usernameOrEmail,
    password
  );
};

export const authenticateSeller = async (
  usernameOrEmail: string,
  password: string
): Promise<SellerModel | undefined> => {
  return authenticateUser<SellerModel>("SELLER", usernameOrEmail, password);
};

export const authenticateBuyer = async (
  usernameOrEmail: string,
  password: string
): Promise<BuyerModel | undefined> => {
  return authenticateUser<BuyerModel>("BUYER", usernameOrEmail, password);
};
