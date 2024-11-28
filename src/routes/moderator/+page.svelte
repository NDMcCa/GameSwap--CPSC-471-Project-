<script lang="ts">
    import "../../app.scss";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Nav from "$lib/components/Nav.svelte"; 
    import ReportedListing from "$lib/components/ListingResult.svelte";
    import BanListItem from "$lib/components/BanListItem.svelte";
    import type { BannedSellerModel, SellerModel } from "$lib/models/SellerModel";
    import ListingResult from "$lib/components/ListingResult.svelte";
    import { setTokenStore } from "../../stores/tokenStore";

    setTokenStore($page.data.token);

    let banned = $page.data.banned as BannedSellerModel[];
    let sellers = $page.data.sellers as SellerModel[];
    // const reports = $page.data.banned as [];
    const reports: string | any[] = []; // Temporary placeholder code to avoid error

    const unban = async (user: BannedSellerModel) => {
        try {
            const result = await fetch("/api/unban", {
                method: "POST",
                body: JSON.stringify(user)
            });
            if (result.ok) {
                const newBanned = banned.filter((bannedUser) => bannedUser.banned_user !== user.banned_user);
                banned = newBanned;
            }
        } catch (e) {
            console.error(e);
        }
    }

    const ban = async (user: SellerModel) => {
        try {
            const result = await fetch("/api/ban", {
                method: "POST",
                body: JSON.stringify(user)
            });
            if (result.ok) {
                const newSellers = sellers.filter((seller) => seller.username !== user.username);
                sellers = newSellers;
            }
        } catch (e) {
            console.error(e);
        }
    }

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
        <div class="Sellers">
            <h2>Active Sellers</h2>
                <div>
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

    .mod-list-item {
        display: flex;
        flex-direction: row;    
    }
    
    
    button {
        margin: 0.5rem;
    }

</style>