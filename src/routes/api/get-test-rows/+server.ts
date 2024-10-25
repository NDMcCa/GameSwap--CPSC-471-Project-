import pool from "$lib/db";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM test_table;");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (_) {
    return new Response(JSON.stringify({ error: "Failed to fetch rows." }), {
      status: 500,
    });
  }
};
