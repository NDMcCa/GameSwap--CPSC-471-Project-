import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  cookies.set("token", "", {
    path: "/",
    expires: new Date(0),
  });

  throw redirect(303, "/");
};
