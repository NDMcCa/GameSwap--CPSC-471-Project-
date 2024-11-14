<script lang="ts">
  import "../app.scss";

  import { goto } from "$app/navigation";
</script>

<main>
  <h1>GameSwap</h1>
  <div class="button-container">
    <button on:click={() => goto("/login")}>Login</button>
    <button on:click={() => goto("/register")}>Register</button>
  </div>
</main>
