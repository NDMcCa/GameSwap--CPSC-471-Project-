<script>
  import Nav from "$lib/components/Nav.svelte";

  import { page } from "$app/stores";
  import { setTokenStore } from "../../../stores/tokenStore";

  setTokenStore($page.data.token);
</script>

<main>
  <Nav />
</main>
