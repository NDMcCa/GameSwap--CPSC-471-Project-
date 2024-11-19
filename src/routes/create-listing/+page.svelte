<script lang="ts">
  import Nav from "$lib/components/nav.svelte";

  import { page } from "$app/stores";
  import { setTokenStore } from "../../stores/tokenStore";

  setTokenStore($page.data.token);
</script>

<main>
  <Nav />
  <h1>Create Listing</h1>
</main>
