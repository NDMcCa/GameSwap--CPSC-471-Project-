<script lang="ts">
    export let banned_user: string;
    export let banning_moderator: string;
    export let seller_id: number;
  </script>
  
  <div class="banned-user">
    <h2 class="username">{banned_user}</h2>
    <p class="username">Banned by: {banning_moderator}</p>
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
  
