<script lang="ts">
  import "../app.scss";

  import Nav from "$lib/components/Nav.svelte";
  import ListingResult from "$lib/components/ListingResult.svelte";

  import { page } from "$app/stores";
  import { setTokenStore } from "../stores/tokenStore";
  import { listingsStore, setListingsStore } from "../stores/listingsStore";
  import type { GameCategoryModel } from "$lib/models/GameCategoryModel";
  import type { GamePlatformModel } from "$lib/models/GamePlatformModel";
  import type { SearchListingRequest } from "$lib/models/SearchListingRequest";

  setTokenStore($page.data.token);
  setListingsStore($page.data.listings);

  const categories = $page.data.categories as GameCategoryModel[];
  const platforms = $page.data.platforms as GamePlatformModel[];

  let searchQuery: string = "";
  let searchBy: "seller" | "game" = "game";
  let searchCategory: string = "";
  let searchPlatform: string = "";

  const searchListings = async () => {
    let req: SearchListingRequest = {
      title: searchBy == "game" ? searchQuery : undefined,
      seller: searchBy == "seller" ? searchQuery : undefined,
      searchCategory: searchCategory.length > 0 ? searchCategory : undefined,
      searchPlatform: searchPlatform.length > 0 ? searchPlatform : undefined,
    };

    const path = new URL("/api/search-listing", window.location.href);

    if (req.title) {
      path.searchParams.append("title", req.title);
    }

    if (req.seller) {
      path.searchParams.append("seller", req.seller);
    }

    if (req.searchCategory) {
      path.searchParams.append("searchCategory", req.searchCategory);
    }

    if (req.searchPlatform) {
      path.searchParams.append("searchPlatform", req.searchPlatform);
    }

    const res = await fetch(path);

    if (res.ok) {
      setListingsStore(await res.json());
    } else {
      alert("Failed to search listings.");
    }
  };
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
      bind:value={searchQuery}
      type="text"
      placeholder={`Search by ${searchBy}${searchCategory.length > 0 ? ` in ${searchCategory}` : ""}${searchPlatform.length > 0 ? ` for ${searchPlatform}` : ""}...`}
    />
    <button class="search" onclick={searchListings}>Search</button>
  </div>
  <div class="listings-container">
    {#if $listingsStore.length > 0}
      {#each $listingsStore as listing}
        <ListingResult model={listing} />
      {/each}
    {:else}
      <p>No listings found.</p>
    {/if}
  </div>
</main>

<style lang="scss">
  div.listings-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    width: 100%;
    padding-bottom: 1rem;
  }

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

      &.search {
        margin-right: 0;
      }
    }
  }

  :global(body.dark-mode) div.search-container {
    background-color: #1b1b1b;
    color: white;
  }
</style>
