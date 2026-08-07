<script>
  import "../styles.css";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { fade, fly, slide } from "svelte/transition";
  import { injectAnalytics } from "@vercel/analytics/sveltekit";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";
  import Clock from "$lib/Clock.svelte";

  injectAnalytics();
  injectSpeedInsights();
  let activatedLink = $state("");
  let { children } = $props();

  function onKeyDown(e) {
    switch (e.key) {
      case "1":
        activatedLink = "1";
        break;
      case "2":
        activatedLink = "2";
        break;
      case "3":
        activatedLink = "3";
        break;
      default:
        break;
    }
  }

  function onKeyUp(e) {
    activatedLink = "";
    switch (e.key) {
      case "1":
        goto("/work");
        break;
      case "2":
        goto("/about");
        break;
      case "3":
        goto("/blog");
        break;
      default:
        break;
    }
  }
</script>

<main>
  <header>
    <a href="/"> Liam Tsang </a>
    <ol>
      <li>
        <a class={activatedLink === "1" ? "activated-link" : ""} href="/work">
          <span class="number-marker">1⃞</span>&nbsp;Work</a
        >
      </li>
      <li>
        <a class={activatedLink === "2" ? "activated-link" : ""} href="/about">
          <span class="number-marker">2⃞</span>&nbsp;About</a
        >
      </li>
      <li>
        <a class={activatedLink === "3" ? "activated-link" : ""} href="/blog">
          <span class="number-marker">3⃞</span>&nbsp;Blog</a
        >
      </li>
    </ol>
  </header>
  <div class="page-container">
    <!-- Key on the route id, not the pathname, so navigating between
         /work and /work/[slug] doesn't remount the page and clobber the
         work list's own transitions. -->
    {#key page.route.id ?? page.url.pathname}
      <div
        class="page"
        in:fade={{ duration: 50 }}
        out:fade={{  duration: 50 }}
      >
        {@render children()}
      </div>
    {/key}
  </div>
  {#if !page.url.pathname.startsWith("/blog")}
    <footer>
      <div class="clock-slot">
        <Clock timezone="America/New_York" />
      </div>
    </footer>
  {/if}
</main>

<svelte:window
  on:keydown|preventDefault={onKeyDown}
  on:keyup|preventDefault={onKeyUp}
/>

<style>
  main {
    max-width: 54em;
    width: 100%;
    padding-top: 1rem;
    padding-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-height: 70vh;
  }
  @media (min-width: 0px) {
    main {
      padding: 1rem 1rem;
    }
    .number-marker {
      display: none;
    }
  }
  @media (min-width: 576px) {
    .number-marker {
      display: inline;
      padding-right: 0.25ch;
    }
  }
  .page-container {
    display: grid;
    flex: 1;
    /*overflow: hidden;*/
  }
  .page {
    grid-row-start: 1;
    grid-column-start: 1;
    min-width: 0;
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
  a {
    color: var(--flexoki-dark-tx);
    text-decoration: none;
  }
  a:hover {
    color: var(--flexoki-cyan-300);
  }
  .activated-link {
    color: var(--flexoki-cyan-300);
  }
  footer {
    width: 100%;
    margin-top: auto;
    padding-top: 3rem;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  @media (min-width: 576px) {
    footer {
      /* Pinned to the spot the flowed footer lands on at main's 70vh
         min-height (bottom edge at 70vh + 1rem top padding), so it sits
         in the same place on every page regardless of content height.
         Width matches main's content column (54em minus 1rem side
         padding each) since absolute width no longer tracks main. */
      position: absolute;
      /* Clamped so the clock's top edge never rises into the page text on
         short viewports: its bottom edge stays at least 34rem from the
         document top (~20rem of header + content, ~13rem of clock +
         footer padding, plus breathing room). When the viewport is too
         short for that, the footer drops below the fold and the page
         scrolls instead of overlapping. */
      bottom: min(calc(30vh - 1rem), calc(100vh - 38rem));
      width: fit-content;
      padding-top: 0;
    }
  }
  .clock-slot {
    width: 12rem;
    /* The face ships near-black; recolor the ink for the dark background. */
    --clock-ink: var(--flexoki-dark-tx);
  }
</style>
