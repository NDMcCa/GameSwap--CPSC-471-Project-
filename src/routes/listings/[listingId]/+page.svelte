<script lang="ts">
  import Nav from "$lib/components/Nav.svelte";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { setTokenStore, tokenStore } from "../../../stores/tokenStore";
  import { UserVariant } from "$lib/models/UserVariant";
  import { offersStore, setOffersStore } from "../../../stores/offersStore";
  import type { JoinedGameListingModel } from "$lib/models/GameListingModel";
  import type { SellerModel } from "$lib/models/SellerModel";
  import type { GameCategoryModel } from "$lib/models/GameCategoryModel";
  import type { GamePlatformModel } from "$lib/models/GamePlatformModel";
  import type {
    DeleteListingRequest,
    SaveListingRequest,
  } from "$lib/models/ListingRequests";
  import type { SendOfferRequest } from "$lib/models/OfferRequests";
  import type { JoinedOfferModel } from "$lib/models/SendsOfferModel";
  import type { ConfirmTransactionRequest } from "$lib/models/TransactionRequests";
  import type { CreateWishlistListing } from "$lib/models/WishlistListing";
  import type { BuyerModel } from "$lib/models/BuyerModel";

  setTokenStore($page.data.token);

  const sellerOffers = $page.data.sellerOffers as
    | JoinedOfferModel[]
    | undefined;
  const categories = $page.data.categories as GameCategoryModel[];
  const platforms = $page.data.platforms as GamePlatformModel[];
  const listing = $page.data.listing as JoinedGameListingModel;
  const isOwner =
    listing.seller_id === ($tokenStore?.user as SellerModel)?.seller_id;

  let isEditing = false;

  const created_by = ($tokenStore?.user as BuyerModel)?.buyer_id;
  const created_for = $page.data.listing.listing_id;

  let successMessage = "";
  let errorMessage = "";

  const handleSave = async () => {
    const req: SaveListingRequest = {
      listingId: listing.listing_id,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      category: listing.category,
      platform: listing.platform,
    };

    const result = await fetch("/api/listings", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (result.ok) {
      isEditing = false;
    } else {
      alert("Failed to save listing");
    }
  };

  $: listing.category_description =
    categories.find((c) => c.category_name === listing.category)?.description ??
    "No category description available";

  $: listing.platform_description =
    platforms.find((p) => p.platform_name === listing.platform)?.description ??
    "No platform description available";

  const handleDelete = async () => {
    const req: DeleteListingRequest = {
      listingId: listing.listing_id,
    };

    const result = await fetch(`/api/listings`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (result.ok) {
      goto("/");
    } else {
      alert("Failed to delete listing");
    }
  };

  function handleReport() {
    goto(`/listings/${listing.listing_id}/report`);
  }

  let isWritingOffer = false;
  let offerComment = "";

  const handleSendOffer = async () => {
    const req: SendOfferRequest = {
      sellerId: listing.seller_id,
      offerComment,
    };

    const result = await fetch("/api/offers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (result.ok) {
      isWritingOffer = false;
      alert("Offer sent");
    } else {
      alert("You already have an offer on this listing");
    }
  };

  let isComposingTransaction = false;
  let selectedBuyer: number;

  $: selectedBuyerOfferComment = sellerOffers?.find(
    (offer) => offer.buyer_id === selectedBuyer
  )?.offer_comment;

  const openComposeTransaction = () => {
    if (sellerOffers && sellerOffers.length > 0) {
      isComposingTransaction = true;
    } else {
      alert("No offers to compose transaction with");
    }
  };

  const handleConfirmTransaction = async () => {
    const req: ConfirmTransactionRequest = {
      forListing: listing.listing_id,
      withBuyer: selectedBuyer,
    };

    const result = await fetch("/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (result.ok) {
      listing.is_sold = true;
      setOffersStore($offersStore.filter((o) => o.buyer_id !== selectedBuyer));
      isComposingTransaction = false;

      alert("Transaction confirmed");
    } else {
      alert("Failed to confirm transaction");
    }
  };

  const handleWishlistAdd = async (event: Event) => {
    event.preventDefault();

    try {
      const req: CreateWishlistListing = {
        created_by,
        created_for,
      };

      const res = await fetch("/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });

      if (res.ok) {
        successMessage = "Listing successfully added to wishlist";
      } else {
        errorMessage = "You have already added this listing to your wishlist";
      }
    } catch (_) {
      errorMessage = "Create wishlist listing request failed";
    }
  };
</script>

<main>
  <Nav />
  <section>
    <div class="title-container">
      <h1>{listing.title}</h1>
      {#if $tokenStore}
        <div class="options">
          {#if $tokenStore.variant == UserVariant.BUYER && !listing.is_sold}
            {#if isWritingOffer}
              <button on:click={() => (isWritingOffer = false)}
                >Cancel Offer</button
              >
              <button on:click={handleSendOffer}>Send Offer</button>
            {:else}
              <button on:click={() => (isWritingOffer = true)}
                >Compose Offer</button
              >
            {/if}
          {/if}
          {#if $tokenStore.variant == UserVariant.BUYER}
            <button on:click={handleWishlistAdd}>Add to Wishlist</button>
          {/if}
          {#if $tokenStore.variant == UserVariant.BUYER}
            <button on:click={handleReport}>Report</button>
          {/if}
          {#if isOwner || $tokenStore.variant == UserVariant.MODERATOR}
            {#if isEditing}
              <button on:click={handleSave}>Save</button>
            {:else}
              <button on:click={() => (isEditing = true)}>Edit</button>
            {/if}
            <button on:click={handleDelete}>Delete</button>
          {/if}
          {#if isOwner && !listing.is_sold}
            {#if isComposingTransaction}
              <button on:click={() => (isComposingTransaction = false)}
                >Cancel Transaction</button
              >
            {:else}
              <button on:click={openComposeTransaction}
                >Compose Transaction</button
              >
            {/if}
          {/if}
        </div>
      {/if}
    </div>
    {#if isWritingOffer}
      <div class="offer-input-container">
        <strong>Offer:</strong>
        <input type="text" bind:value={offerComment} />
      </div>
    {/if}
    {#if isComposingTransaction && sellerOffers}
      <div class="transaction-input-container">
        <div>
          <strong>Offer From:</strong>
          <select bind:value={selectedBuyer}>
            {#each sellerOffers as offer}
              <option value={offer.buyer_id}>{offer.username}</option>
            {/each}
          </select>
        </div>
        <button on:click={handleConfirmTransaction}>Confirm Transaction</button>
      </div>
      <p class="selected-buyer-comment">
        {selectedBuyerOfferComment}
      </p>
    {/if}
    <div class="info-container">
      {#if isEditing}
        <input type="number" bind:value={listing.price} />
      {:else}
        <span class="price">{listing.price}</span>
      {/if}
      <span class={`availability ${listing.is_sold ? "sold" : ""}`}
        >{listing.is_sold ? "Sold" : "Available"}</span
      >
    </div>
    <div class="seller-container">
      <a class="seller" href={`/sellers/${listing.seller_id}`}
        >{listing.username}</a
      >
      <a class="email" href={`mailto:${listing.email}`}>{listing.email}</a>
      <span class="rating">{listing.avg_rating}/5</span>
      <span class="city">{listing.city}</span>
    </div>
    <div class="categorization-container">
      {#if isEditing}
        <div>
          <strong>Category:</strong>
          <select bind:value={listing.category}>
            {#each categories as category}
              <option value={category.category_name}
                >{category.category_name}</option
              >
            {/each}
          </select>
        </div>
        <div>
          <strong>Platform:</strong>
          <select bind:value={listing.platform}>
            {#each platforms as platform}
              <option value={platform.platform_name}
                >{platform.platform_name}</option
              >
            {/each}
          </select>
        </div>
      {:else}
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
      {/if}
    </div>
    <strong>Description:</strong>
    {#if isEditing}
      <br />
      <textarea bind:value={listing.description}></textarea>
    {:else}
      <p>{listing.description}</p>
    {/if}
  </section>

  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {:else if successMessage}
    <p style="color: green;">{successMessage}</p>
  {/if}
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

  div.offer-input-container {
    margin-bottom: 1.5rem;

    input {
      padding: 0.5rem;
      border: 2px solid #ccc;
      outline: none;
    }
  }

  p.selected-buyer-comment {
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  div.transaction-input-container {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    select {
      padding: 0.5rem;
      border: 2px solid #ccc;
      outline: none;
    }

    button {
      $color: rgb(75, 163, 24);

      padding: 0.5rem;
      border: none;
      background-color: $color;
      color: white;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: darken($color, 10%);
      }
    }
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
      margin-right: 1rem;
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

  a.seller {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
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

    &::before {
      content: "$";
    }
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
