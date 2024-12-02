export interface CreateListingReport {
    description: string;
    written_by: number;
    written_for: number;
  }

export interface DeleteListingReport {
    reportId: number;
}
  
export type SaveListingReport = CreateListingReport & { reportId: number };

export interface CreateReportResponse {
    insertedId: number;
  }
