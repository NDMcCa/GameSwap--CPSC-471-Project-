<script lang="ts">
    import "../../app.scss";
    import Nav from "$lib/components/Nav.svelte";
    import { sellersStore, setSellersStore } from "../../stores/sellersStore";
    import { page } from "$app/stores";

    setSellersStore($page.data.sellers);
</script>


<main>
    <Nav />

    <div>
        <h1>Sellers:</h1>

        {#if $sellersStore.length > 0}
            {#each $sellersStore as seller}
                <h2>{seller.username}</h2>
            {/each}
        {:else}
        <p>No Sellers found.</p>
        {/if}
    </div>
</main>
