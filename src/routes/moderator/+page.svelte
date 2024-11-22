<script lang="ts">
    import "../../app.scss";
    import { goto } from "$app/navigation";
    import Nav from "$lib/components/Nav.svelte";   
</script>

<main>
    <Nav />
    <h1>Moderator Tools</h1>
    <div class="content">
        <div class="ban-list">
            <h2>Ban List</h2>
        </div>
        <div class="reports">
            <h2>Reports</h2>
        </div>
    </div>
</main>

<style lang="scss">
    div.content {
        display: flex;
        flex-direction: row;
        align-items: start;
        width: 80%;
        height: 100%;
        div {
            display: flex;
            flex-direction: column;
            align-items: left;
            margin: 1rem;
            width: 50%;
            height: max;
        }
    }
    
    
    button {
        margin: 0.5rem;
    }

</style>