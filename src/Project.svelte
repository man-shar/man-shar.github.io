<script>
  export let project;
  import Photo from "./Photo.svelte";
  import Name from "./Name.svelte";
</script>

<style>
  .project {
    margin: 1rem;
    height: 250px;
    align-self: flex-start;
  }
  a {
    width: 33%;
    min-width: 250px;
    text-decoration: none;
    color: black;
  }
</style>

<a target="_blank" href={project.link}>
  <div class="project">
    <Photo path={project.img} />
    <Name name={project.name} />
  </div>
</a>
