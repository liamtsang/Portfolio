<script>
	import '../styles.css';
	let { children } = $props();
</script>

<main>
  <header>
    Liam Tsang
    <ol>
      <li>1⃞ &nbsp;Work</li>
      <li>2⃞ &nbsp;About</li>
      <li>3⃞ &nbsp;Blog</li>
    </ol>
  </header>
  {@render children()}
</main>

<style>
  main {
    max-width: 800px;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  ol {
    display: flex;
    gap: 2rem;
  }
</style>
