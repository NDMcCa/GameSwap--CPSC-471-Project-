<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import { page } from "$app/stores";
  import { setTokenStore } from "../../stores/tokenStore";
  import type { GameCategoryModel } from "$lib/models/GameCategoryModel";
  import type { GamePlatformModel } from "$lib/models/GamePlatformModel";
  import type { CreateListingRequest } from "$lib/models/CreateListingRequest";

  setTokenStore($page.data.token);

  const categories = $page.data.categories as GameCategoryModel[];
  const platforms = $page.data.platforms as GamePlatformModel[];

  let title = "";
  let description = "";
  let price = 0;
  let category = categories[0].category_name;
  let platform = platforms[0].platform_name;

  let successMessage = "";
  let errorMessage = "";

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    try {
      const req: CreateListingRequest = {
        title,
        description,
        price,
        category,
        platform,
      };

      const res = await fetch("/api/create-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      if (res.ok) {
        successMessage = "Listing created successfully";

        // Clear form
        title = "";
        description = "";
        price = 0;
        category = categories[0].category_name;
        platform = platforms[0].platform_name;
      } else {
        errorMessage = "Failed to create listing";
      }
    } catch (_) {
      errorMessage = "Create listing request failed";
    }
  };
</script>

<main>
  <Nav />
  <h1>Create Listing</h1>
  <form on:submit={handleSubmit}>
    <label for="title">Title</label>
    <input bind:value={title} type="text" id="title" name="title" />

    <label for="description">Description</label>
    <textarea bind:value={description} id="description" name="description"
    ></textarea>

    <label for="price">Price</label>
    <input bind:value={price} type="number" id="price" name="price" />

    <label for="category">Category</label>
    <select bind:value={category} id="category" name="category">
      {#each categories as category}
        <option value={category.category_name}>{category.category_name}</option>
      {/each}
    </select>

    <label for="platform">Platform</label>
    <select bind:value={platform} id="platform" name="platform">
      {#each platforms as platform}
        <option value={platform.platform_name}>{platform.platform_name}</option>
      {/each}
    </select>

    <button type="submit">Create Listing</button>

    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {:else if successMessage}
      <p style="color: green;">{successMessage}</p>
    {/if}
  </form>
</main>
