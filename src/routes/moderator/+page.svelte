<script lang="ts">
  import "../../app.scss";

  import { page } from "$app/stores";
  import { setTokenStore } from "../../stores/tokenStore";
  import Nav from "$lib/components/Nav.svelte";
  import BanListItem from "$lib/components/BanListItem.svelte";
  import ReportedListingItem from "$lib/components/ReportedListingItem.svelte";
  import type { BannedSellerModel, SellerModel } from "$lib/models/SellerModel";
  import type { ShowListingReport } from "$lib/models/ListingReport";

  setTokenStore($page.data.token);

  let banned = $page.data.banned as BannedSellerModel[];
  let sellers = $page.data.sellers as SellerModel[];
  let reports = $page.data.reports as ShowListingReport[];

  const unban = async (user: BannedSellerModel) => {
    try {
      const result = await fetch("/api/unban", {
        method: "POST",
        body: JSON.stringify(user),
      });

      if (result.ok) {
        const newBanned = banned.filter(
          (bannedUser) => bannedUser.banned_user !== user.banned_user
        );

        banned = newBanned;

        const response = await fetch("/api/unban", {
          method: "GET",
        });

        if (response.ok) {
          const newSellers = (await response.json()) as SellerModel[];
          sellers = newSellers;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const ban = async (user: SellerModel) => {
    try {
      const result = await fetch("/api/ban", {
        method: "POST",
        body: JSON.stringify(user),
      });
      if (result.ok) {
        const newSellers = sellers.filter(
          (seller) => seller.username !== user.username
        );

        sellers = newSellers;

        const response = await fetch("/api/ban", {
          method: "GET",
        });

        if (response.ok) {
          const newBanned = (await response.json()) as BannedSellerModel[];
          banned = newBanned;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };
</script>

<main>
  <Nav />
  <h1>Moderator Tools</h1>
  <div class="content">
    <div class="ban-list">
      <h2>Ban List</h2>
      <div class="container">
        {#if banned.length > 0}
          {#each banned as banned_usr}
            <div class="mod-list-item">
              <BanListItem
                banned_user={banned_usr.banned_user}
                banning_moderator={banned_usr.banning_moderator}
                seller_id={banned_usr.seller_id}
              />
              <button on:click={() => unban(banned_usr)}>Unban</button>
            </div>
          {/each}
        {:else}
          <p>No banned sellers found.</p>
        {/if}
      </div>
    </div>
    <div class="sellers">
      <h2>Active Sellers</h2>
      <div class="container">
        {#if sellers.length > 0}
          {#each sellers as sellers_usr}
            <div class="mod-list-item">
              <BanListItem
                banned_user={sellers_usr.username}
                banning_moderator={sellers_usr.username}
                seller_id={sellers_usr.seller_id}
              />
              <button on:click={() => ban(sellers_usr)}>Ban</button>
            </div>
          {/each}
        {:else}
          <p>No active sellers found.</p>
        {/if}
      </div>
    </div>
    <div class="reports">
      <h2>Listing Reports</h2>
      <div class="container">
        {#if reports.length > 0}
          {#each reports as reported_listing}
            <div class="mod-list-item">
              <ReportedListingItem
                written_for={reported_listing.written_for.toString()}
                reportId={reported_listing.reportId}
                written_by_username={reported_listing.written_by_username}
                seller_username={reported_listing.seller_username}
                game_title={reported_listing.game_title}
              />
            </div>
          {/each}
        {:else}
          <p>No listings found.</p>
        {/if}
      </div>
    </div>
  </div>
</main>

<style lang="scss">
  div.content {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    height: 100%;

    div.ban-list,
    div.reports,
    div.sellers {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 1rem;
    }
  }

  div.container {
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 0.7rem;
    height: max;
    width: 100%;
  }

  .mod-list-item {
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 0.5rem;
    box-shadow: inset 0 0 5px #7c7c7c;
    box-sizing: border-box;
    background-color: #d3d3d3;
    button {
      width: 5rem;
    }
  }

  button {
    margin: 0.5rem;
  }

  :global(body.dark-mode) {
    .mod-list-item {
      background-color: #0f0f0f;
      box-shadow: inset 0 0 5px #000000;
    }
  }
</style>
