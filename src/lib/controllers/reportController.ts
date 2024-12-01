import pool from "$lib/db";


export const insertReport = async (
    description: string,
    written_by: number,
    written_for: number
  ): Promise<number | undefined> => {
    try {
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
