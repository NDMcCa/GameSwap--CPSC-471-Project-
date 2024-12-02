export interface CreateWishlistListing {
    created_by: number;
    created_for: number;
  }

export interface DeleteWishlistListing {
    wishlistId: number;
}
  
export type SaveWishlistListing = CreateWishlistListing & { wishlistId: number };

export interface CreateWishlistListingResponse {
    insertedId: number;
}