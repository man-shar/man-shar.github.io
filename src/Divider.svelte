<script>
  import { Router, Link } from "svelte-routing";
  import Icon from "fa-svelte";
  import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";
  import { faGithub } from "@fortawesome/free-brands-svg-icons/faGithub";
  import { fa, faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";

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
    /* justify-content: center; */
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
    cursor: pointer;
  }
  #divider :global(a.icon) {
    position: relative;
    padding: 0 0.5rem;
  }
  #divider :global(a.icon-logo) {
    top: 1px;
  }
  #divider :global(a:not(.icon)):hover {
    border-bottom: 2px solid #c1c1c1;
  }
  #divider :global(a)[aria-current="page"] {
    color: #3a3a3a;
    border-bottom: 2px solid #3a3a3a;
  }
  #divider :global(a)[aria-current="page"]:hover {
    color: #3a3a3a;
    border-bottom: 2px solid #3a3a3a;
  }
  #divider :global(a):active,
  #divider :global(a):focus {
    outline: 0;
    -moz-outline-style: none;
  }
  #divider :global(a.icon):hover {
    color: #3a3a3a;
  }
  .flex-left {
    flex-grow: 2;
    text-align: left;
  }
  .flex-right {
  }
</style>

<div id="divider">
  <Router {url}>
    <div class="flex-left">
      <Link to="/">Published</Link>
      <span class="divide" />
      <Link to="about">About</Link>
      <span class="divide" />
      <a class="" title="Resume" href="assets/resume.pdf">c.v.</a>
    </div>
    <!-- <div class="space" /> -->
    <!-- <div class="right">
      <Links />
    </div> -->
  </Router>
  <div class="flex-right">
    <a
      class="icon icon-logo"
      title="Github"
      target="_blank"
      href="https://github.com/manas271196"><Icon icon={faGithub} /></a>
    <a
      class="icon icon-logo"
      title="Twitter"
      target="_blank"
      href="https://twitter.com/manshar_"><Icon icon={faTwitter} /></a>
  </div>
</div>
