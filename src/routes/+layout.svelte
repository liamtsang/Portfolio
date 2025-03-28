<script>
	let { children } = $props();
</script>

<main>
	<section id="info">
		<img src="/dragon_logo.png">
		<h1>Liam Tsang</h1>
		<h2>Design Engineer</h2>
		<h3 id="email"><a>liamtsang@gmail.com</a></h3>
		<h3 id="site"><a>liamtsang.com</a></h3>
	</section>
	<section id="canvas">
		<div id="canvas-interior">
			<div class="canvas-tag">WORK</div>
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
		max-height: 100vh;
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
	#info {
		width: calc(100% - 4rem);
	  background-color: #f5f5f5;
	  padding-left: 1.5rem;
	  max-height: 100vh
	}
	#canvas {
		height: 100%;
		background-color: #F3F3F3;
		padding-top: 2rem;
		padding-right: 1.5rem;
	}
	#canvas-interior{
		height: 100%;
    outline: 1px solid var(--dark-grey);    
    border: 1px solid var(--white);
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
	img {
		width: 100%;
		object-fit: contain;
		border-radius: 6px;
	}
	h1 {
    font-weight: 500;
    font-size: calc(1.0rem * 1.5);
    line-height: normal;
    margin-top: 1rem;
    margin-bottom: 0;
	}
	h2 {
    font-weight: 400;
    font-size: calc(.75rem * 1.5);
    line-height: 0.5rem;
    margin-top: 0.25rem;
    margin-bottom: 0;
	}
	h3 {
    font-weight: 400;
    font-size: calc(0.75rem * 1.5);
    margin-bottom: 0;
    margin-top: 0;
	}
	#email{
		margin-top: 1rem;
	}
	
</style>
