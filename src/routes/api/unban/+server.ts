import { unbanUser } from "$lib/controllers/userController";
import type { BannedSellerModel } from "$lib/models/SellerModel";
import type { RequestHandler } from "@sveltejs/kit";

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
    