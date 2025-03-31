<script>
	import Info from "$lib/info.svelte";
	import ProjectCard from "$lib/project-card.svelte";
	import { globalState } from "$lib/globalstate.svelte";

	let { data, children } = $props();

	const moveCardToTop = (project) => {
		// console.log("Moving ", id)
		for (let i = 0; i < globalState.projects.length; i++) {
			if (globalState.projects[i].project === project) {
				globalState.projects[i].zIndex = globalState.projects.length;
			} else if (globalState.projects[i].project !== project && globalState.projects[i].zIndex !== 0) {
				globalState.projects[i].zIndex -= 1;
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
			<div id="card-container">
				{#each globalState.projects as project, index}
					<ProjectCard
						project={project.project}
						{index}
						zIndex={project.zIndex}
						{moveCardToTop}
						initialAngle={project.initialAngle}
						position={project.position}
						savedPosition={project.savedPosition}
						--zIndex={project.zIndex}
					/>
				{/each}
			</div>
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
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		width: 100%;
		height: 100%;
		pointer-events: none;
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
	#card-container {
		position: relative;
		height: 100%;
		display: grid;
		place-items: center;
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
