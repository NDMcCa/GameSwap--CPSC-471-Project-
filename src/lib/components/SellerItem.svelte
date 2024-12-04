<script lang="ts">
  import { goto } from "$app/navigation";
  import type { SellerModel } from "$lib/models/SellerModel";

  export let model: SellerModel;

  function goToSellerPage() {
    goto(`/sellers/${model.seller_id}`);
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      goToSellerPage();
    }
  }
</script>

<div
  class="seller-card"
  onclick={goToSellerPage}
  onkeydown={handleKey}
  tabindex="0"
  role="button"
>
  <h2>{model.username}</h2>
  <div class="info-container">
    <span><strong>Email:</strong> {model.email}</span>
    <span><strong>City:</strong> {model.city}</span>
    <span class="rating"
      ><strong>Average Rating:</strong> {model.avg_rating}</span
    >
  </div>
</div>

<style lang="scss">
  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }

  div.seller-card {
    background-color: white;
    padding: 1rem;

    div.info-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 0.5rem;
    }
  }

  :global(body.dark-mode) {
    div.seller-card {
      background-color: #333;
    }
  }
</style>
