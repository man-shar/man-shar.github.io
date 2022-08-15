<script>
  import Award from "./Award.svelte";
  import awards from "./awards.json";
</script>

<div id="about-container">
  <p>
    I was born and raised in the city of Lucknow, Uttar Pradesh. The city's tenderness is hopefully still a part of me.
  </p>
  <p>I studied design at IIT Guwahati and have previously interned at the Info Design Lab at IDC, Hindustan
    Times, Scroll and The Washington Post.
  </p>

  <div class="line"></div>

  <p class="quote">
    <span class="italic gray">"If I have seen further, it is by standing on the shoulders of giants"</span>
  </p>
  <p>
    I've had the immense fortune of learning from the most talented and supportive
    people in the industry.
  </p>
  <p>
    An incomplete list of people who have always – knowingly or unknowingly – given me more kindness than I have deserved: 
    </p>
    <p class="person-container">
      <a class="person" href="https://twitter.com/SimonScarr">Simon Scarr</a> | <a class="person" href="https://twitter.com/monicaulmanu">Monica Ulmanu</a> | <a class="person" href="https://twitter.com/JonRMcClure">Jon McClure</a> | <a class="person" href="https://www.linkedin.com/in/matthew-weber-343ba4111/">Matthew Weber</a> | Jennifer T. | <a class="person" href="https://twitter.com/GurmanBhatia">Gurman Bhatia</a> | <a class="person" href="https://twitter.com/anandkatakam">Anand Katakam</a> | <a class="person" href="https://twitter.com/rishdotblog">Rishabh Srivastava</a> | <a class="person" href="https://twitter.com/Harry_Stevens">Harry Stevens</a> | <a class="person" href="https://twitter.com/timmeko">Tim Meko</a> | <a class="person" href="https://twitter.com/bonnieberkowitz">Bonnie Berkowitz</a> | <a class="person" href="https://twitter.com/chiquiesteban">Chiqui Esteban</a> | <a class="person" href="http://www.idc.iitb.ac.in/venkat/index.html">Prof. Venkatesh Rajamanickam</a>
    </p>

  <p>I'm forever in their debt.</p>

  <div class="line"></div>
  
  <div id="accolades-container">
    <h2>Accolades</h2>
    <h3>Individual recognition</h3>
    <div class="event-box">
    {#each awards.filter(d => d.project_name.indexOf("portfolio") >= 0) as award}
      <Award {award} showEvent={true} />
    {/each}
    </div>

    

    <h3 class="mt-5">Awards for projects I've been a part of </h3>
    {#each ["SND", "Malofiej"] as event}
    <div class="event-box">
      <h4 class="event-name {event}">{event}</h4>
      {#each awards.filter(d => d.event === event && d.project_name.indexOf("portfolio") === -1) as award}
        <Award {award} />
      {/each}
    </div>
    {/each}
  </div>
  
</div>

<style>
  #about-container {
    text-align: left;
    max-width: 1000px;
    margin: 3rem auto;
    width: 90%;
    min-width: 300px;
  }
  .italic {
    font-style: italic;
  }
  .gray {
    color: #999;
  }
  a.person {
    color: #3a3a3a;
    display: inline-block;
    padding: 5px;
  }
  .person-container {
    margin-left: -5px;
  }
 .mt-5 {
  margin-top: 3rem;
 }
 .event-box {
  padding-left: 10px;;
 }
 .event-name.Malofiej {
  margin-top: 2rem;
 }
 h3, h2, h4 {
  color: #333;
  font-weight: normal;
 }
 #accolades-container {
  /* border-top: 1px solid #ccc; */
 }
 .quote {
  /* font-size: 1.3rem; */
 }
 .line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 1.5rem auto;
 }
</style>
