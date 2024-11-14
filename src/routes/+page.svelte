<script lang="ts">
  import "../app.scss";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { setTokenStore, tokenStore } from "../stores/tokenStore";
  import { listingsStore, setListingsStore } from "../stores/listingsStore";

  setTokenStore($page.data.token);
  setListingsStore($page.data.listings);

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    setTokenStore(undefined);
  };

  let searchBy: "seller" | "game" = "game";
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
  <div class="search-container">
    <select bind:value={searchBy}>
      <option value="seller">Seller</option>
      <option value="game">Game</option>
    </select>
    <input type="text" placeholder={`Search by ${searchBy}...`} />
    <button>Search</button>
  </div>
  <div class="listings-container">
    {#if $listingsStore.length > 0}
      {#each $listingsStore as listing}
        <div class="listing">
          <h2>{listing.title}</h2>
          <p>{listing.username}</p>
          <p>{listing.price}</p>
        </div>
      {/each}
    {:else}
      <p>No listings found.</p>
    {/if}
  </div>
</main>

<style lang="scss">
  div.search-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebebeb;
    padding: 0.7rem;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;

    select {
      margin-right: 1rem;
    }

    input {
      flex: 1;
      margin-right: 1rem;
    }

    button {
      margin-right: 1rem;
    }
  }

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
</style>
