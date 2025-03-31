<script lang="ts">
  import { goto } from '$app/navigation';
  import { navigating, page } from "$app/state"
  import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { globalState, moveCardToTop } from '$lib/globalstate.svelte';
  import { fly, slide } from 'svelte/transition';
  
	console.log(page.state)
	console.log(navigating.type)

  let { data }: PageProps = $props()
  let node = $state(null);
  let project = $derived(page.params.id);
	let projectIndex = globalState.projects.findIndex(x => x.project === project)

	const init = () => {
    globalState.projects[projectIndex].savedPosition = globalState.projects[projectIndex].position
    moveCardToTop(project);
    if (node) {
      node.style.setProperty("--transition", "transform 0.2s");
      node.style.setProperty("--initialAngle", "0deg");
      node.style.setProperty("--scale", "1.5");
      node.style.setProperty("pointer-events", "none");
    }
    globalState.projects[projectIndex].position = { x: 0, y: 0 };
    setTimeout(() => {
      node.style.setProperty("--transition", "none");
    }, 200);
  };

	onMount(() => {
    node = document.getElementById(`drag-wrapper-${project}`);
    if (!navigating.type) {
    	init()
    }
  });

  const onclick = () => {
  	goto("/")
		if (node) {
      node.style.setProperty("--transition", "transform 0.3s");
      node.style.setProperty("--initialAngle", globalState.projects[projectIndex].initialAngle);
      node.style.setProperty("--scale", "1");
      node.style.setProperty("pointer-events", "all");
	    setTimeout(() => {
	      node.style.setProperty("--transition", "none");
	    }, 300);
    }
		globalState.projects[projectIndex].position = globalState.projects[projectIndex].savedPosition
  }
</script>

<div id="shadow-img-wrapper" {onclick}>
	<div id="inner-shadow-wrapper">
		<img src="/{project}.png">
		<article transition:slide>
			<h1>{data.title}</h1>
			<p>{data.content}</p>
		</article>
	</div>
</div>

<style>
	#shadow-img-wrapper {
		width: 100%;
		height: 100%;
		min-height: 100%;
		display: grid;
		place-items: center;
		pointer-events: all;
	}
	#inner-shadow-wrapper {
		position: relative;
		min-width: fit-content;
		min-height: fit-content;
		transform: scale(1.5);
	}
	img {
		min-width: 500px;
		opacity: 0;
	}
	article {
		position: absolute;
		bottom: 0;
		transform: translateY(150%);
		display: flex;
		flex-direction: column;
		align-items: baseline;
		gap: 1rem;
	}
	h1 {
		font-size: 3rem;
	}
	p {
		font-size: 1rem;
	}
</style>
