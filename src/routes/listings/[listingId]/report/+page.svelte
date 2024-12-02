<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import "../../../../app.scss";
    import { page } from "$app/stores";
    import type { GameListingModel } from "$lib/models/GameListingModel";
    import type { SellerModel } from "$lib/models/SellerModel";
    import { setTokenStore } from "../../../../stores/tokenStore";
    import { goto } from "$app/navigation";
    import type { CreateListingReport } from "$lib/models/ListingReport";

    let description = "";
    let userType = "buyer";
    let errorMessage = "";
    let successMessage = "";
    const seller = $page.data.seller as SellerModel;
    let written_for = $page.data.listing.listing_id;

    setTokenStore($page.data.token);

    let written_by = $page.data.token.user.buyer_id;

    const handleSubmit = async (event: Event) => {
        event.preventDefault();

        try {
        const req: CreateListingReport = {
            description,
            written_by,
            written_for
        };

        const res = await fetch("/api/reports", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        });

        if (res.ok) {
            successMessage = "Report created successfully";

            // Clear form
            description = "";
        } else {
            errorMessage = "Failed to create report";
        }
        } catch (_) {
        errorMessage = "Create report request failed";
        }
    };
</script>

<main>
    <Nav />
    <div id="report-card">
    <h1>Report {seller.username}'s Listing </h1>

    <form on:submit={handleSubmit}>
        <label for="description">Report Description</label>
        <textarea bind:value={description} id="description" name="description"
         placeholder="Enter reason for report here"></textarea>
        <button type="submit">Submit Report</button>

    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {:else if successMessage}
        <p style="color: green;">{successMessage}</p>
    {/if}
    </form>
    </div>
</main>


<style>
    button {
        background-color: #FFCCCB;
    }

    #textbox {
        height:100px;
        width: 400px;
        font-size:14pt;
    }

</style>
