<script lang="ts">
    export let description: string;
    export let written_for: string;
    export let written_by: string;
    export let reportId: number;
  </script>
  
  <div class="banned-user">
    <h2 class="Listing: ">{written_for}</h2>
    <p class="Reported By: ">Banned by: {written_by}</p>
  </div>
  
  <style lang="scss">
    .banned-user {
      display: flex;
      flex-direction: row;
      gap: 2rem;
      width: 100%;
      align-items: center;
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
  
