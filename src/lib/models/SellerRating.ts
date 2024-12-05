export interface CreateSellerRating {
    rating: number;
    description: string;
    written_by: number;
    written_for: number;
  };

  export type SaveSellerRating = CreateSellerRating & { review_number: number, username: string};

  export interface CreateRatingResponse {
    insertedId: number;
  }