<script lang="ts">
  import type { JoinedGameListingModel } from "$lib/models/GameListingModel";

  export let model: JoinedGameListingModel;
</script>

<div class="listing">
  <h2>
    <a href={`/listings/${model.listing_id}`}>{model.title}</a>
    {#if model.is_sold}
      <span>(Sold)</span>
    {/if}
  </h2>
  <a href={`/sellers/${model.seller_id}`} class="username">{model.username}</a>
  <div class="info-container">
    <span class="price">{model.price}</span>
    <span class="category">{model.category}</span>
    <span class="platform">{model.platform}</span>
  </div>
  <p class="desc">{model.description}</p>
</div>

<style lang="scss">
  .listing {
    background-color: white;
    color: black;
    margin-bottom: 0;
    padding: 1rem;
    width: 100%;
  }

  h2 {
    margin: 0;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    span {
      color: rgb(233, 73, 73);
    }
  }

  a.username {
    margin: 0;
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  div.info-container {
    display: flex;
    margin-top: 1rem;
    align-items: center;

    span.category,
    span.platform {
      margin: 0;
      margin-top: 0.5rem;
      font-size: 0.9rem;

      &::before {
        content: "-";
        margin-right: 0.5rem;
        margin-left: 0.5rem;
      }
    }

    span.price {
      margin: 0;
      margin-top: 0.5rem;
      font-size: 1.2rem;
      color: rgb(37, 214, 37) !important;

      &::before {
        content: "$";
      }
    }
  }

  p.desc {
    margin: 0;
    margin-top: 1.5rem;
  }

  :global(body.dark-mode) {
    .listing {
      background-color: #333;
      color: white;
    }

    h2 {
      color: white;
    }

    p {
      color: white;
    }
  }
</style>
