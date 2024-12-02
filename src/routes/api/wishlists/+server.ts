
import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import type { SellerModel } from "$lib/models/SellerModel";
import type { RequestHandler } from "@sveltejs/kit";
import type { CreateListingReport, CreateReportResponse, SaveListingReport } from "$lib/models/ListingReport";
import { insertReport, deleteReport } from "$lib/controllers/reportController";
import type { BuyerModel } from "$lib/models/BuyerModel";
import type { CreateWishlistListing, CreateWishlistListingResponse, SaveWishlistListing } from "$lib/models/WishlistListing";
import { deleteWishlistListing, insertWishlistListing } from "$lib/controllers/wishlistController";
  
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
  
    const body = (await request.json()) as SaveWishlistListing;
  
    if (token.variant === UserVariant.BUYER) {
      const result = await deleteWishlistListing(body.created_by, body.created_for);
  
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
  
    const body = (await request.json()) as CreateWishlistListing;
  
    const result = await insertWishlistListing(
      body.created_by,
      body.created_for,
    );
  
    if (result) {
      const res: CreateWishlistListingResponse = {
        insertedId: result,
      };
  
      return new Response(JSON.stringify(res), { status: 201 });
    } else {
      return new Response(JSON.stringify({ message: "Internal Server Error" }), {
        status: 500,
      });
    }
  };
  