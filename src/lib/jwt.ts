import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET ?? "sample-secret";
const jwtExpiration = "12h";

export const generateToken = <PayloadType>(payload: PayloadType): string => {
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
