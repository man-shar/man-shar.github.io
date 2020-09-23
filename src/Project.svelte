<script>
  export let project;
  import Photo from "./Photo.svelte";
  import Name from "./Name.svelte";
</script>

<style>
  .project {
    margin: 1rem;
    margin-top: 4rem;
    height: 250px;
    align-self: flex-start;
  }
  a {
    width: 33%;
    min-width: 300px;
    text-decoration: none;
    color: black;
  }
  a:active,
  a:focus {
    outline: 0;
    border: none;
    -moz-outline-style: none;
  }
  @media (max-width: 350px) {
    a {
      width: 90%;
    }
  }
</style>

<a target="_blank" href={project.link}>
  <div class="project">
    <Photo path={project.img} />
    <Name name={project.name} />
  </div>
</a>
