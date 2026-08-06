<script lang="ts">
	import type { PageProps } from "./$types";
	import { fade, blur, slide, scale, fly } from "svelte/transition";
	import { onMount, untrack } from "svelte";
	import type { Work } from "$lib/types";
    import { linear, quartIn, quartOut, quartInOut, cubicOut } from "svelte/easing";
	let { data }: PageProps = $props();
	let selectedWork = $state<Work | null>(null);
	let hoverImg = $state("");
	let clickedHoverElement = $state<HTMLElement | null>(null);
	let preloadImageUrls = $state<string[]>([]);

	// 1 = moving down the list (slides right), -1 = moving up (slides left)
	let slideDir = $state(1);
	let sliding = $state(false);

	let listEl = $state<HTMLElement | null>(null);
	let itemEls = $state<HTMLElement[]>([]);
	let dotTop = $state(0);
	let dotStretch = $state(1);

	const selectedIndex = $derived(
		selectedWork
			? data.works.findIndex((w) => w.title === selectedWork?.title)
			: -1,
	);

	// Animate the dot in JS (same 170ms cubicOut as the aside's fly) so we
	// can read its per-frame velocity and squash/stretch it accordingly.
	const DOT_DURATION = 170;
	const cubicOutEase = (t: number) => 1 - Math.pow(1 - t, 3);
	let dotRaf = 0;
	let dotVisible = false;

	const moveDotTo = (target: number) => {
		cancelAnimationFrame(dotRaf);
		const from = dotTop;
		const start = performance.now();
		let lastPos = from;
		let lastTime = start;
		let landed = false;
		const step = (now: number) => {
			const t = Math.min(1, (now - start) / DOT_DURATION);
			dotTop = from + (target - from) * cubicOutEase(t);
			const dt = Math.max(1, now - lastTime);
			if (t < 1) {
				const velocity = Math.abs(dotTop - lastPos) / dt; // px per ms
				const targetStretch = 1 + Math.min(velocity * 2, 2);
				// Snap up to peak stretch instantly, relax back gradually so the
				// squish stays readable for the whole move instead of one frame.
				dotStretch =
					targetStretch > dotStretch
						? targetStretch
						: dotStretch + (targetStretch - dotStretch) * 0.15;
			} else if (!landed) {
				landed = true;
				// Landing squash: flip whatever stretch is left the other way
				// (wide and flat), then let it relax back to a circle.
				dotStretch = Math.max(0.25, 1 / Math.max(dotStretch, 5.2));
			} else {
				dotStretch += (1 - dotStretch) * 0.15;
			}
			lastPos = dotTop;
			lastTime = now;
			if (t < 1 || Math.abs(dotStretch - 1) > 0.01) {
				dotRaf = requestAnimationFrame(step);
			} else {
				dotStretch = 1;
			}
		};
		dotRaf = requestAnimationFrame(step);
	};

	$effect(() => {
		const el = selectedIndex >= 0 ? itemEls[selectedIndex] : null;
		if (el) {
			const target = el.offsetTop + el.offsetHeight / 2;
			// moveDotTo reads dotTop, so without untrack every animation frame
			// would re-trigger this effect and restart the tween from t=0 —
			// the move then never "lands" and the squash never fires.
			untrack(() => {
				if (dotVisible) {
					moveDotTo(target);
				} else {
					dotTop = target;
				}
			});
			dotVisible = true;
		} else {
			dotVisible = false;
			cancelAnimationFrame(dotRaf);
			dotStretch = 1;
		}
	});

	// Wheel delta maps onto a virtual scroll position so a flick with
	// momentum sweeps the list like a regular page scroll, instead of
	// stepping one item per cooldown tick.
	const WHEEL_STEP = 100; // px of wheel delta per item
	let virtualScroll = 0;

	const setSelectedProject = (work: Work, fromWheel = false) => {
		// A hover image locked in by clicking a description link belongs to
		// the outgoing project — drop it so the next one shows its own image.
		clickedHoverElement = null;
		hoverImg = "";
		if (selectedWork?.title === work.title && selectedWork) {
			selectedWork = null;
			return;
		}
		const newIndex = data.works.findIndex((w) => w.title === work.title);
		if (selectedWork) {
			const oldIndex = data.works.findIndex(
				(w) => w.title === selectedWork?.title,
			);
			slideDir = newIndex > oldIndex ? 1 : -1;
		}
		// Clicks re-anchor the virtual scroll; wheel keeps its fractional
		// progress so momentum isn't quantized away mid-gesture.
		if (!fromWheel) virtualScroll = newIndex * WHEEL_STEP;
		selectedWork = work;
	};

	onMount(() => {
		// Set up preload URLs
		preloadImageUrls = [
			...data.works.map(work => work.img),
			...data.works.flatMap(work => {
				// Extract hover images from the description HTML
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = work.description;
				return Array.from(tempDiv.querySelectorAll('.img-hover'))
					.map(el => (el as HTMLElement).dataset.hoverImg)
					.filter((url): url is string => typeof url === 'string');
			})
		];

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

		const handleKeydown = (event: KeyboardEvent) => {
			let dir = 0;
			switch (event.key) {
				case "ArrowDown":
				case "ArrowRight":
				case "s":
				case "S":
				case "d":
				case "D":
					dir = 1;
					break;
				case "ArrowUp":
				case "ArrowLeft":
				case "w":
				case "W":
				case "a":
				case "A":
					dir = -1;
					break;
				default:
					return;
			}
			event.preventDefault();
			if (!selectedWork) {
				// Nothing selected yet: stepping down enters the list at the top.
				if (dir > 0) setSelectedProject(data.works[0]);
				return;
			}
			const next = selectedIndex + dir;
			if (next < 0 || next >= data.works.length) return;
			setSelectedProject(data.works[next]);
		};

		const handleWheel = (event: WheelEvent) => {
			event.preventDefault();
			if (!selectedWork) {
				// Nothing selected yet: scrolling down enters the list at the top.
				if (event.deltaY > 0) setSelectedProject(data.works[0]);
				return;
			}
			const maxScroll = (data.works.length - 1) * WHEEL_STEP;
			virtualScroll = Math.max(
				0,
				Math.min(maxScroll, virtualScroll + event.deltaY),
			);
			const idx = Math.round(virtualScroll / WHEEL_STEP);
			if (idx !== selectedIndex) setSelectedProject(data.works[idx], true);
		};

		window.addEventListener("mouseover", handleMouseover);
		window.addEventListener("click", handleClick);
		window.addEventListener("keydown", handleKeydown);
		listEl?.addEventListener("wheel", handleWheel, { passive: false });

		return () => {
			window.removeEventListener("mouseover", handleMouseover);
			window.removeEventListener("click", handleClick);
			window.removeEventListener("keydown", handleKeydown);
			listEl?.removeEventListener("wheel", handleWheel);
		};
	});
</script>

<svelte:head>
	{#each preloadImageUrls as imageUrl}
		<link rel="preload" as="image" href={imageUrl} />
	{/each}
</svelte:head>

<section>
	<ul id="work-list" bind:this={listEl}>
		{#if selectedWork}
			<span
				class="scroll-dot"
				transition:fade={{ duration: 50 }}
				style="top: {dotTop}px; transform: translateY(-100%) scale({1 / Math.sqrt(dotStretch)}, {dotStretch})"
			></span>
		{/if}
		{#each data.works as work, i}
			<li bind:this={itemEls[i]}>
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
		<aside transition:fade={{ duration: 50 }} class:sliding>
			{#key selectedWork.title}
				<div
					class="aside-img"
					in:fly={{ x: `${slideDir * 100}%`, duration: 170, delay: 0, opacity: 0.9, easing: cubicOut }}
					out:fly={{ x: `${-slideDir * 100}%`, duration: 170, opacity: 0.9, easing: cubicOut }}
					onoutrostart={() => (sliding = true)}
				>
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
				</div>
				<div
					class="aside-text"
					in:fade={{ duration: 110, delay: 60, easing: cubicOut }}
					out:fade={{ duration: 110, delay: 60, easing: cubicOut }}
					onintroend={() => (sliding = false)}
				>
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
				</div>
			{/key}
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
		position: relative;
		display: flex;
		flex-direction: column;
		column-gap: 2rem;
		row-gap: 0.5rem;
		display: grid;
		grid-template-columns: min-content 1fr;
		grid-template-rows: repeat(9, 1.5rem);
	}
	#work-list > li {
        display: grid;
        grid-column: 1/3;
        grid-template-columns: subgrid;
        justify-items: baseline;
        align-content: start;
	}
	.scroll-dot {
		position: absolute;
		left: -1rem;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--flexoki-green-400);
		transform: translateY(-50%);
	}
	.work-date {
		padding-right: 0.75rem;
		line-height: normal;
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
		color: var(--flexoki-green-100);
	}
	.work-selected {
		color: var(--flexoki-green-400) !important;
	}
	aside {
		justify-self: end;
		display: grid;
		grid-template-rows: auto 1fr;
		row-gap: 24px;
		overflow: hidden;
		/*padding: 0 4px;
		-webkit-mask-image: linear-gradient(
			to right,
			transparent,
			black 6%,
			black 94%,
			transparent
		);
		mask-image: linear-gradient(
			to right,
			transparent,
			black 0.5%,
			black 99.5%,
			transparent
		);*/
	}
	/* Old and new copies share the same grid cells so they overlap while
	   both are in the DOM during the keyed transition. */
	.aside-img {
		grid-row-start: 1;
		grid-column-start: 1;
		z-index: 3;
	}
	.aside-text {
		grid-row-start: 2;
		grid-column-start: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		-webkit-mask-image: linear-gradient(
			to top,
			transparent,
			black 6%,
			black 94%,
			transparent
		);
		mask-image: linear-gradient(
			to top,
			transparent,
			black 0.5%,
			black 99.5%,
			transparent
		);
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
		border-radius: 3px;
	}
	#article-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	#tag-container {
		display: flex;
		gap: 0.5rem;
		color: var(--flexoki-dark-tx-2);
		font-weight: 300;
		font-size: 0.8rem;
	}
	#tag-container li {
	}
	article {
		line-height: 1.3;
		text-wrap: pretty;
		font-weight: 300;
	}
	h2 {
		font-weight: 500;
	}
	a {
		color: var(--flexoki-dark-tx);
		/*color: var(--flexoki-cyan-300);*/
	}
	:global .img-hover {
		/* text-decoration: underline; */
		cursor: pointer;
		color: var(--flexoki-green-300);
	}
	:global .img-hover:hover {
		color: var(--flexoki-green-100);
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
