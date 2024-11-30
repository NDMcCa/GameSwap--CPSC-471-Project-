<script lang="ts">
  export let title: string;
  export let username: string;
  export let mdusername: string;
  export let reason: string;
</script>

<div class="banned-user">
  <h2>{title}</h2>
  <p class="username">{username}</p>
  <p class="username">Banned by: {mdusername}</p>
  <p class="desc">Ban reason: {reason}</p>
</div>

<style lang="banned-user">
  h2 {
    margin: 0;
  }

  p.username {
    margin: 0;
    margin-top: 0.5rem;
    font-size: 0.9rem;
  }

  p.desc {
    margin: 0;
    margin-top: 1.5rem;
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
