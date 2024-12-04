<script lang="ts">
  import "../../app.scss";
  import Nav from "$lib/components/Nav.svelte";
  import { sellersStore, setSellersStore } from "../../stores/sellersStore";
  import { page } from "$app/stores";
  import SellerItem from "$lib/components/SellerItem.svelte";

  setSellersStore($page.data.sellers);
</script>

<main>
  <Nav />

  <div>
    {#if $sellersStore.length > 0}
      {#each $sellersStore as seller}
        <SellerItem model={seller} />
      {/each}
    {:else}
      <p>No Sellers found.</p>
    {/if}
  </div>
</main>

<style lang="scss">
  div {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }
</style>
