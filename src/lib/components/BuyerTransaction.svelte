<script lang="ts">
  import type { BuyerModel } from "$lib/models/BuyerModel";
  import type { JoinedTransactionModel } from "$lib/models/TransactionModel";

  export let buyerModel: BuyerModel;
  export let model: JoinedTransactionModel;
</script>

<div class="transaction">
  <h3>{model.title}</h3>
  <div>
    <span class="buyer">{buyerModel.username}</span>
    <span class="doublearrow">⇄</span>
    <span class="seller">{model.username}</span>
  </div>
</div>

<style lang="scss">
  div.transaction {
    padding: 0.7rem;
    background-color: white;
    color: #333;
    width: 100%;
  }

  span.doublearrow {
    margin: 0 0.3rem;
    color: rgb(15, 226, 15);
  }

  h3 {
    margin: 0;
  }

  :global(body.dark-mode) {
    div.transaction {
      background-color: #333;
      color: white;
    }
  }
</style>
