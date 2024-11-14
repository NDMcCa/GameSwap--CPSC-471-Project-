import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";

export const load: ServerLoad = async ({ cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (!token) {
    throw redirect(303, "/");
  }

  return { token };
};
