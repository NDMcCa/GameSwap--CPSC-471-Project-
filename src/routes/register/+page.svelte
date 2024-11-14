<script lang="ts">
  import "../../app.scss";

  import { goto } from "$app/navigation";
  import { emailRegex } from "$lib/regex";
  import type { RegisterRequest } from "$lib/models/RegisterRequest";

  let username = "";
  let password = "";
  let confirmPassword = "";
  let city = "";
  let email = "";
  let userType = "buyer";
  let errorMessage = "";

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    // Basic error checking
    if (!username || !password || !city || !userType || !email) {
      errorMessage = "All fields are required.";
      return;
    }

    // Check email format with regex
    if (!emailRegex.test(email)) {
      errorMessage = "Invalid email format.";
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      errorMessage = "Passwords do not match.";
      return;
    }

    // Register the user
    const req: RegisterRequest = {
      username,
      password,
      city,
      email,
    };

    const res = await fetch(`/api/register/${userType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    // Check if the registration was successful
    if (res.ok) {
      goto("/discover");
    } else {
      const error = await res.json();
      errorMessage = error.message || "Registration failed.";
    }
  };
</script>

<main>
  <h1>Register</h1>
  <div class="button-container">
    <form on:submit={handleSubmit}>
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        bind:value={username}
        required
      />

      <label for="email">Email</label>
      <input type="email" id="email" name="email" bind:value={email} required />

      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        bind:value={password}
        required
      />

      <label for="confirmPassword">Confirm Password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        bind:value={confirmPassword}
        required
      />

      <label for="city">City</label>
      <input type="text" id="city" name="city" bind:value={city} required />

      <label for="userType">User Type</label>
      <select id="userType" name="userType" bind:value={userType} required>
        <option value="buyer">Buyer</option>
        <option value="seller">Seller</option>
      </select>

      <button type="submit">Register</button>
    </form>
    <button on:click={() => goto("/")}>Back</button>
  </div>

  {#if errorMessage}
    <p style="color: red;">{errorMessage}</p>
  {/if}
</main>
