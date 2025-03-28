<script>
  import ProjectCard from "$lib/project-card.svelte"
  
  const projects = [
    { id: 'card1', project: 'lloydsteven', initialAngle: '-3.62deg' },
    { id: 'card2', project: 'feel', initialAngle: '0deg' },
  ];

</script>

<div class="container">
  {#each projects as project}
    <ProjectCard 
      id={project.id} 
      project={project.project} 
      --initialAngle={project.initialAngle}
    />
  {/each}
</div>
