<script lang="ts">
    import { goto } from "$app/navigation";
    export let description: string;
    export let written_for: string;
    export let written_by: string;
    export let report_id: number;
    export let written_by_username: string;
    export let seller_username: string;
    export let seller_id: number;
    export let game_title: string;
  </script>
  
  <div class="report">
      <h2 class="username">{report_id}: {game_title} (LID: {written_for})</h2>
    <div class="listing-info">
      <p class="username">Reported By:  {written_by_username}</p>
      <p class="username">Seller:  {seller_username}</p>
    </div>
    <button on:click={() => goto(`../listings/${report_id}/view-report`)}>View</button>
  </div>
  
  <style lang="scss">
    .report {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      width: 100%;
      align-items: center;
    }
    
    .listing-info {
      p {
        margin: 0.3rem;
      }
    }
  
    h2 {
      color: black;
    }

    p {
      color: black;
    }
  
    :global(body.dark-mode) {
      h2 {
        color: white;
      }
  
      p {
        color: white;
      }
    }
  </style>
  
