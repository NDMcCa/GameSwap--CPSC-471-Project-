<script lang="ts">
  import "../../../app.scss";
  import Nav from "$lib/components/Nav.svelte";
  import { page } from "$app/stores";
  import { setTokenStore, tokenStore } from "../../../stores/tokenStore";
  import {
      ratingStore,
      setRatingStore,
  } from "../../../stores/ratingStore";
  import type { SellerModel } from "$lib/models/SellerModel";
  import RatingItem from "$lib/components/RatingItem.svelte";
  import { goto } from "$app/navigation";

  console.log($page.data.sellerRatings);

  setTokenStore($page.data.token);
  setRatingStore($page.data.sellerRatings);

  const seller = $page.data.seller as SellerModel;
</script>

<main>
    <Nav />

    <div class="seller-info-box">
        <h1>{seller.username}</h1>
        <h3>Average Rating: {seller.avg_rating}</h3>
    </div>
    <h2>Seller Reviews</h2>
    {#if $ratingStore.length > 0}
    <div class="listings-container">
      {#each $ratingStore as rating}
        <RatingItem model={rating} />
      {/each}
    </div>
  {:else}
    <h2>No ratings/reviews found for this seller</h2>
  {/if}
</main>