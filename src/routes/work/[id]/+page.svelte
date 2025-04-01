<script lang="ts">
  import { goto } from '$app/navigation';
  import { navigating, page } from "$app/state"
  import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { globalState, moveCardToTop } from '$lib/globalstate.svelte';
  import { crossfade, fade, fly, scale, slide } from 'svelte/transition';
  
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

<div id="shadow-img-wrapper" {onclick} onkeydown={onclick} role="dialog" tabindex="0">
	<div id="inner-shadow-wrapper">
		<img src="/{project}.png">
		<article id="article-{project}" transition:fly={{y:350}}>
			<h1><a href={data.url} target="_blank">{data.title}</a></h1>
			<hr/>
			<p>{data.content}</p>
		</article>
	</div>
</div>

//TODO: The issue with the shadow image not lining up is the space given for the tag

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
		transform: translateY(-200px) scale(1.5);
	}
	img {
		min-width: 500px;
		opacity: 0;
	}
	article {
		position: absolute;
		bottom: 0;
		transform: translateY(calc(100% + 0rem));
		transition: transform 0.2s;
		display: flex;
		flex-direction: column;
		align-items: baseline;
		gap: 0.5rem;
		background-color: rgba(30,30,30, 0.95);
		padding-left: 2rem;
		padding-right: 2rem;
		padding-top: 1.5rem;
		padding-bottom: 1.5rem;
		border-radius: 1rem;
		border: 2px solid rgb(82,82,82);
		outline: 1px solid rgb(146,146,146);
		backdrop-filter: blur(4px);
		max-width: 45ch;
	}
	h1 {
		font-size: 1.2rem;
		text-underline-offset: 0.1rem;
		text-transform: capitalize;
		padding-bottom: 0.1rem;
	}
	a {
		color: var(--white);
	}
	hr {
		border-top: 1px solid rgba(202,202,202,0.4);
		color: rgba(0,0,0,0);
		width: 100%;
		margin: 0;
	}
	p {
		font-size: 0.8rem;
		line-height: 1.2rem;
		font-family: "IBM Plex Sans", sans-serif;
		font-weight: 400;
		letter-spacing: -0.03rem;
		color: rgba(202,202,202,1);
	}
</style>
