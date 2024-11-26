<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";

  import { page } from "$app/stores";
  import { setTokenStore } from "../../../stores/tokenStore";
  import type { JoinedGameListingModel } from "$lib/models/GameListingModel";

  setTokenStore($page.data.token);

  const listing = $page.data.listing as JoinedGameListingModel;
</script>

<main>
  <Nav />
  <section>
    <h1>{listing.title}</h1>
    <p><strong>Description:</strong> {listing.description}</p>
    <p>
      <strong>Category:</strong>
      {listing.category} - {listing.category_description}
    </p>
    <p>
      <strong>Platform:</strong>
      {listing.platform} - {listing.platform_description}
    </p>
    <p><strong>Price:</strong> ${listing.price}</p>
    <p><strong>City:</strong> {listing.city}</p>
    <p><strong>Seller:</strong> {listing.username} ({listing.email})</p>
    <p><strong>Average Rating:</strong> {listing.avg_rating}</p>
    <p><strong>Sold:</strong> {listing.is_sold ? "Yes" : "No"}</p>
  </section>
</main>

<style>
  section {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 2rem;
  }

  h1 {
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.5rem 0;
  }
</style>
