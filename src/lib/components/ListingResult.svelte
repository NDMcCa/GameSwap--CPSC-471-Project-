<script lang="ts">
  export let title: string;
  export let username: string;
  export let price: number;
  export let description: string;
</script>

<div class="listing">
  <h2>{title}</h2>
  <p>{username}</p>
  <p>{price}</p>
  <p>{description}</p>
</div>
