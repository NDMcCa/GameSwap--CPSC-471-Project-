import pool from "$lib/db";
import type { SaveListingReport, ShowListingReport } from "$lib/models/ListingReport";
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

export const getReportByID = async (
  reportId: number
  ): Promise<ShowListingReport | undefined> => {
    try {
      const [rows] = await pool.query<RowDataPacket[]>(
        `SELECT 
          RL.report_id AS reportId,
          RL.description,
          RL.written_by,
          RL.written_for,
          B.username AS written_by_username,
          S.username AS seller_username,
          S.seller_id,
          GL.title AS game_title
            FROM 
              REPORT_LISTING RL
            LEFT JOIN 
              BUYER B ON RL.written_by = B.buyer_id
            INNER JOIN 
              GAME_LISTING GL ON RL.written_for = GL.listing_id
            INNER JOIN 
              SELLER S ON GL.posted_by = S.seller_id
            WHERE RL.report_id = ?`,
        [reportId]
      );
  
      if (rows.length > 0) {
        return rows[0] as ShowListingReport;
      }
      return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  export const getReports= async (): Promise<ShowListingReport[] | undefined> => {
    try {
      const [rows] = await pool.query<[]>(
        `SELECT 
          RL.report_id AS reportId,
          RL.description,
          RL.written_by,
          RL.written_for,
          B.username AS written_by_username,
          S.username AS seller_username,
          S.seller_id,
          GL.title AS game_title
            FROM 
              REPORT_LISTING RL
            LEFT JOIN 
              BUYER B ON RL.written_by = B.buyer_id
            INNER JOIN 
              GAME_LISTING GL ON RL.written_for = GL.listing_id
            INNER JOIN 
              SELLER S ON GL.posted_by = S.seller_id`
      );
  
      return rows as ShowListingReport[];
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };