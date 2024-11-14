<script lang="ts">
  import "../app.scss";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { setTokenStore, tokenStore } from "../stores/tokenStore";
  import type { TokenContent } from "$lib/jwt";

  setTokenStore($page.data.token as TokenContent | undefined);

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    setTokenStore(undefined);
  };
</script>

<main>
  <div class="top-bar">
    <h1>GameSwap</h1>
    <div class="user-container">
      {#if $tokenStore}
        <div>
          {$tokenStore.user.username} ({$tokenStore.variant.toLocaleLowerCase()})
        </div>
        <button on:click={logout}>Logout</button>
      {:else}
        <button on:click={() => goto("/login")}>Login</button>
        <button on:click={() => goto("/register")}>Register</button>
      {/if}
    </div>
  </div>
</main>

<style lang="scss">
  div.top-bar {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 0.7rem;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;

    div.user-container {
      display: flex;
      align-items: center;

      button {
        margin-left: 1rem;
      }
    }
  }
</style>
