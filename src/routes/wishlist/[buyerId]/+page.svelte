<script lang="ts">
  import { page } from "$app/stores";
  import {
    listingsStore,
    setListingsStore,
  } from "../../../stores/listingsStore";
  import ListingResult from "$lib/components/ListingResult.svelte";
  import Nav from "$lib/components/Nav.svelte";
  import { goto } from "$app/navigation";
  import type { DeleteWishlistListing } from "$lib/models/WishlistListing";

  setListingsStore($page.data.wishlistListings);

  const created_by = $page.data.token.user.buyer_id;

  const handleWishlistDelete = async (
    created_by: number,
    created_for: number
  ) => {
    if (confirm("Are you sure you want to remove this listing?")) {
      try {
        const req: DeleteWishlistListing = {
          created_by,
          created_for,
        };

        const res = await fetch("/api/wishlists", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
        });

        if (res.ok) {
          listingsStore.update((listings) =>
            listings.filter((l) => l.listing_id !== created_for)
          );

          await goto(`/wishlist/${created_by}`);
        } else {
          alert("Failed to remove the listing. Please try again.");
        }
      } catch (_) {
        alert("Failed to remove the listing. Please try again.");
      }
    }
  };
</script>

<main>
  <Nav />

  {#if $listingsStore.length > 0}
    {#each $listingsStore as listing}
      <div class="listing-container">
        <ListingResult model={listing} />
        <button
          on:click={() => handleWishlistDelete(created_by, listing.listing_id)}
          >Remove {listing.title}</button
        >
      </div>
    {/each}
  {:else}
    <h2>No listings on your wishlist</h2>
  {/if}
</main>

<style lang="scss">
  div.listing-container {
    $width: calc(100% - 5rem);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    width: $width;

    button {
      white-space: nowrap;
      background-color: #ffcccb;
      width: calc($width + 112px);
    }
  }
</style>
