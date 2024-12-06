import { banUser, getBannedUsers } from "$lib/controllers/userController";
import { verifyToken, type TokenContent } from "$lib/jwt";
import type { ModeratorModel } from "$lib/models/ModeratorModel";
import type { SellerModel } from "$lib/models/SellerModel";
import { UserVariant } from "$lib/models/UserVariant";
import type { RequestHandler } from "@sveltejs/kit";
import { get } from "http";


export const POST: RequestHandler = async ({ request, cookies }) => {
    const token = verifyToken<TokenContent>(cookies.get("token")??"");
    if (token?.variant != UserVariant.MODERATOR) {
        return new Response(JSON.stringify({ message: "Not Authorized" }), {
            status: 401,
        });
    }
    const mod = token.user as ModeratorModel;
    const user = await request.json() as SellerModel;
    const result = await banUser (mod.moderator_id, user.seller_id);
    
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
    const result = await getBannedUsers();

    if (result) {
        return new Response(JSON.stringify(result), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        });
    }
};
