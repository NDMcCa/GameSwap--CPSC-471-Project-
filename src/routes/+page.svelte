<script lang="ts">
  import "../app.scss";
  import Nav from "$lib/components/nav.svelte";

  import { page } from "$app/stores";
  import { setTokenStore } from "../stores/tokenStore";
  import { listingsStore, setListingsStore } from "../stores/listingsStore";
  import type { GameCategoryModel } from "$lib/models/GameCategoryModel";
  import type { GamePlatformModel } from "$lib/models/GamePlatformModel";

  setTokenStore($page.data.token);
  setListingsStore($page.data.listings);

  const categories = $page.data.categories as GameCategoryModel[];
  const platforms = $page.data.platforms as GamePlatformModel[];

  let searchBy: "seller" | "game" = "game";
  let searchCategory: string = "";
  let searchPlatform: string = "";
</script>

<main>
  <Nav />
  <div class="search-container">
    <select bind:value={searchBy}>
      <option value="seller">Seller</option>
      <option value="game">Game</option>
    </select>
    <select bind:value={searchCategory}>
      <option value="">All Categories</option>
      {#each categories as category}
        <option value={category.category_name}>{category.category_name}</option>
      {/each}
    </select>
    <select bind:value={searchPlatform}>
      <option value="">All Platforms</option>
      {#each platforms as platform}
        <option value={platform.platform_name}>{platform.platform_name}</option>
      {/each}
    </select>
    <input
      type="text"
      placeholder={`Search by ${searchBy}${searchCategory.length > 0 ? ` in ${searchCategory}` : ""}${searchPlatform.length > 0 ? ` for ${searchPlatform}` : ""}...`}
    />
    <button>Search</button>
  </div>
  <div class="listings-container">
    {#if $listingsStore.length > 0}
      {#each $listingsStore as listing}
        <div class="listing">
          <!-- We may want to implement images for listings here if we have time -->
          <!-- <img src={listing.image} alt={listing.title} /> -->
          <h2>{listing.title}</h2>
          <p>{listing.username}</p>
          <p>{listing.price}</p>
        </div>
      {/each}
    {:else}
      <p>No listings found.</p>
    {/if}
  </div>
</main>

<style lang="scss">
  div.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebebeb;
    padding: 0.7rem;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;

    select {
      margin-right: 1rem;
    }

    input {
      flex: 1;
      margin-right: 1rem;
    }

    button {
      margin-right: 1rem;
    }
  }

  :global(body) {
		transition: background-color 0.3s
	}
	:global(body.dark-mode) {
		background-color: #272727;
		color: white;
	}

  :global(body) div.search-container{
		transition: background-color 0.3s
	}
	:global(body.dark-mode) div.search-container{
		background-color: #1b1b1b;
		color: white;
	}

</style>
