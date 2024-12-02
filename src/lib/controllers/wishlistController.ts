import pool from "$lib/db";
import type { RowDataPacket } from "mysql2";

export const insertWishlistListing = async (
    created_by: number,
    created_for: number
  ): Promise<number | undefined> => {
    try {

    const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT 1 FROM WISHLIST_LISTING WHERE created_by = ? AND created_for = ?",
        [created_by, created_for]
    );

    if (rows.length > 0) {
        return undefined;
    }
      const result = await pool.query(
        "INSERT INTO WISHLIST_LISTING (created_by, created_for) VALUES (?, ?)",
        [created_by, created_for]
      );
  
      return (result[0] as any).insertId as number;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

export const deleteWishlistListing = async (
    created_by: number,
    created_for: number
    ): Promise<boolean> => {
    try {
      let result; 
        result = await pool.query(
          "DELETE FROM WISHLIST_LISTING WHERE created_by = ? AND created_for = ?",
          [created_by, created_for]
        );
      
  
      return (result[0] as any).affectedRows > 0;
    } catch (_) {
      return false;
    }
};
