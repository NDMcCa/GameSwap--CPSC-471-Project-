<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";

  import { page } from "$app/stores";
  import { setTokenStore, tokenStore } from "../../../stores/tokenStore";
  import type { JoinedGameListingModel } from "$lib/models/GameListingModel";
  import { UserVariant } from "$lib/models/UserVariant";

  setTokenStore($page.data.token);

  const listing = $page.data.listing as JoinedGameListingModel;
</script>

<main>
  <Nav />
  <section>
    <div class="title-container">
      <h1>{listing.title}</h1>
      <div class="options">
        {#if $tokenStore?.variant == UserVariant.MODERATOR}
          <button>Report</button>
          <button>Delete</button>
          <button>Edit</button>
        {/if}
        {#if $tokenStore?.variant == UserVariant.BUYER}
          <button>Send Offer</button>
          <button>Report</button>
        {/if}
      </div>
    </div>
    <div class="info-container">
      <span class="price">${listing.price}</span>
      <span class={`availability ${listing.is_sold ? "sold" : ""}`}
        >{listing.is_sold ? "Sold" : "Available"}</span
      >
    </div>
    <div class="seller-container">
      <span class="seller">{listing.username}</span>
      <a class="email" href={`mailto:${listing.email}`}>{listing.email}</a>
      <span class="rating">{listing.avg_rating}/5</span>
      <span class="city">{listing.city}</span>
    </div>
    <div class="categorization-container">
      <div>
        <strong>Category:</strong>
        {listing.category}
        <p>
          {listing.category_description}
        </p>
      </div>
      <div>
        <strong>Platform:</strong>
        {listing.platform}
        <p>
          {listing.platform_description}
        </p>
      </div>
    </div>
    <strong>Description:</strong>
    <p>{listing.description}</p>
  </section>
</main>

<style lang="scss">
  section {
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
    margin-top: 2rem;
    min-width: 400px;
    background-color: white;
  }

  :global(body.dark-mode) {
    section {
      background-color: #333;
    }
  }

  div.title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;

    h1 {
      margin: 0;
    }

    div.options {
      display: flex;
      gap: 1rem;

      button {
        padding: 0.4rem 0.7rem;
        border: none;
        background-color: rgb(111, 111, 228);
        color: white;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: rgb(111, 111, 228, 0.8);
        }
      }
    }
  }

  div.info-container,
  div.seller-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  span.price {
    font-size: 1.2rem;
    color: rgb(32, 217, 87);
  }

  span.availability {
    font-size: 1.2rem;
    color: rgb(31, 205, 31);

    &.sold {
      color: red;
    }
  }

  a.email {
    color: rgb(111, 111, 228);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  div.categorization-container {
    margin-top: 2rem;
    margin-bottom: 2rem;

    div {
      margin-bottom: 1.7rem;

      p {
        margin-top: 0.5rem;
      }
    }
  }

  p {
    margin: 0.5rem 0;
  }
</style>
