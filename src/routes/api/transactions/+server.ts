import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import { deleteOffer } from "$lib/controllers/offerController";
import { insertTransaction } from "$lib/controllers/transactionController";
import { markGameListingAsSold } from "$lib/controllers/listingController";
import type { SellerModel } from "$lib/models/SellerModel";
import type { ConfirmTransactionRequest } from "$lib/models/TransactionRequests";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (!token) {
    return new Response(JSON.stringify({ message: "No Token" }), {
      status: 401,
    });
  }

  if (token.variant != UserVariant.SELLER) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }

  const seller = token.user as SellerModel;
  const body = (await request.json()) as ConfirmTransactionRequest;

  // This should be a transaction
  // If any of these fail, we should rollback
  // But we will not... because I don't feel like it
  try {
    if (
      !(await insertTransaction(
        seller.seller_id,
        body.withBuyer,
        body.forListing
      ))
    ) {
      throw new Error("Failed to insert transaction");
    }

    if (!(await deleteOffer(body.withBuyer, seller.seller_id))) {
      throw new Error("Failed to delete offer");
    }

    if (!(await markGameListingAsSold(body.forListing, seller.seller_id))) {
      throw new Error("Failed to mark listing as sold");
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ message: "Success" }), {
    status: 200,
  });
};
