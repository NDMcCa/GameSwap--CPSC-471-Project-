<script lang="ts">
    import "../../../app.scss";
    import Nav from "$lib/components/Nav.svelte";
    import { page } from "$app/stores";
    import { setTokenStore, tokenStore } from "../../../stores/tokenStore";
    import type { SellerModel } from "$lib/models/SellerModel";
    import type { JoinedGameListingModel } from "$lib/models/GameListingModel";
    import { listingsStore, setListingsStore } from "../../../stores/listingsStore";
    import ListingResult from "$lib/components/ListingResult.svelte";

    setTokenStore($page.data.token);
    setListingsStore($page.data.sellerListings);

  
    const seller = $page.data.seller as SellerModel;
</script>


<main>
    <Nav />
    <h1>{seller.username}</h1>

    {#if $listingsStore.length > 0}
        {#each $listingsStore as listing}
            <p>{listing.title}</p>
            {/each}
    {:else}
        <h2>No listings found for this seller</h2>
    {/if}


</main>
