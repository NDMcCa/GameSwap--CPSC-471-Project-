<script lang="ts">
  import type { JoinedOfferModel } from "$lib/models/SendsOfferModel";

  export let model: JoinedOfferModel;
</script>

<div class="offer">
  <h3>{model.username}</h3>
  <p>{model.offer_comment}</p>
</div>

<style lang="scss">
  div.offer {
    padding: 0.7rem;
    background-color: white;
    color: #333;
    width: 100%;
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
