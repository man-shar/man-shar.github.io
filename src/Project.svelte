<script>
  export let project;
  import Photo from "./Photo.svelte";
  import Name from "./Name.svelte";
</script>

<style >
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

  :global(#tonga > .project-image) {
    background-color: #10071a;;
  }

  :global(#megafires > .project-image) {
    background-color: black;
  }
  :global(#megafires > .project-image > video) {
    position: relative;
    top: 15px;
  }
</style>

<a target="_blank" href={project.link}>
  <div class="project" id="{project.img.split(".")[0]}">
    <Photo path={project.img} />
    <Name name={project.name}/>
  </div>
</a>
