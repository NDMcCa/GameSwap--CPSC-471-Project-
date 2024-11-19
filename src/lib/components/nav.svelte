<script lang="ts">
  import "../../app.scss";

  import { goto } from "$app/navigation";
  import { setTokenStore, tokenStore } from "../../stores/tokenStore";
  import { UserVariant } from "$lib/models/UserVariant";

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    setTokenStore(undefined);
  };

  function toggle() {
    window.document.body.classList.toggle("dark-mode");
  }
</script>

<div class="top-bar">
  <button on:click={() => goto("/")} class="title-container">
    <h1 class="crap" style="font-family: Impact, sans-serif;">Game</h1>
    <h1 style="font-family: Impact, sans-serif; color: teal">Swap</h1>
  </button>
  <div class="user-container">
    {#if $tokenStore}
      <div>
        {$tokenStore.user.username} ({$tokenStore.variant.toLocaleLowerCase()})
      </div>
      {#if $tokenStore.variant == UserVariant.SELLER}
        <button on:click={() => goto("/create-listing")}>Create Listing</button>
      {/if}
      <button on:click={logout}>Logout</button>
    {:else}
      <button on:click={() => goto("/login")}>Login</button>
      <button on:click={() => goto("/register")}>Register</button>
    {/if}
    <button on:click={toggle}>Mode</button>
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

    h1 {
      margin: 0;
      font-size: 2.5rem;
    }
  }

  :global(body.dark-mode) h1.crap {
    color: white;
  }

  :global(body) div.top-bar {
    transition: background-color 0.3s;
  }

  :global(body.dark-mode) div.top-bar {
    background-color: #0f0f0f;
    color: white;
    transition: background-color 0.3s;
  }
</style>
