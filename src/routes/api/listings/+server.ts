import {
  deleteGameListing,
  getGameListings,
  insertGameListing,
} from "$lib/controllers/listingController";
import { verifyToken, type TokenContent } from "$lib/jwt";
import { UserVariant } from "$lib/models/UserVariant";
import type {
  CreateListingRequest,
  SaveListingRequest,
} from "$lib/models/ListingRequests";
import type { SellerModel } from "$lib/models/SellerModel";
import type { CreateListingResponse } from "$lib/models/CreateListingResponse";
import type { SearchListingRequest } from "$lib/models/SearchListingRequest";
import type { RequestHandler } from "@sveltejs/kit";
import { updateGameListing } from "$lib/controllers/listingController";

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

  const body = (await request.json()) as SaveListingRequest;

  if (token.variant === UserVariant.SELLER) {
    const user = token.user as SellerModel;
    const result = await deleteGameListing(user.seller_id, body.listingId);

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
  } else if (token.variant === UserVariant.MODERATOR) {
    const result = await deleteGameListing(undefined, body.listingId);

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

  if (token?.variant != UserVariant.SELLER) {
    return new Response(JSON.stringify({ message: "Not Authorized" }), {
      status: 401,
    });
  }

  const seller = token.user as SellerModel;
  const body = (await request.json()) as CreateListingRequest;

  const result = await insertGameListing(
    body.title,
    body.description,
    body.price,
    seller.seller_id,
    body.platform,
    body.category
  );

  if (result) {
    const res: CreateListingResponse = {
      insertedId: result,
    };

    return new Response(JSON.stringify(res), { status: 201 });
  } else {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};

export const PATCH: RequestHandler = async ({ request, cookies }) => {
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

  const body = (await request.json()) as SaveListingRequest;

  if (token.variant === UserVariant.SELLER) {
    const user = token.user as SellerModel;

    const result = await updateGameListing(
      user.seller_id,
      body.listingId,
      body.title,
      body.description,
      body.price,
      body.platform,
      body.category
    );

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
  } else if (token.variant === UserVariant.MODERATOR) {
    const result = await updateGameListing(
      undefined,
      body.listingId,
      body.title,
      body.description,
      body.price,
      body.platform,
      body.category
    );

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

export const GET: RequestHandler = async ({ url }) => {
  const searchOptions: SearchListingRequest = {
    title: url.searchParams.get("title") ?? undefined,
    seller: url.searchParams.get("seller") ?? undefined,
    searchCategory: url.searchParams.get("searchCategory") ?? undefined,
    searchPlatform: url.searchParams.get("searchPlatform") ?? undefined,
  };

  if (searchOptions.title && searchOptions.seller) {
    return new Response(
      JSON.stringify({
        message: "Searching by title and seller must be mutually exclusive",
      }),
      {
        status: 400,
      }
    );
  }

  const listings = await getGameListings(
    searchOptions.searchCategory,
    searchOptions.searchPlatform,
    searchOptions.title,
    searchOptions.seller
  );

  if (!listings) {
    return new Response(
      JSON.stringify({ message: "Failed to retrieve listings" }),
      {
        status: 500,
      }
    );
  }

  return new Response(JSON.stringify(listings), {
    status: 200,
  });
};
