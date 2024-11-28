<script lang="ts">
    export let title: string;
    export let username: string;
    export let rpusername: string;
    export let reason: string;
  </script>
  
  <div class="listing">
    <h2>{title}</h2>
    <p class="username">{username}</p>
    <p class="desc">Report reason: {reason}</p>
    <p class="username">Reported by: {rpusername}</p>
  </div>
  
  <style lang="scss">
    .listing {
      background-color: white;
      color: black;
      margin: 1rem;
      margin-bottom: 0;
      padding: 1rem;
      width: 100%;
    }
  
    h2 {
      margin: 0;
    }
  
    p.username {
      margin: 0;
      margin-top: 0.5rem;
      font-size: 0.9rem;
    }
  
    p.price {
      margin: 0;
      margin-top: 0.5rem;
      font-size: 1.2rem;
      color: rgb(37, 214, 37) !important;
  
      &::before {
        content: "$";
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
  