<script lang="ts">
  import { goto } from "$app/navigation";
  import type { JoinedGameListingModel } from "$lib/models/GameListingModel";

  export let model: JoinedGameListingModel;

  function goToListingPage() {
    goto(`/listings/${model.listing_id}`);
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      goToListingPage();
    }
  }
</script>

<div
  class="listing-card"
  on:click={goToListingPage}
  on:keydown={handleKey}
  tabindex="0"
  role="button"
>
  <h2>{model.title}</h2>
  <div class="info-container">
    <span class="price"><strong>Price:</strong> {model.price}</span>
    <span class="category"><strong>Category:</strong> {model.category}</span>
    <span class="platform"><strong>Platform:</strong> {model.platform}</span>
  </div>
  <p>{model.description}</p>
</div>

<style>
  .listing-card {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 12px 0;
    background-color: #f9f9f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 280px;
    box-sizing: border-box;
    overflow: hidden;
  }

  .listing-card h2 {
    margin-bottom: 8px;
    color: #333;
    text-decoration: N;
    text-overflow: ellipsis;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: #555;
  }

  .info-container span {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .price {
    color: green;
  }
</style>
