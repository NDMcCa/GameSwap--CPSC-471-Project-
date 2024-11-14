<script lang="ts">
  import "../../app.scss";

  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import type { TokenContent } from "$lib/jwt";

  const tokenContent = $page.data.token as TokenContent;

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    });

    goto("/");
  };
</script>

<main>
  <div class="top-bar">
    <h1>GameSwap</h1>
    <div class="user-container">
      <div>
        {tokenContent.user.username} ({tokenContent.variant.toLocaleLowerCase()})
      </div>
      <button on:click={logout}>Logout</button>
    </div>
  </div>
</main>

<style lang="scss">
  div.top-bar {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 0.7rem;
    width: 100%;
    box-sizing: border-box;
    z-index: 1000;

    div.user-container {
      display: flex;
      align-items: center;

      button {
        margin-left: 1rem;
      }
    }
  }
</style>
