<script lang="ts">
	import type { PageProps } from './$types';
	import { fade, blur, slide} from 'svelte/transition';
	import { onMount } from 'svelte';
	let { data }: PageProps = $props();
	
	let selectedWork = $state(null);
	let hoverImg = $state("");
	
	const setSelectedProject = (work) => {
		if (selectedWork?.title === work.title && selectedWork) {
			selectedWork = null;
			return;
		}
		selectedWork = work;
	}
	
	onMount(()=> {
		window.addEventListener("mouseover", (event) => {
			console.log(event)
			if (event.target.id !== "img-hover") {
				hoverImg = ""
				return
			}
			else {
				hoverImg = event.target.dataset.hoverImg
			}
		})
	})
</script>

<section>
	<ul>
		{#each data.works as work}
			<li>
				<span id="work-date">
					{work.date}
				</span>
				<button id="work-title" onclick={() => setSelectedProject(work)}>
					{work.title}
				</button>
			</li>
		{/each}
	</ul>
	{#if selectedWork}
		<aside transition:fade={{duration: 100}}>
			<div id="img-container">
				<img id="article-img" src={selectedWork.img} alt="Screenshot of work">
				{#if hoverImg}
					<img transition:fade={{duration: 300}} id="article-img" src={hoverImg} alt="Screenshot of work">
				{/if}
			</div>
			{#if selectedWork.url !== ""}
				<h2><a href={selectedWork.url} target="_blank">{selectedWork.articleTitle}</a></h2>
			{:else}
				<h2>{selectedWork.articleTitle}</h2>
			{/if}
			<article>
				{@html selectedWork.description}
			</article>
		</aside>
	{/if}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4rem;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	#work-date {
		padding-right: 0.75rem;
	}
	#work-title {
		text-decoration: underline;
	}
	button {
		border: none;
		margin: 0;
		padding: 0;
		width: auto;
		overflow: visible;
		background: transparent;
		color: inherit;
		font: inherit;
		cursor: pointer;
		line-height: normal;
	}
	aside {
		justify-self: end;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	aside #img-container {
		max-width: 100%;
		display: grid;
		place-items: center;
		grid-template-columns: 1;
	}
	#img-container img{
		max-width: 100%;
		transition: all .3s ease-in-out;
		grid-row-start: 1;
		grid-column-start: 1;
	}
	article {
	}
	a {
		color: var(--flexoki-dark-tx)
	}
	:global #img-hover {
		text-decoration: underline;
	}
	:global #img-hover::after {
		display: inline-block;
		text-decoration: none;
		padding-left: 0.5ch;
		content:" ͒"
	}
</style>
