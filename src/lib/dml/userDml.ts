import pool from "$lib/db";
import type { BuyerDdl } from "$lib/ddl/BuyerDdl";
import type { ModeratorDdl } from "$lib/ddl/ModeratorDdl";
import type { SellerDdl } from "$lib/ddl/SellerDdl";

type UserVariants = "MODERATOR" | "SELLER" | "BUYER";

const authenticateUser = async <DdlType>(
  userVariant: UserVariants,
  usernameOrEmail: string,
  password: string
): Promise<DdlType | undefined> => {
  try {
    const result = await pool.query(
      "SELECT * FROM ?? WHERE username = ? OR email = ? AND password_hash = ?",
      [userVariant, usernameOrEmail, usernameOrEmail, password]
    );

    const users = result[0] as DdlType[];

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
): Promise<ModeratorDdl | undefined> => {
  return authenticateUser<ModeratorDdl>("MODERATOR", usernameOrEmail, password);
};

export const authenticateSeller = async (
  usernameOrEmail: string,
  password: string
): Promise<SellerDdl | undefined> => {
  return authenticateUser<SellerDdl>("SELLER", usernameOrEmail, password);
};

export const authenticateBuyer = async (
  usernameOrEmail: string,
  password: string
): Promise<BuyerDdl | undefined> => {
  return authenticateUser<BuyerDdl>("BUYER", usernameOrEmail, password);
};
