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
