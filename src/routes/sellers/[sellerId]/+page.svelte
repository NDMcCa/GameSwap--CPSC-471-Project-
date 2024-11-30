<script lang="ts">
    import "../../../app.scss";
    import Nav from "$lib/components/Nav.svelte";
    import { page } from "$app/stores";
    import { setTokenStore, tokenStore } from "../../../stores/tokenStore";
    import type { SellerModel } from "$lib/models/SellerModel";

    setTokenStore($page.data.token);
  
    const seller = $page.data.seller as SellerModel;
</script>


<main>
    <Nav />
    <h1>{seller.username}</h1>


</main>
