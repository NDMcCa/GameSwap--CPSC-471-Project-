import pool from "$lib/db";
import type { SaveListingReport } from "$lib/models/ListingReport";
import type { RowDataPacket } from "mysql2";


export const insertReport = async (
    description: string,
    written_by: number,
    written_for: number
  ): Promise<number | undefined> => {
    try {

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT 1 FROM REPORT_LISTING WHERE written_by = ? AND written_for = ?",
        [written_by, written_for]
    );

    if (rows.length > 0) {
        return undefined;
    }
      const result = await pool.query(
        "INSERT INTO REPORT_LISTING (description, written_by, written_for) VALUES (?, ?, ?)",
        [description, written_by, written_for]
      );
  
      return (result[0] as any).insertId as number;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };


export const deleteReport = async (
    reportId: number
    ): Promise<boolean> => {
    try {
      let result; 
        result = await pool.query(
          "DELETE FROM REPORT_LISTING WHERE report_id = ?",
          [reportId]
        );
      
  
      return (result[0] as any).affectedRows > 0;
    } catch (_) {
      return false;
    }
};

export const getReports = async (): Promise<SaveListingReport[] | undefined> => {
    try {
      const [rows] = await pool.query<[]>(
        "SELECT * FROM REPORT_LISTING"
      );
  
      return rows as SaveListingReport[];
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };