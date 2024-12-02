import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import { getBuyerById } from "$lib/controllers/userController";

export const load: ServerLoad = async ({ cookies, params }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (token?.variant != UserVariant.BUYER) {
    throw redirect(303, "/");
  }

  if (!params.buyerId) {
    throw redirect(400, "/");
  }

  const buyerId = parseInt(params.buyerId);

  const buyer = await getBuyerById(buyerId);

  if (isNaN(buyerId)) {
    throw redirect(400, "/");
  }

  if (buyer?.username !== token.user.username ) {
    throw redirect(303, "/" );
  }


  return { token, buyer};
};