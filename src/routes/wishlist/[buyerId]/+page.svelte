<script lang="ts" >
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";
    import { listingsStore, setListingsStore } from "../../../stores/listingsStore";
    import ListingResult from "$lib/components/ListingResult.svelte";


    setListingsStore($page.data.wishlistListings);

    console.log("Wishlist Listings Data:", $page.data.wishlistListings);

</script>


<main>

    <h1>Wishlist</h1>

    {#if $listingsStore.length > 0}
    {#each $listingsStore as listing}
    <ListingResult model={listing} />
    {/each}
  {:else}
    <h2>No listings on your wishlist</h2> 
  {/if}
</main>