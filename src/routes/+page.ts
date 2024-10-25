import type { TestTableSchema } from "$lib/schemas/TestTableSchema";

export const ssr = true;
export const csr = false;

export interface IndexPageData {
  rows: TestTableSchema[];
}

export const load = async ({ fetch }): Promise<IndexPageData> => {
  // Fetch test rows
  const testRows = await fetch("/api/get-test-rows");
  const testRowsData = (await testRows.json()) as TestTableSchema[];

  // Insert a test row
  const newTestRow: TestTableSchema = {
    age: 25,
    name: "John Doe",
  };

  await fetch("/api/post-test-row", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTestRow),
  });

  return {
    rows: testRowsData,
  };
};
