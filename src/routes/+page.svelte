<script>
  import ProjectCard from "$lib/project-card.svelte"
  
  let projects = $state([
    { id: 'card1', project: 'lloydsteven', initialAngle: '-3.62deg', zIndex: 0 },
    { id: 'card2', project: 'feel', initialAngle: '0deg', zIndex: 1 },
    { id: 'card3', project: 'feel', initialAngle: '0deg', zIndex: 2 },
  ]);

  // Some sort of effect / state issue where it fires multiple times
  const moveCardToTop = (id) => {
    console.log("Moving ", id)
    for (let i=0; i<projects.length; i++) {
      if (projects[i].id === id) {
        projects[i].zIndex = projects.length
      } else if (projects[i].id !== id && projects[i].zIndex !== 0) {
        projects[i].zIndex -= 1;
      } 
    }
    return;
  }
</script>

{#each projects as project, index}
  <ProjectCard 
    id={project.id}
    project={project.project} 
    zIndex={project.zIndex}
    moveCardToTop={moveCardToTop}
    --zIndex={project.zIndex}
    --initialAngle={project.initialAngle}
  />
{/each}
