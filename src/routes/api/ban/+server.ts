import { banUser } from "$lib/controllers/userController";
import type { SellerModel } from "$lib/models/SellerModel";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
    const user = await request.json() as SellerModel;
    const result = await banUser(user.seller_id, 1); // 1 is the default moderator  until I know how to fetch the current moderator's ID
    
    if (result) {
        return new Response(JSON.stringify({ message: "OK" }), { status: 200 });
    } else {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
        });
    }
};
    