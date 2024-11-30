import { type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { getSellers } from "$lib/controllers/userController";

export const load: ServerLoad = async ({ cookies }) => {
    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  
    const sellers = await getSellers();
  
    if (!sellers) {
      throw new Error("Failed to fetch data");
    }
  
    return { token, sellers };
};
