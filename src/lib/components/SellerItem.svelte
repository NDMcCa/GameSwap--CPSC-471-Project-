<script lang="ts">
    import type { SellerModel } from "$lib/models/SellerModel";
  
    export let model: SellerModel;

    function goToSellerPage() {
        window.location.href = `/sellers/${model.seller_id}`;
    }

    function handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      goToSellerPage();
    }
  }
  </script>


<div 
    class="seller-card"
    onclick={goToSellerPage}
    onkeydown={handleKey}
    tabindex="0"
    role="button">
    <h2>{model.username}</h2>
    <div class="info-container">
      <span><strong>Email:</strong> {model.email}</span>
      <span><strong>City:</strong> {model.city}</span>
      <span class="rating"><strong>Average Rating:</strong> {model.avg_rating}</span>
    </div>
  </div>
  
<style>
    .seller-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 16px;
      margin: 12px 0;
      background-color: #f9f9f9;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      cursor: pointer;
    }
  
    .seller-card h2 {
      margin-bottom: 8px;
      color: #333;
      text-decoration: N;
    }
  
    .info-container {
      display: flex;
      flex-direction: column;
      gap: 6px;
      color: #555;
    }
  
    .info-container span {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  
    .rating {
      font-weight: bold;
      color: teal;
    }
</style>
