<script>
  import { onMount } from "svelte";
  import { draggable } from "@neodrag/svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
    import { globalState } from "./globalstate.svelte";

  let { project, index, zIndex, moveCardToTop, initialAngle, savedPosition } = $props();

  // let localPosition = $derived(position);
  let cursor = $state("grab");
  let node = $state(null);

  let urlIdParam = $derived(page.params.id);
  let url = $derived(page.route.id);
  let blur = $derived(
    urlIdParam !== project && url === "/work/[id]" ? "3px" : "0px",
  );

  // $inspect(savedPosition)
  // $inspect(localPosition)

  onMount(() => {
    node = document.getElementById(`drag-wrapper-${project}`);
    if (node) {
      node.style.setProperty("--initialAngle", initialAngle);
      node.style.setProperty("--scale", "1");
    }
  });

  const startDrag = () => {
    cursor = "grabbing";
    moveCardToTop(project);
  };

  const stopDrag = () => {
    cursor = "grab";
  };

  const onclick = () => {
    globalState.projects[index].savedPosition = globalState.projects[index].position
    moveCardToTop(project);
    if (node) {
      node.style.setProperty("--transition", "transform 0.2s");
      node.style.setProperty("--initialAngle", "0deg");
      node.style.setProperty("--scale", "1.5");
      node.style.setProperty("pointer-events", "none");
    }
    goto(`/work/${project}`);
    globalState.projects[index].position = { x: 0, y: -200 };
    setTimeout(() => {
      node.style.setProperty("--transition", "none");
    }, 200);
  };
</script>

<div
  id="drag-wrapper-{project}"
  class="drag-wrapper"
  use:draggable={{
    position: globalState.projects[index].position,
    onDrag: ({ offsetX, offsetY }) => {
      globalState.projects[index].position = { x: offsetX, y: offsetY };
    },
    transform: ({ offsetX, offsetY }) => `translate(${offsetX}px, ${offsetY}px)`,
    onDragStart: startDrag,
    onDragEnd: stopDrag,
    bounds: "#canvas",
  }}
  {onclick}
  onkeypress={onclick}
  role="button"
  tabindex=""
>
  <div class="project-card" style="cursor: {cursor}; filter: blur({blur});">
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
    translate: none !important;
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
    transform: scale(var(--scale)) rotateZ(var(--initialAngle));
  }
  .project-card:hover {
    transform: scale(calc(var(--scale) * 1.05)) rotateZ(var(--initialAngle));
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
      0px 4px 4px 0px rgba(55, 55, 85, 0.25),
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
