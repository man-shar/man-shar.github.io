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

<main>
  <div id="top">
    <h1>{name}</h1>
    <div class="jobs">
      <p class="current">
        currently @<a target="_blank" href="https://defog.ai/">defog.ai</a>
      </p>
      <p class="past">
        <span class="">past</span>: news gfx at
        <a target="_blank" href="https://www.reuters.com/graphics/">Reuters</a>
        |
        <a target="_blank" href="https://twitter.com/PostGraphics">WaPo</a> | HT
      </p>
    </div>
    <Divider />
  </div>
  <Router {url}>
    <div class="page-container">
      <Route path="about" component={About} />
      <Route path="resume" component={Resume} />
      <Route path="/">
        <Projects {projects} />
      </Route>
    </div>
  </Router>
</main>

<style>
  main {
    text-align: center;
    min-width: 240px;
    margin: 0 auto;
  }

  a {
    color: #3a3a3a;
  }

  .current a {
    color: rgb(226, 163, 92);
  }

  .bigger {
    font-size: 1.3rem;
  }

  .lighter {
    opacity: 0.5;
    font-weight: bold;
  }
  .underline {
    text-decoration: underline;
  }
  .mt-2 {
    margin-top: 2em;
  }

  #top {
    background-color: #f6f6f6;
    padding-top: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;
  }

  #top p {
    /* white-space: pre-wrap; */
    max-width: 340px;
    /* margin: 0 auto; */
    margin-left: auto;
    margin-right: auto;
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
      font-size: 3rem;
    }
    .one-liner {
      font-size: 1.1rem;
    }
  }
  .page-container {
    padding-bottom: 50px;
  }
  .mb-5 {
    margin-bottom: 3rem;
  }
</style>
