<!-- A blog "post" whose content is a live component rather than text.
     Renders a bordered block with a title/date header and the component
     centered in the body. -->
<script>
  let { title = undefined, date = undefined, children } = $props();
</script>

<article class="post">
  {#if title || date}
    <header>
      {#if title}
        <h2>{title}</h2>
      {/if}
      {#if date}
        <time>{date}</time>
      {/if}
    </header>
  {/if}
  <div class="body">
    {@render children()}
  </div>
</article>

<style>
  .post {
    border: 1px solid var(--flexoki-dark-ui-2);
    border-radius: 4px;
    background-color: var(--flexoki-dark-bg-2);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--flexoki-dark-ui);
  }
  h2 {
    font-size: 1rem;
  }
  time {
    color: var(--flexoki-dark-tx-2);
    font-size: 0.85rem;
    /* Stays right-aligned even when there's no title. */
    margin-left: auto;
  }
  .body {
    display: grid;
    place-items: center;
    padding: 3rem 1rem;
    margin: 0.3rem;
    background: var(--flexoki-dark-bg);
    border: 1px solid var(--flexoki-dark-ui-2);
    border-radius: 4px;
    /* The graphics fan out in 3D on hover; leave them unclipped. */
    overflow: visible;
  }
</style>
