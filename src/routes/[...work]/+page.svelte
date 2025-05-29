<script lang="ts">
	import type { PageProps } from "./$types";
	import { fade, blur, slide } from "svelte/transition";
	import { onMount } from "svelte";
	import type { Work } from "$lib/types";
	let { data }: PageProps = $props();
	let selectedWork = $state<Work | null>(null);
	let hoverImg = $state("");
	let clickedHoverElement = $state<HTMLElement | null>(null);

	const setSelectedProject = (work: Work) => {
		if (selectedWork?.title === work.title && selectedWork) {
			selectedWork = null;
			return;
		}
		selectedWork = work;
	};

	onMount(() => {
		const handleMouseover = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.classList.contains("img-hover")) {
				// Only clear hover image if it wasn't set by click
				if (!clickedHoverElement) {
					hoverImg = "";
				}
				return;
			}
			// Don't override click-set hover image with mouseover
			if (!clickedHoverElement) {
				hoverImg = target.dataset.hoverImg || "";
			}
		};

		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement;

			// If clicking on an img-hover element
			if (target.classList.contains("img-hover")) {
				event.preventDefault();
				event.stopPropagation();

				// If this element is already clicked, unset it
				if (clickedHoverElement === target) {
					clickedHoverElement = null;
					hoverImg = "";
				} else {
					// Set new clicked element and its hover image
					clickedHoverElement = target;
					hoverImg = target.dataset.hoverImg || "";
				}
				return;
			}

			// If clicking anywhere else and there's a clicked hover element, clear it
			if (clickedHoverElement) {
				clickedHoverElement = null;
				hoverImg = "";
			}
		};

		window.addEventListener("mouseover", handleMouseover);
		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("mouseover", handleMouseover);
			window.removeEventListener("click", handleClick);
		};
	});
</script>

<section>
	<ul id="work-list">
		{#each data.works as work}
			<li>
				<span class="work-date">
					{work.date}
				</span>
				<button
					class={`work-title ${selectedWork !== null && selectedWork.title === work.title ? "work-selected" : ""}`}
					onclick={() => setSelectedProject(work)}
				>
					{work.title}
				</button>
			</li>
		{/each}
	</ul>
	{#if selectedWork}
		<aside transition:fade={{ duration: 100 }}>
			<div class="img-container">
				<img
					class="article-img"
					src={selectedWork.img}
					alt="Screenshot of work"
				/>
				{#if hoverImg}
					<img
						transition:fade={{ duration: 100 }}
						class="article-img"
						src={hoverImg}
						alt="Screenshot of work"
					/>
				{/if}
			</div>
			<div id="article-header">
				{#if selectedWork.url !== ""}
					<h2>
						<a href={selectedWork.url} target="_blank"
							>{selectedWork.articleTitle}</a
						>
					</h2>
				{:else}
					<h2>{selectedWork.articleTitle}</h2>
				{/if}
				<ul id="tag-container">
					{#each selectedWork.tags as tag}
						<li>{tag}</li>
					{/each}
				</ul>
			</div>
			<article>
				{@html selectedWork.description}
			</article>
		</aside>
	{/if}
</section>

<style>
	section {
		display: grid;
	}
	@media (min-width: 0px) {
		section {
			grid-template-rows: auto 1fr;
			gap: 2rem;
		}
	}
	@media (min-width: 576px) {
		section {
			grid-template-columns: auto 1fr;
			gap: 4rem;
		}
	}
	#work-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.work-date {
		padding-right: 0.75rem;
	}
	.work-title {
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
	button:hover {
		color: var(--flexoki-yellow-100);
	}
	.work-selected {
		color: var(--flexoki-yellow-400) !important;
	}
	aside {
		justify-self: end;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	aside .img-container {
		max-width: 100%;
		display: grid;
		place-items: center;
		grid-template-columns: 1;
	}
	.img-container img {
		max-width: 100%;
		aspect-ratio: 10 / 8;
		transition: all 0.3s ease-in-out;
		grid-row-start: 1;
		grid-column-start: 1;
	}
	#article-header {
		display: flex;
		justify-content: space-between;
	}
	#tag-container {
		display: flex;
		gap: 0.5rem;
		color: var(--flexoki-dark-tx-2);
		font-weight: 300;
	}
	#tag-container li {
	}
	article {
		line-height: 1.3rem;
		text-wrap: pretty;
		font-weight: 300;
	}
	a {
		color: var(--flexoki-dark-tx);
	}
	:global .img-hover {
		/* text-decoration: underline; */
		cursor: pointer;
		color: var(--flexoki-yellow-300);
	}
	:global .img-hover:hover {
		color: var(--flexoki-yellow-100);
	}
	/*
	:global .img-hover::after {
		display: inline-block;
		text-decoration: none;
		padding-left: 0.5ch;
		content: " ͒";
	}
	*/
</style>
