<script>
  import "../styles.css";
  import { goto } from "$app/navigation";
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
  {@render children()}
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
</style>
