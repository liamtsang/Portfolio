<script>
  import { onMount } from 'svelte'
  import { draggable } from "@neodrag/svelte";
  import { goto } from "$app/navigation";
  let { project, id, zIndex, moveCardToTop } = $props();

  // This should come from props i think
  let position = $state({ x: 0, y: 0 });
  let cursor = $state("grab");
  let node = $state(null)

  onMount(() => {
    node = document.getElementById(`drag-wrapper-${project}`)
  })

  const startDrag = () => {
    // transition = "none"
    cursor = "grabbing";
    moveCardToTop(id);
  };

  const stopDrag = () => {
    cursor = "grab";
  };

  const onclick = () => {
    if (node) { node.style.setProperty("--transition", "transform 0.2s") }
    goto(`/work/${project}`);
    position = {x: 50, y: 0}
    setTimeout(()=> {
      node.style.setProperty("--transition", "none")
    }, 200)
  };
</script>

<div
  id="drag-wrapper-{project}"
  class="drag-wrapper"
  use:draggable={{
    position,
    onDrag: ({ offsetX, offsetY }) => {
      position = { x: offsetX, y: offsetY };
    },
    onDragStart: startDrag,
    onDragEnd: stopDrag,
    bounds: "#canvas",
  }}
  {onclick}
  onkeypress={onclick}
  role="button"
  tabindex=""
>
  <div class="project-card" style="cursor: {cursor}">
    <div class="project-card-tag">{project}.com</div>
    <img src="/{project}.png" alt={project} />
  </div>
</div>

<style>
  .drag-wrapper {
    z-index: var(--zIndex);
    position: absolute;
    max-width: fit-content;
    transition: var(--transition);
    user-select: none;
  }
  /* Ideally this z-index waits to initiate until after the transition 0.2s */
  .drag-wrapper:hover {
    z-index: 500;
    position: absolute;
    max-width: fit-content;
  }
  .project-card {
    max-width: fit-content;
    transition: transform 0.2s;
    transform: rotateZ(var(--initialAngle));
  }
  .project-card:hover {
    transform: scale(1.05) rotateZ(var(--initialAngle));
    transform-origin: center;
    transition: transform 0.1s;
    transition-timing-function: ease;
  }
  .project-card:hover > .project-card-tag {
    transform: translateY(-1px);
    transform-origin: center;
    transition: transform 0.2s;
    transition-timing-function: ease;
  }
  img {
    min-width: 500px;
    pointer-events: none;
    outline: 1px solid var(--dark-grey);
    border: 1px solid var(--white);
    box-shadow:
      0px 4px 4px 0px rgba(55, 55, 85, 0.1),
      0px 3px 4px 6px rgba(213, 213, 213, 0.15);
    display: block;
    border-radius: 0px 2px 2px 2px;
  }
  .project-card-tag {
    position: relative;
    z-index: -1;
    max-width: fit-content;
    padding: 2px 8px;
    border-radius: 2px 2px 0px 0px;

    outline: 1px solid var(--dark-grey);
    border: 1px solid var(--white);
    background: var(--light-grey);
    color: var(--black);

    font-family: "STIX Two Text", serif;
    font-optical-sizing: auto;
    font-style: normal;
    letter-spacing: -0.03rem;
    font-weight: 300;

    transform: translateY(calc(110% - 1px));
    transition: transform 0.2s;
    transition-timing-function: ease;
  }
</style>
