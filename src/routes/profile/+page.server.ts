import { type ServerLoad } from "@sveltejs/kit";
import { getModeratorById, getSellerById, getBuyerById } from "$lib/controllers/userController";
import { getReports } from "$lib/controllers/reportController";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import type { ModeratorModel } from "$lib/models/ModeratorModel";
import type { SellerModel } from "$lib/models/SellerModel";
import type { BuyerModel } from "$lib/models/BuyerModel";

export const load: ServerLoad = async ({ cookies }) => {

    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
    let user: BuyerModel | SellerModel | ModeratorModel | null = null;

    if (token?.variant == UserVariant.BUYER) {
        if ('buyer_id' in token.user) {
            const buyer = await getBuyerById(token.user.buyer_id);
            if (buyer) {
                user = buyer;
            }
        }
    } else if (token?.variant == UserVariant.SELLER) {
        if ('seller_id' in token.user) {
            const seller = await getSellerById(token.user.seller_id);
            if (seller) {
                user = seller;
            }
        }
    } else if (token?.variant == UserVariant.MODERATOR) {
        if ('moderator_id' in token.user) {
            const moderator = await getModeratorById(token.user.moderator_id);
            if (moderator) {
                user = moderator;
            }
        }
    } else {
        throw new Error("User not found");
    }

    return { token, user };
}