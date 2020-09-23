<script>
  import { Router, Link } from "svelte-routing";
  export let url = "";
</script>

<style>
  #divider {
    width: 90%;
    max-width: 1000px;
    min-width: 300px;
    display: flex;
    margin: 0 auto;
    /* border-bottom: 1px solid black; */
    padding-bottom: 1rem;
    justify-content: center;
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
    color: #c1c1c1;
  }
  #divider :global(a) {
    text-decoration: none;
    color: #c1c1c1;
    font-size: 0.9rem;
  }
  #divider :global(a):hover {
    border-bottom: 2px solid #c1c1c1;
  }
  #divider :global(a)[aria-current="page"] {
    color: #3a3a3a;
    border-bottom: 2px solid #3a3a3a;
  }
  #divider :global(a):active,
  #divider :global(a):focus {
    outline: 0;
    -moz-outline-style: none;
  }
</style>

<div id="divider">
  <Router {url}>
    <div>
      <Link to="/">Published</Link>
      <span class="divide" />
      <Link to="about">About</Link>
      <span class="divide" />
      <Link to="resume">Resume</Link>
      <!-- <a href="">Resume</a> -->
    </div>
    <!-- <div class="space" /> -->
    <!-- <div class="right">
      <Links />
    </div> -->
  </Router>
</div>
