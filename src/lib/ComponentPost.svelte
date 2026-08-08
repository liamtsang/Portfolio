<!-- A blog "post" whose content is a live component rather than text.
     Renders a bordered block with a title/date header and the component
     centered in the body. -->
<script>
  let {
    title = undefined,
    date = undefined,
    description = undefined,
    children,
  } = $props();
</script>

<article class="post">
  <div class="body">
    {@render children()}
  </div>
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
  {#if description}
    <p class="description">{@html description}</p>
  {/if}
</article>

<style>
  .post {
    border-radius: 7px;
    background-color: var(--flexoki-dark-bg-2);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    padding: 8px 12px 18px 12px;
  }
  h2 {
    font-size: 0.8rem;
  }
  time {
    color: var(--flexoki-dark-tx-2);
    font-size: 0.85rem;
    /* Stays right-aligned even when there's no title. */
    margin-left: auto;
  }
  .description {
    padding: 0.75rem 1rem;
    color: var(--flexoki-dark-tx-2);
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.4;
    text-wrap: pretty;
  }
  .body {
    display: grid;
    /* A definite track so percentage-width children (the iframe embeds)
       don't size the track from their own content. */
    grid-template-columns: 100%;
    place-items: center;
    margin: calc(0.5rem + 1px);
    background: var(--flexoki-dark-bg);
    border-radius: 6px;
    /* The graphics fan out in 3D on hover; leave them unclipped. */
    overflow: visible;
  }
</style>
