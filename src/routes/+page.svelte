<script lang="ts">
  import "../app.scss";

  import {
    authTokenContent,
    clearTokenContent,
    deleteJwt,
  } from "../stores/authStore";
  import { goto } from "$app/navigation";

  const logout = () => {
    deleteJwt();
    clearTokenContent();
  };
</script>

<main>
  {#if !$authTokenContent}
    <!-- The user is not logged in -->
    <h1>GameSwap</h1>
    <div class="button-container">
      <button on:click={() => goto("/login")}>Login</button>
      <button on:click={() => goto("/register")}>Register</button>
    </div>
  {:else}
    <!-- The user is logged in -->
    <button on:click={logout}>Logout</button>
    <p>
      Welcome, {$authTokenContent.user.username} as a {$authTokenContent.variant}!
    </p>
  {/if}
</main>
