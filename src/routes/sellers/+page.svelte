<script lang="ts">
    import "../../app.scss";
    import Nav from "$lib/components/Nav.svelte";
    import { sellersStore, setSellersStore } from "../../stores/sellersStore";
    import { page } from "$app/stores";
    import SellerItem from "$lib/components/SellerItem.svelte";

    setSellersStore($page.data.sellers);
</script>


<main>
    <Nav />

    <div>
        <h1>Sellers:</h1>

        {#if $sellersStore.length > 0}
            {#each $sellersStore as seller}
            <SellerItem model={seller} />
            {/each}
        {:else}
            <p>No Sellers found.</p>
        {/if}
    </div>
</main>
