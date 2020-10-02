<script>
  export let name;
  export let projects;
  import { Router, Route } from "svelte-routing";
  import Divider from "./Divider.svelte";
  import Projects from "./Projects.svelte";
  import About from "./About.svelte";
  import Resume from "./Resume.svelte";
  export let url = "";
</script>

<style>
  main {
    text-align: center;
    min-width: 240px;
    margin: 0 auto;
  }

  #top {
    background-color: #f6f6f6;
    padding-top: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  h1 {
    text-align: center;
    font-size: 7rem;
    font-weight: 100;
    margin-bottom: 0;
    margin-top: 0;
    font-family: "Merriweather", serif, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
      sans-serif;
  }

  .one-liner {
    font-family: "Merriweather", serif, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
      sans-serif;
    margin-bottom: 5rem;
    font-size: 1.2rem;
    width: 90%;
    min-width: 300px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 3rem;
    }
    .one-liner {
      font-size: 1.1rem;
    }
  }

  @media (max-width: 640px) {
    h1 {
      font-size: 2.5rem;
    }
    .one-liner {
      font-size: 1.1rem;
    }
  }
</style>

<main>
  <div id="top">
    <h1>{name}</h1>
    <p class="one-liner">Pixel pusher</p>
    <Divider />
  </div>
  <Router {url}>
    <div>
      <Route path="about" component={About} />
      <Route path="resume" component={Resume} />
      <Route path="/">
        <Projects {projects} />
      </Route>
    </div>
  </Router>

  <!-- <Projects {projects} /> -->
</main>
