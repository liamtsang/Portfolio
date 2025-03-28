<script>
  import { draggable } from '@neodrag/svelte';
  let { project, initialAngle, id, zIndex, moveCardToTop } = $props()

  let test = () => {
    moveCardToTop(id)
  }
</script>

<div class="drag-wrapper" use:draggable={{ onDragStart: test }}>
  <div class="project-card">
    <div class="project-card-tag">Lloydsteven.com {zIndex}</div>
    <img src="/{project}.png">
  </div>
</div>

<style>
  .drag-wrapper {
    z-index: var(--zIndex);
    position: relative;
    max-width: fit-content;
  }
  .project-card {
    position: relative;
    cursor: grab;
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
  .project-card:hover > .project-card-tag{
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
                0px 4px 4px 0px rgba(55,55,85,0.10),
                0px 3px 4px 6px rgba(213,213,213,0.15);
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
