<script>
	import Info from "$lib/info.svelte";
	let { children } = $props();
	import ProjectCard from "$lib/project-card.svelte";

	let projects = $state([
		{
			id: "card1",
			project: "lloydsteven",
			initialAngle: "-3.62deg",
			zIndex: 0,
		},
		{ id: "card2", project: "feel", initialAngle: "0deg", zIndex: 1 },
		{ id: "card3", project: "topimage", initialAngle: "0deg", zIndex: 2 },
	]);

	// Some sort of effect / state issue where it fires multiple times
	const moveCardToTop = (id) => {
		// console.log("Moving ", id)
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === id) {
				projects[i].zIndex = projects.length;
			} else if (projects[i].id !== id && projects[i].zIndex !== 0) {
				projects[i].zIndex -= 1;
			}
		}
		return;
	};
</script>

<main>
	<Info />
	<section id="canvas">
		<div id="canvas-interior">
			<div id="canvas-tag-container">
				<div class="canvas-tag selected-tag"><a href="/">WORK</a></div>
				<div class="canvas-tag"><a href="/about">ABOUT</a></div>
			</div>
			{#each projects as project, index}
				<ProjectCard
					id={project.id}
					project={project.project}
					zIndex={project.zIndex}
					{moveCardToTop}
					--zIndex={project.zIndex}
					--initialAngle={project.initialAngle}
				/>
			{/each}
			<section id="project-info">
				{@render children()}
			</section>
		</div>
	</section>
</main>

<style>
	:global(body) {
		font-family: "STIX Two Text", serif;
		font-optical-sizing: auto;
		font-style: normal;
		background-color: #f5f5f5;

		padding: 0;
		margin: 0;
	}
	main {
		display: grid;
		grid-template-columns: 16rem calc(100vw - 16rem);
		max-width: 100vw;
		min-height: calc(100vh - 6rem);

		font-family: "STIX Two Text", serif;
		font-optical-sizing: auto;
		font-style: normal;
		letter-spacing: -0.03rem;
		font-weight: 400;
		color: #4b4b4b;

		padding-top: 2rem;
		padding-bottom: 2rem;

		margin: 0;
	}
	#project-info {
		isolation: isolate;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
	}
	#canvas {
		height: 100%;
		padding-top: 2rem;
		padding-right: 2rem;
	}
	#canvas-interior {
		position: relative;
		height: 100%;
		display: grid;
		place-items: center;
		
		outline: 1px solid var(--dark-grey);
		border: 1px solid var(--white);
		background-color: #f3f3f3;
		border-radius: 0px 0.2rem 0.2rem 0.2rem;
	}
	#canvas-tag-container {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		gap: 0.25rem;
	}
	.canvas-tag {
		position: relative;
		display: flex;
		align-items: center;
		max-width: fit-content;
		min-height: 1.5rem;
		padding: 2px 8px;
		border-radius: 2px 2px 0px 0px;

		outline: 1px solid var(--dark-grey);
		border: 1px solid var(--white);
		background: var(--light-grey);
		color: var(--black);

		font-family: monospace;
		font-optical-sizing: auto;
		font-style: normal;
		font-weight: 400;
		font-size: 1rem;
		user-select: none;

		transform: translate(-1px, calc(-100% - 2px));
	}
	.selected-tag {
		border-bottom: 1px solid #f3f3f3 !important;
	}
</style>
