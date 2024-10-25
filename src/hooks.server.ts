import dotenv from "dotenv";

dotenv.config();

export const handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  return response;
};
