<script>
  import Links from "./Links.svelte";
  import { Router, Link } from "svelte-routing";
  export let url = "";
</script>

<style>
  #divider {
    width: 100%;
    max-width: 1000px;
    display: flex;
    margin: 0 auto;
    /* border-bottom: 1px solid black; */
    padding-bottom: 1rem;
  }
  .left {
    align-self: flex-start;
  }
  .right {
    align-self: flex-end;
  }
  .space {
    flex-grow: 2;
  }
  span.divide::before {
    content: "|";
    padding: 0 1rem;
  }
  #divider :global(a) {
    text-decoration: none;
    color: #c1c1c1;
  }
  #divider :global(a):hover {
    text-decoration: underline;
  }
  #divider :global(a)[aria-current="page"] {
    color: #3a3a3a;
  }
</style>

<div id="divider">
  <Router {url}>
    <div class="left">
      <Link to="/">Published</Link>
      <span class="divide" />
      <Link to="about">About</Link>
    </div>
    <div class="space" />
    <div class="right">
      <Links />
    </div>
  </Router>
</div>
