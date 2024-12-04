export interface CreateSellerRating {
    rating: number;
    description: string;
    written_by: number;
    written_for: number;
  };

  export type SaveSellerRating = CreateSellerRating & { reportId: number };

  export interface CreateRatingResponse {
    insertedId: number;
  }