import { type ServerLoad } from "@sveltejs/kit";
import { getBannedUsers } from "$lib/controllers/userController";

export const load: ServerLoad = async () => {
    const banned = await getBannedUsers ();

    return banned;
}