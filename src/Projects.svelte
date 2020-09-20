<script>
  export let projects;
  import Project from "./Project.svelte";
</script>

<style>
  #projects-container {
    display: flex;
    max-width: 1000px;
    margin: 3rem auto;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

<div id="projects-container">
  {#each projects as project}
    <Project {project} />
  {/each}
</div>
