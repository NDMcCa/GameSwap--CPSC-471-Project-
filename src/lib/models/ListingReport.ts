export interface CreateListingReport {
    description: string;
    written_by: number;
    written_for: number;
  }

export interface DeleteListingReport {
    report_id: number;
}
  
export type SaveListingReport = CreateListingReport & { report_id: number };

export type ShowListingReport = CreateListingReport & SaveListingReport & { written_by_username: string, seller_username: string, seller_id: number, game_title: string; };

export interface CreateReportResponse {
    insertedId: number;
  }
