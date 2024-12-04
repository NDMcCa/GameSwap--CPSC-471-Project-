import { redirect, type ServerLoad } from "@sveltejs/kit";
import { type TokenContent, verifyToken } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import { getReportByID } from "$lib/controllers/reportController";


export const load: ServerLoad = async ({ cookies, params }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (token?.variant != UserVariant.MODERATOR) {
    throw redirect(303, "/");
  }

  if (!params.listingId) {
    throw redirect(400, "/");
  }
  console.log(params.listingId);
  const listingId = parseInt(params.listingId);

  if (isNaN(listingId)) {
    throw redirect(400, "/");
  }

  const report = await getReportByID(listingId);

  if (!report) {
    throw redirect(404, "/");
  }


  return { token, report };
};