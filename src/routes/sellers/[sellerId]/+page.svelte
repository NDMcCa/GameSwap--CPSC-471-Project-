<script lang="ts">
  import "../../../app.scss";
  import Nav from "$lib/components/Nav.svelte";
  import { page } from "$app/stores";
  import { setTokenStore, tokenStore } from "../../../stores/tokenStore";
  import {
    listingsStore,
    setListingsStore,
  } from "../../../stores/listingsStore";
  import type { SellerModel } from "$lib/models/SellerModel";
  import ListingResult from "$lib/components/ListingResult.svelte";
  import { goto } from "$app/navigation";

  setTokenStore($page.data.token);
  setListingsStore($page.data.sellerListings);

  const seller = $page.data.seller as SellerModel;
</script>

<main>
  <Nav />

  <div class="seller-info-box">
    <h1>{seller.username}</h1>
    <div class="seller-details">
      <h3>{seller.city}</h3>
      <h3><a href={`mailto:${seller.email}`}>{seller.email}</a></h3>
      {#if seller.avg_rating}
        <h3>Average Rating: {seller.avg_rating}</h3>
      {:else}
        <h3>No ratings yet</h3>
      {/if}
      {#if $tokenStore && $tokenStore.variant === "BUYER"}
        <button on:click={() => goto(`../../rating/${seller.seller_id}`)}>Rate</button>
      {/if}
    </div>
  </div>

  <h2>Seller Listings</h2>

  {#if $listingsStore.length > 0}
    <div class="listings-container">
      {#each $listingsStore as listing}
        <ListingResult model={listing} />
      {/each}
    </div>
  {:else}
    <h2>No listings found for this seller</h2>
  {/if}
</main>

<style lang="scss">
  div.seller-info-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    align-items: center;





    h1 {
      margin-bottom: 0;
      font-size: 2rem;
    }

    div.seller-details {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 1rem;
      padding: 1rem;
      color: white;
      align-items: center;

      button {
        background-color: #f4f4f4;
        padding-bottom: 0.5rem;
        padding-top: 0.5rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 0;
        height: min-content;
      }

      h3 {
        font-size: 1rem;
        color: black;

        a {
          color: rgb(114, 114, 214);
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  :global(body.dark-mode) {
    div.seller-info-box {
      background-color: #333;
      button {
        background-color: #272727;
      }
      h3 {
        color: white;
      }
    }
  }

  div.listings-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    overflow-x: hidden;
  }

  
</style>
