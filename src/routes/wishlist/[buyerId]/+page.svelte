<script lang="ts" >
    import { page } from "$app/stores";
    import { redirect } from "@sveltejs/kit";
    import { listingsStore, setListingsStore } from "../../../stores/listingsStore";
    import ListingResult from "$lib/components/ListingResult.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import { goto, invalidateAll } from "$app/navigation";
    import type { DeleteWishlistListing } from "$lib/models/WishlistListing";


    setListingsStore($page.data.wishlistListings);

    const created_by = $page.data.token.user.buyer_id;

    const handleWishlistDelete = async (created_by: number, created_for: number) => {

      if (confirm("Are you sure you want to remove this listing?")) {

      try {
        const req: DeleteWishlistListing = {
            created_by,
            created_for
        };

        const res = await fetch("/api/wishlists", {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        });

        if (res.ok) {
          listingsStore.update(listings => listings.filter(l => l.listing_id !== created_for));
          await goto(`/wishlist/${created_by}`);

        } else {
          alert("Failed to remove the listing. Please try again.");
        }
        } catch (_) {
          alert("Failed to remove the listing. Please try again.");
        }
    };
    }

</script>


<main>
    <Nav />
    <h1>Wishlist</h1>

    {#if $listingsStore.length > 0}
    {#each $listingsStore as listing}
    <div class="listing-container">
    <ListingResult model={listing} />
    <button on:click={() => handleWishlistDelete(created_by, listing.listing_id)}>Remove This Listing from Wishlist</button>
    </div>
    {/each}
  {:else}
    <h2>No listings on your wishlist</h2> 
  {/if}
</main>

<style>
  h1 {
    font-size: 50px;
    color: teal;
  }

  .listing-container {
    display: flex;
    align-items: center; 
    gap: 1rem; 
    margin-bottom: 1rem;
  }

  button {
    white-space: nowrap; 
    background-color: #FFCCCB;
  }
</style>
