import { getSellers, unbanUser } from "$lib/controllers/userController";
import type { BannedSellerModel } from "$lib/models/SellerModel";
import type { RequestHandler } from "@sveltejs/kit";
import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";

export const POST: RequestHandler = async ({ request }) => {
    const user = await request.json() as BannedSellerModel;
    const result = await unbanUser(user.seller_id);
    
    if (result) {
        return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        });
    }
};

export const GET: RequestHandler = async ({ cookies }) => {
    const token = verifyToken<TokenContent>(cookies.get("token")??"");
    if (token?.variant != UserVariant.MODERATOR) {
        return new Response(JSON.stringify({ message: "Not Authorized" }), {
            status: 401,
        });
    }
    const result = await getSellers();

    if (result) {
        return new Response(JSON.stringify(result), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        });
    }
};
    