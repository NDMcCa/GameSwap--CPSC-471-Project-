<script lang="ts">
import Nav from "$lib/components/Nav.svelte";

import { page } from "$app/stores";
    import type { GameListingModel } from "$lib/models/GameListingModel";
    import type { SellerModel } from "$lib/models/SellerModel";

const seller = $page.data.seller as SellerModel;
</script>

<main>
    <Nav />
    <h1>Report {seller.username}'s Listing </h1>
</main>