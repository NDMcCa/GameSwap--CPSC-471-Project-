<script lang="ts">
  import type { IndexPageData } from "./+page";

  export let data: IndexPageData;
</script>

<main>
  <h1>Test Table Rows</h1>
  {#each data.rows as row}
    <div>
      <h2>{row.id}</h2>
      <p>{row.age}</p>
      <p>{row.name}</p>
    </div>
  {/each}
</main>
