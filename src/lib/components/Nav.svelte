<script lang="ts">
  import "../../app.scss";

  import { goto } from "$app/navigation";
  import { setTokenStore, tokenStore } from "../../stores/tokenStore";
  import { UserVariant } from "$lib/models/UserVariant";
  import { page } from "$app/stores";
  import { setOffersStore } from "../../stores/offersStore";
  import type { SellerModel } from "$lib/models/SellerModel";

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    setTokenStore(undefined);
    setOffersStore([]);

    goto("/");
  };

  const toggleTheme = () => {
    window.document.body.classList.toggle("dark-mode");
  };
</script>

<div class="top-bar">
  <button on:click={() => goto("/")} class="title-container">
    <h1 class="game" style="font-family: Impact, sans-serif;">Game</h1>
    <h1 style="font-family: Impact, sans-serif; color: teal">Swap</h1>
  </button>
  {#if $page.url.pathname === "/moderator"}
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
      <button on:click={toggleTheme}>Mode</button>
    </div>
  {:else}
    <div class="user-container">
      {#if $tokenStore}
        <div>
          {$tokenStore.user.username} ({$tokenStore.variant.toLocaleLowerCase()})
        </div>
        {#if $tokenStore.variant == UserVariant.SELLER}
          <button on:click={() => goto("/listings/create")}
            >Create Listing</button
          >
          <button
            on:click={() =>
              goto(`/sellers/${($tokenStore.user as SellerModel).seller_id}`)}
            >My Profile</button
          >
        {/if}
        {#if $tokenStore.variant == UserVariant.MODERATOR}
          <button on:click={() => goto("/moderator")}>Moderator Tools</button>
          <button on:click={() =>goto("/profile")}>Edit Profile</button>
        {/if}
        {#if $tokenStore.variant == UserVariant.BUYER}
          <button on:click={() => goto(`/wishlist/${$page.data.token.user.buyer_id}`)}>View Wishlist</button>
        {/if}
        <button on:click={logout}>Logout</button>
        {#if $tokenStore.variant == UserVariant.SELLER}
          <button on:click={() =>goto("/profile")}>Edit Profile</button>
        {:else if $tokenStore.variant == UserVariant.BUYER}
          <button on:click={() => goto("/profile")}>Edit Profile</button>
        {/if}
      {:else}
        <button on:click={() => goto("/login")}>Login</button>
        <button on:click={() => goto("/register")}>Register</button>
      {/if}
      <button on:click={toggleTheme}>Mode</button>
    </div>
  {/if}
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

  :global(body.dark-mode) h1.game {
    color: white;
  }

  :global(body.dark-mode) div.top-bar {
    background-color: #0f0f0f;
    color: white;
  }
</style>
