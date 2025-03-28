<script>
	import Info from "$lib/info.svelte";
	let { children } = $props();
</script>

<main>
	<Info/>
	<section id="canvas">
		<div id="canvas-interior">
			<div class="canvas-tag selected-tag">WORK</div>
			{@render children()}
		</div>
	</section>
</main>

<style>
	:global(body) {
	  font-family: "STIX Two Text", serif;
	  font-optical-sizing: auto;
	  font-style: normal;
	  letter-spacing: -0.3rem;
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
    color: #4B4B4B;

    padding-top: 2rem;
    padding-bottom: 2rem;

    margin: 0;
	}
	#canvas {
		height: 100%;
		padding-top: 2rem;
		padding-right: 2rem;
	}
	#canvas-interior{
		height: 100%;
    outline: 1px solid var(--dark-grey);    
    border: 1px solid var(--white);
		background-color: #F3F3F3;
		border-radius: 0px .2rem .2rem .2rem;
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
    
    transform: translate(-1px, calc(-100% - 2px));
  }
  .selected-tag {
  	border-bottom: 1px solid #F3F3F3 !important;
  	outline-bottom: 1px solid #F3F3F3 !important;
	}	
</style>
