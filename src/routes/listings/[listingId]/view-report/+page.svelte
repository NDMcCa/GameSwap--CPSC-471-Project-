<script lang="ts">
    import Nav from "$lib/components/Nav.svelte";
    import "../../../../app.scss";
    import { page } from "$app/stores";
    import type { ShowListingReport } from "$lib/models/ListingReport";
    import { setTokenStore } from "../../../../stores/tokenStore";
    import { goto } from "$app/navigation";
    import type { DeleteListingRequest } from "$lib/models/ListingRequests";

    setTokenStore($page.data.token);

    let report = $page.data.report as ShowListingReport;

    const handleDeleteReport = async (report_id: number) => {
        if (confirm("Are you sure you want to remove this report?")) {
            try {
                const result = await fetch("/api/reports", {
                    method: "DELETE",
                    body: JSON.stringify({ report_id })
                });
                if (result.ok) {
                    goto(`../../../moderator/`);
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    const handleDeleteListing = async () => {
        if (confirm("Are you sure you want to remove this listing (all reports associated will also be removed)?")) {
            const req: DeleteListingRequest = {
                listingId: report.written_for,
            };

            const result = await fetch(`/api/listings`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(req),
            });

            if (result.ok) {
                goto(`../../../moderator/`);
            } else {
                alert("Failed to delete listing");
            }
        }
    };

</script>

<main>
    <Nav />
    <div class=reported>
        <h1>{report.report_id}: {report.game_title}</h1>
        <p>Reported By: {report.written_by_username}</p>
        <a href={`../../sellers/${report.seller_id}`}>Seller: {report.seller_username}</a>
        <p>{report.description}</p>
        <button on:click={() => goto(`../../../moderator/`)}>Return</button>
        <button on:click={() => handleDeleteReport(report.report_id)}>Delete Report</button>
        <button on:click={handleDeleteListing}>Delete Listing</button>
    </div>
</main>

<style lang="scss">
    a {
        color: inherit;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }  

    .reported {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 100%;
        align-items: center;
    }

    h1 {
        color: black;
    }

    p {
        color: black;
    }

    :global(body.dark-mode) {
        h1 {
            color: white;
        }

        p {
            color: white;
        }
    }
</style>