<script lang="ts">
    import "../../../app.scss";
    import Nav from "$lib/components/Nav.svelte";
    import { page } from "$app/stores";
    import { setTokenStore, tokenStore } from "../../../stores/tokenStore";
    import type { SellerModel } from "$lib/models/SellerModel";
    import type { JoinedGameListingModel } from "$lib/models/GameListingModel";
    import { listingsStore, setListingsStore } from "../../../stores/listingsStore";
    import ListingPerSeller from "$lib/components/ListingPerSeller.svelte";

    setTokenStore($page.data.token);
    setListingsStore($page.data.sellerListings);

  
    const seller = $page.data.seller as SellerModel;
</script>


<main>
    <Nav />
    <div class="seller-info-box">
        <div class="seller-details">
          <h1>{seller.username}</h1>
          <h3>{seller.city}</h3>
          <h3>{seller.email}</h3>
          <h3>Average Rating: {seller.avg_rating}</h3>
        </div>
      </div>
    <h2>Listings:</h2>

    {#if $listingsStore.length > 0}
        {#each $listingsStore as listing}
            <ListingPerSeller model={listing} />
        {/each}
    {:else}
        <h2>No listings found for this seller</h2>
    {/if}


</main>

<style>
    h2 {
        color: teal;
    }

    .seller-info-box {
        background-color: #f0f0f0; 
        border: 1px solid #ccc;
        border-radius: 8px; 
        padding: 16px; 
        margin: 16px 0; 
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
    }

    .seller-details {
        display: flex; 
        flex-wrap: wrap; 
        align-items: center; 
        gap: 16px; 
    }

    .seller-details h1, .seller-details h3 {
        margin: 0; 
        font-weight: normal; 
    }

    .seller-details h1 {
        font-size: 1.5rem; 
        color: #333; 
    }

    .seller-details h3 {
        font-size: 1rem; 
        color: #555; 
    }
</style>


