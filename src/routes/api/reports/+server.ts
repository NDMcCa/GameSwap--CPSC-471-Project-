
  import { verifyToken, type TokenContent } from "$lib/jwt";
  import { UserVariant } from "$lib/models/UserVariant";
  import type { SellerModel } from "$lib/models/SellerModel";
  import type { RequestHandler } from "@sveltejs/kit";
import type { CreateListingReport, CreateReportResponse, SaveListingReport } from "$lib/models/ListingReport";
import { insertReport, deleteReport } from "$lib/controllers/reportController";
import type { BuyerModel } from "$lib/models/BuyerModel";
  
  export const DELETE: RequestHandler = async ({ request, cookies }) => {
    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  
    const notAuthorized = new Response(
      JSON.stringify({ message: "Not Authorized" }),
      {
        status: 401,
      }
    );
  
    if (!token) {
      return notAuthorized;
    }
  
    const body = (await request.json()) as SaveListingReport;
  
    if (token.variant === UserVariant.MODERATOR) {
      const result = await deleteReport(body.reportId);
  
      if (result) {
        return new Response(JSON.stringify({ message: "Success" }), {
          status: 200,
        });
      } else {
        return new Response(
          JSON.stringify({ message: "Internal Server Error" }),
          {
            status: 500,
          }
        );
      }
    }
    return notAuthorized;
  };
  
  export const POST: RequestHandler = async ({ request, cookies }) => {
    const token = verifyToken<TokenContent>(cookies.get("token") ?? "");
  
    if (token?.variant != UserVariant.BUYER) {
      return new Response(JSON.stringify({ message: "Not Authorized" }), {
        status: 401,
      });
    }
  
    const body = (await request.json()) as CreateListingReport;
  
    const result = await insertReport(
      body.description,
      body.written_by,
      body.written_for,
    );
  
    if (result) {
      const res: CreateReportResponse = {
        insertedId: result,
      };
  
      return new Response(JSON.stringify(res), { status: 201 });
    } else {
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
      });
    }
  };
  