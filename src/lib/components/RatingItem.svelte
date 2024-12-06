<script lang="ts">
    import { goto } from "$app/navigation";
    import type { SellerModel } from "$lib/models/SellerModel";
    import type { SaveSellerRating } from "$lib/models/SellerRating";
    import exp from "constants";
  
    export let model: SaveSellerRating;
  
    function goToSellerPage() {
      goto(`/sellers/${model.written_for}`);
    }
  
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Enter" || event.key === " ") {
        goToSellerPage();
      }
    }
  </script>

  <div class="review">
    <h2>
      <p>{model.username}</p>
      <span>{model.rating}</span>
    </h2>
    <p class="desc">{model.description}</p>
  </div>
  
  <style lang="scss">
    .review {
      background-color: white;
      color: black;
      padding: 1rem;
      width: 100%;
    }
  
    h2 {
      margin: 0;
  
      a {
        color: inherit;
        text-decoration: none;
  
        &:hover {
          text-decoration: underline;
        }
      }
  
      span {
        color: rgb(233, 73, 73);
      }
    }
  
    a.username {
      margin: 0;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: inherit;
      text-decoration: none;
  
      &:hover {
        text-decoration: underline;
      }
    }
  
    div.info-container {
      display: flex;
      margin-top: 1rem;
      align-items: center;
  
      span.category,
      span.platform {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 0.9rem;
  
        &::before {
          content: "-";
          margin-right: 0.5rem;
          margin-left: 0.5rem;
        }
      }
  
      span.price {
        margin: 0;
        margin-top: 0.5rem;
        font-size: 1.2rem;
        color: rgb(37, 214, 37) !important;
  
        &::before {
          content: "$";
        }
      }
    }
  
    p.desc {
      margin: 0;
      margin-top: 1.5rem;
    }
  
    :global(body.dark-mode) {
      .listing {
        background-color: #333;
        color: white;
      }
  
      h2 {
        color: white;
      }
  
      p {
        color: white;
      }
    }
  </style>
  