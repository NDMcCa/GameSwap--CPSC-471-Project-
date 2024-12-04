<script lang="ts">
    import "../../../app.scss";
  
    import { goto } from "$app/navigation";
    import { emailRegex } from "$lib/regex";
    import type { EditProfileRequest } from "$lib/models/EditProfileRequest";
    import { setTokenStore } from "../../../stores/tokenStore";
    import { page } from "$app/stores";

    setTokenStore($page.data.token);

    let city: string | undefined;
    let email = ""; 
    let userType = $page.data.token.variant;
    let errorMessage = "";

    console.log(userType);
    
    const handleSubmit = async (email: string | undefined, city: string | undefined) => {
  
      // Basic error checking
      if (!city && !email && userType !== "MODERATOR") {
        errorMessage = "At least one field is required.";
        return;
      }

      if (!email && userType === "MODERATOR") {
        errorMessage = "All fields are required.";
        return;
      }
  
      // Check email format with regex if the email field is not empty
      if (email && !emailRegex.test(email)) {
        errorMessage = "Invalid email format.";
        return;
      }
  
  
      // Edit the user
      const req: EditProfileRequest = {
        email,
        city
      };

      req.email = email;
      req.city = city;
  
      const res = await fetch(`/api/update-profile/${userType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
  
      // Check if the edit was successful
      if (res.ok) {
        goto("/");
      } else {
        const error = await res.json();
        errorMessage = error.message || "Profile update failed.";
      }
    };
  </script>
  
  <main>
    <h1>Edit Profile</h1>
    <div class="button-container">
      <form on:submit={() => handleSubmit(email, city)}>
  
        <label for="email">Email</label>
        <input type="email" id="email" name="email" bind:value={email} />
        
        {#if userType !== "MODERATOR"}
          <label for="city">City</label>
          <input type="text" id="city" name="city" bind:value={city} />
        {/if}
  
        <button type="submit">Update</button>
      </form>
      <button on:click={() => goto("/")}>Back</button>
    </div>
  
    {#if errorMessage}
      <p style="color: red;">{errorMessage}</p>
    {/if}
  </main>
  