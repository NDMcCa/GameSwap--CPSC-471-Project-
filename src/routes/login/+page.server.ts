import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ cookies }) => {
  if (cookies.get("token")) {
    throw redirect(303, "/");
  }
};
