import { type ServerLoad } from "@sveltejs/kit";
import { getBannedUsers, getSellers } from "$lib/controllers/userController";
import { getReportedListings } from "$lib/controllers/listingController";
import { type TokenContent, verifyToken } from "$lib/jwt";

export const load: ServerLoad = async ({ cookies }) => {
    
    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
    const banned = await getBannedUsers();
    const sellers = await getSellers();
    const reports = await getReportedListings();

    return { banned, reports, token, sellers };
}