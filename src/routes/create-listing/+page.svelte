<script lang="ts">
  import Nav from "$lib/components/nav.svelte";
  import { page } from "$app/stores";
  import { setTokenStore } from "../../stores/tokenStore";
  import type { GameCategoryModel } from "$lib/models/GameCategoryModel";
  import type { GamePlatformModel } from "$lib/models/GamePlatformModel";

  setTokenStore($page.data.token);

  const categories = $page.data.categories as GameCategoryModel[];
  const platforms = $page.data.platforms as GamePlatformModel[];
</script>

<main>
  <Nav />
  <h1>Create Listing</h1>
  <form>
    <label for="title">Title</label>
    <input type="text" id="title" name="title" />

    <label for="description">Description</label>
    <textarea id="description" name="description"></textarea>

    <label for="price">Price</label>
    <input type="number" id="price" name="price" />

    <label for="category">Category</label>
    <select id="category" name="category">
      {#each categories as category}
        <option value={category.category_name}>{category.category_name}</option>
      {/each}
    </select>

    <label for="platform">Platform</label>
    <select id="platform" name="platform">
      {#each platforms as platform}
        <option value={platform.platform_name}>{platform.platform_name}</option>
      {/each}
    </select>

    <button type="submit">Create Listing</button>
  </form>
</main>
