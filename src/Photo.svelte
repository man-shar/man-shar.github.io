<script>
  export let path;
</script>

<style>
  .project-image {
    width: 100%;
    height: 150px;
    background-position: center;
    background-size: cover;
    overflow: hidden;
    margin-bottom: 1.4rem;
    display: flex;
    justify-content: center;
  }
</style>

<!-- <div class="project-image" style="background-image: url('')" /> -->
<div class="project-image">
  <!-- svelte-ignore a11y-media-has-caption -->

  {#if path && path.indexOf('mp4') !== -1}
    <video class="h-100" autoplay loop muted playsinline>
      <source src="assets/{path}" />
    </video>
  {:else}<img class="h-100" src="assets/{path}" alt="kn" />{/if}
</div>
