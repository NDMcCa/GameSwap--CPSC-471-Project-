<script lang="ts">
    import "../../app.scss";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Nav from "$lib/components/Nav.svelte"; 
    import ReportedListing from "$lib/components/ListingResult.svelte";
    import BanListItem from "$lib/components/BanListItem.svelte";
    import type { BannedSellerModel } from "$lib/models/SellerModel";

    const banned = $page.data.banned as BannedSellerModel[];
    const reports = $page.data.banned as [];
</script>

<main>
    <Nav />
    <h1>Moderator Tools</h1>
    <div class="content">
        <div class="ban-list">
            <h2>Ban List</h2>
            {#if banned.length > 0}
                {#each banned as banned_usr}
                    <BanListItem
                        banned_user={banned_usr.banned_user}
                        banning_moderator={banned_usr.banning_moderator} 
                    />
                {/each}
            {:else}
                <p>No listings found.</p>
            {/if}
        </div>
        <div class="reports">
            <h2>Listing Reports</h2>
            <!-- {#if $listingsStore.length > 0}
                {#each $listingsStore as listing}
                    <ReportedListing
                        title={listing.title}
                        username={listing.username} 
                        price={listing.price}
                        description={listing.description}
                    />
                {/each}
            {:else}
                <p>No listings found.</p>
            {/if} -->
        </div>
    </div>
</main>

<style lang="scss">
    div.content {
        display: flex;
        flex-direction: row;
        align-items: start;
        width: 80%;
        height: 100%;
        div {
            display: flex;
            flex-direction: column;
            align-items: left;
            margin: 1rem;
            width: 50%;
            height: max;
        }
    }
    
    
    button {
        margin: 0.5rem;
    }

</style>