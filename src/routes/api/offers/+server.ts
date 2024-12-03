import { deleteOffer, insertOffer } from "$lib/controllers/offerController";
import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import type {
  ClearOfferRequest,
  SendOfferRequest,
} from "$lib/models/OfferRequests";
import type { SellerModel } from "$lib/models/SellerModel";
import type { RequestHandler } from "@sveltejs/kit";
import type { BuyerModel } from "$lib/models/BuyerModel";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = verifyToken<TokenContent>(cookies.get("token") ?? "");

  if (!token) {
    return new Response(JSON.stringify({ message: "No Token" }), {
      status: 401,
    });
  }

  if (token.variant != UserVariant.BUYER) {
    return new Response(JSON.stringify({ message: "Forbidden" }), {
      status: 403,
    });
  }

  const buyer = token.user as BuyerModel;
  const body = (await request.json()) as SendOfferRequest;

  const result = await insertOffer(
    buyer.buyer_id,
    body.sellerId,
    body.offerComment
  );

  if (result) {
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: "Already Exists" }), {
      status: 409,
    });
  }
};

export const DELETE: RequestHandler = async ({ request, cookies }) => {
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
  const body = (await request.json()) as ClearOfferRequest;

  const result = await deleteOffer(body.buyerId, seller.seller_id);

  if (result) {
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
