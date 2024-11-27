<script lang="ts">
    import "../../app.scss";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Nav from "$lib/components/Nav.svelte"; 
    import ReportedListing from "$lib/components/ListingResult.svelte";
    import BanListItem from "$lib/components/BanListItem.svelte";
    import type { BannedSellerModel } from "$lib/models/SellerModel";
  import ListingResult from "$lib/components/ListingResult.svelte";

    const banned = $page.data.banned as BannedSellerModel[];
    // const reports = $page.data.banned as [];
    const reports: string | any[] = []; // Temporary placeholder code to avoid error
</script>

<main>
    <Nav />
    <h1>Moderator Tools</h1>
    <div class="content">
        <div class="ban-list">
            <h2>Ban List</h2>
                <div>
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
        </div>
        <div class="reports">
            <h2>Listing Reports</h2>
                <div>
                {#if reports.length > 0}
                    {#each reports as reported_listing} 
                        <ListingResult model={reported_listing} 
                        /> <!-- Temporary placeholder code to avoid error-->
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
        align-items: start;
        width: 80%;
        height: 100%;
        div {
            width: 50%;
            margin: 1rem;
            div{
                display: flex;
                flex-direction: column;
                align-items: left;
                height: max;
                box-shadow: inset 0 0 10px #1b1b1b;     
                margin: 0;         
                padding: 1rem;  
            }
        }
    }
    
    
    button {
        margin: 0.5rem;
    }

</style>