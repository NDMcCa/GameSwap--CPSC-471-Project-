<script lang="ts">
  import "../../app.scss";

  import { goto } from "$app/navigation";
  import type { AuthRequest } from "$lib/models/AuthRequest";

  let usernameOrEmail = "";
  let userType: "buyer" | "seller" | "moderator" = "buyer";
  let password = "";
  let errorMessage = "";

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    // Basic error checking
    if (!usernameOrEmail || !password) {
      errorMessage = "All fields are required.";
      return;
    }

    const req: AuthRequest = {
      usernameOrEmail,
      password,
    };

    const res = await fetch(`/api/login/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    // Check if the registration was successful
    if (res.ok) {
      goto("/");
    } else {
      const error = await res.json();
      errorMessage = error.message || "Login failed.";
    }
  };
</script>

<main>
  <h1>Login</h1>
  <div class="button-container">
    <form on:submit={handleSubmit}>
      <label for="usernameOrEmail">Username or Email</label>
      <input
        type="text"
        id="usernameOrEmail"
        name="usernameOrEmail"
        bind:value={usernameOrEmail}
        required
      />

      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        bind:value={password}
        required
      />

      <label for="userType">User Type</label>
      <select id="userType" name="userType" bind:value={userType}>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
        <option value="moderator">Moderator</option>
      </select>

      <button type="submit">Login</button>
    </form>
    <button on:click={() => goto("/")}>Back</button>
  </div>

  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</main>
