import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { getAllRatingsForSeller, getSellerById, updateAverageRating } from "$lib/controllers/userController";

export const load: ServerLoad = async ({ cookies, params }) => {
  if (!params.sellerId) {
    console.log(params.sellerId);
    throw redirect(400, "/");
  }

  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  const sellerId = parseInt(params.sellerId);

  if (isNaN(sellerId)) {
    throw redirect(400, "/");
  }
  
  updateAverageRating(sellerId);
  const seller = await getSellerById(sellerId);
  const sellerRatings = await getAllRatingsForSeller(sellerId);

  if (!seller) {
    throw redirect(404, "/");
  }

  return { token, seller, sellerRatings};
};
