import { type ServerLoad } from "@sveltejs/kit";
import { getBannedUsers, getSellers } from "$lib/controllers/userController";
import { getReports } from "$lib/controllers/reportController";
import { type TokenContent, verifyToken } from "$lib/jwt";

export const load: ServerLoad = async ({ cookies }) => {

    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

    return { token };
}