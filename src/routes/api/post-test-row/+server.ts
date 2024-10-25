import type { TestTableSchema } from "$lib/schemas/TestTableSchema";
import type { RequestHandler } from "@sveltejs/kit";

import pool from "$lib/db";

export const POST: RequestHandler = async ({ request }) => {
  const { age, name }: TestTableSchema = await request.json();

  if (!age || !name) {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
    });
  }

  try {
    await pool.execute("INSERT INTO test_table (age, name) VALUES (?, ?);", [
      age,
      name,
    ]);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (_) {
    return new Response(JSON.stringify({ error: "Failed to insert row." }), {
      status: 500,
    });
  }
};
