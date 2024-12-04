<script lang="ts">
  import { setOffersStore, offersStore } from "../../stores/offersStore";
  import type { ClearOfferRequest } from "$lib/models/OfferRequests";
  import type { JoinedOfferModel } from "$lib/models/SendsOfferModel";

  export let model: JoinedOfferModel;

  const clearOffer = async () => {
    const req: ClearOfferRequest = {
      buyerId: model.buyer_id,
    };

    const result = await fetch(`/api/offers`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (result.ok) {
      setOffersStore(
        $offersStore.filter((offer) => offer.buyer_id !== model.buyer_id)
      );
    } else {
      alert("Failed to delete offer");
    }
  };
</script>

<div class="offer">
  <div class="container">
    <h3>{model.username}</h3>
    <button on:click={clearOffer}>Clear Offer</button>
  </div>
  <p>{model.offer_comment}</p>
</div>

<style lang="scss">
  div.container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background-color: #aa1616;
      color: white;
      border: none;
      padding: 0.4rem;
      cursor: pointer;
    }
  }

  div.offer {
    padding: 0.7rem;
    background-color: white;
    color: #333;
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 0;
    margin-top: 0.5rem;
  }

  :global(body.dark-mode) {
    div.offer {
      background-color: #333;
      color: white;
    }
  }
</style>
