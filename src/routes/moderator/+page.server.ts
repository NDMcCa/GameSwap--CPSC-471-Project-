import { type ServerLoad } from "@sveltejs/kit";
import { getBannedUsers } from "$lib/controllers/userController";
import { getReportedListings } from "$lib/controllers/listingController";

export const load: ServerLoad = async () => {
    const banned = await getBannedUsers();
    const reports = await getReportedListings();

    return { banned, reports };
}