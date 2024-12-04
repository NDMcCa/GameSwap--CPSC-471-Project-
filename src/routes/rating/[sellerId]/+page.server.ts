import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import { getGameListingById } from "$lib/controllers/listingController";
import { getSellerById } from "$lib/controllers/userController";


export const load: ServerLoad = async ({ cookies, params }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (token?.variant != UserVariant.BUYER) {
    throw redirect(303, "/");
  }

  if (!params.sellerId) {
    throw redirect(400, "/");
  }

  const seller = await getSellerById(parseInt(params.sellerId))

  if (!seller) {
    throw redirect(404, "/");
  }


  return { token, seller};
};