<script lang="ts">
  import "../../app.scss";

  import { goto } from "$app/navigation";
  import { setTokenStore, tokenStore } from "../../stores/tokenStore";

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    setTokenStore(undefined);
  };
</script>

<div class="top-bar">
  <button on:click={() => goto("/")} class="title-container">
    <h1 style="font-family: Impact, sans-serif; color: black">Game</h1>
    <h1 style="font-family: Impact, sans-serif; color: teal">Swap</h1>
  </button>
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

<style lang="scss">
  div.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d3d3d3;
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

  button.title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0;
    border: none;
    background: transparent;
    font: inherit;
    cursor: pointer;
  }
</style>
