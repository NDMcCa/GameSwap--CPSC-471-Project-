import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";

export const load: ServerLoad = async ({ cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (token?.variant != UserVariant.SELLER) {
    throw redirect(303, "/");
  }

  return { token };
};
