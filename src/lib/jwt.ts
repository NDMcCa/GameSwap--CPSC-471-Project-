import jwt from "jsonwebtoken";
import type { ModeratorModel } from "./models/ModeratorModel";
import type { BuyerModel } from "./models/BuyerModel";
import type { SellerModel } from "./models/SellerModel";
import type { UserVariant } from "./controllers/userController";

const jwtSecret = process.env.JWT_SECRET ?? "sample-secret";
const jwtExpiration = "12h";

export interface TokenContent {
  user: ModeratorModel | BuyerModel | SellerModel;
  variant: UserVariant;
}

export const generateToken = (payload: any): string => {
  const serializedPayload = JSON.stringify(payload);
  return jwt.sign(serializedPayload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
};

export const verifyToken = <PayloadType>(
  token: string
): PayloadType | undefined => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return JSON.parse(payload as string) as PayloadType;
  } catch (error) {
    return undefined;
  }
};
