<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";
  import "../../../app.scss";
  import { page } from "$app/stores";
  import type { SellerModel } from "$lib/models/SellerModel";
  import { setTokenStore } from "../../../stores/tokenStore";
  import { goto } from "$app/navigation";
  import type { CreateSellerRating } from "$lib/models/SellerRating";

  const seller = $page.data.seller as SellerModel;
  let rating = 1;
  let description = "";
  let errorMessage = "";
  let successMessage = "";
  let written_for = parseInt($page.params.sellerId);

  setTokenStore($page.data.token);

  let written_by = $page.data.token.user.buyer_id;

  const handleSubmit = async (event: Event) => {
      event.preventDefault();

      
      if (rating < 1 || rating > 5) { // Should never happen
          errorMessage = "Rating must be between 1 and 5";
          return;
      }

      if (description.length < 1) {
          errorMessage = "Description must not be empty";
          return;
      }

      try {
      const req: CreateSellerRating = {
        rating,
        description,
        written_by,
        written_for
      };

      const res = await fetch("/api/rating", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
      });

      if (res.ok) {
          goto(`../../sellers/${seller.seller_id}`);

          // Clear form
          description = "";
      } else {
          errorMessage = "Failed to create rating";
      }
      } catch (_) {
      errorMessage = "Create rating request failed";
      }
  };
</script>

<main>
  <Nav />
  <div id="rate-card">
  <h1>Rate {seller.username}</h1>
  

  <form on:submit={handleSubmit}>

      <label for="price">Rating</label>
      <input bind:value={rating} type="number" id="rating" name="rating" min="1" max="5" />

      <label for="description">Review</label>
      <textarea bind:value={description} id="description" name="description"
       placeholder="Enter your review here"></textarea>
      <button type="submit">Submit Rating</button>
      <button type="submit" on:click={() =>goto(`../../sellers/${seller.seller_id}`)}>Cancel</button>

  {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
  {/if}
  </form>
  </div>
</main>


<style>
  button {
      background-color: #fff;
  }

  #textbox {
      height:100px;
      width: 400px;
      font-size:14pt;
  }

</style>
