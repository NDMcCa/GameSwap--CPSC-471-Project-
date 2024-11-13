<script lang="ts">
  import { authTokenContent } from "../stores/authStore";
</script>

<main>
  {#if !$authTokenContent}
    <!-- The user is not logged in -->
    <h1>GameSwap</h1>
    <button>Login</button>
    <button>Register</button>
  {:else}
    <!-- The user is logged in -->
    <p>Welcome, {$authTokenContent.user.username} as a {$authTokenContent.variant}!</p>
  {/if}
</main>
