<script>
  export let award;
  export let showEvent;
</script>

<style>
  h4 {
    margin-bottom: 0rem;
  }
  .italic {
    font-style: italic;
  }
  .dark-gray {
    color: #3a3a3a;
  }
  a.link {
    color: #3a3a3a;
  }
  .award-box {
    padding-left: 10px;
  }
</style>

<a target="_blank" href={award.link}>
  <div class="award-box">
    <h4 class="dark-gray">{showEvent ? award.event + " | " : '' }{award.year} | {award.award} </h4>
    <a class="link" href="{award.project_link}">{award.project_name}</a>
  </div>
</a>
