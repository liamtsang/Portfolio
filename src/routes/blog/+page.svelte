<script>
  import ComponentPost from "$lib/ComponentPost.svelte";
  import Micrographic from "$lib/Micrographic.svelte";
  import Micrographic2 from "$lib/Micrographic2.svelte";
  import MicrographicDotmatrix from "$lib/MicrographicDotmatrix.svelte";
  import ScaledFrame from "$lib/ScaledFrame.svelte";
</script>

<section>
  <ComponentPost>
    <div class="graphic portrait">
      <MicrographicDotmatrix />
    </div>
  </ComponentPost>

  <ComponentPost>
    <div class="graphic landscape">
      <Micrographic2 />
    </div>
  </ComponentPost>

  <ComponentPost>
    <div class="graphic portrait">
      <Micrographic />
    </div>
  </ComponentPost>

  <ComponentPost
    title="BLACKMRKT survey"
    date="2025"
  >
    <div class="graphic demo">
      <ScaledFrame
        src="https://blackmrkt-next.liamtsang.workers.dev"
        title="BLACKMRKT survey"
        width={1280}
        height={800}
      />
    </div>
  </ComponentPost>

  <ComponentPost
    title="DAE logo"
    date="2024"
  >
    <div class="graphic demo">
      <iframe class="dae" src="/demos/dae/index.html" title="DAE logo"></iframe>
    </div>
  </ComponentPost>

  <ComponentPost
    title="Aladdin menu"
    date="2024"
  >
    <div class="graphic demo">
      <ScaledFrame
        src="/demos/aladdin-vertical/index.html"
        title="Aladdin scrolling menu"
        width={1440}
        height={900}
        crop={570}
        interactOnClick
      />
    </div>
  </ComponentPost>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 2rem;
  }
  /* The micrographics size to their container's width; their aspect
     ratios differ, so give portrait and landscape blocks widths that
     land at a similar visual height. */
  .graphic.portrait {
    width: 12rem;
    padding: 4rem 0;
  }
  .graphic.landscape {
    width: 18rem;
    padding: 5rem 0;
  }
  /* Embedded demos want the full column width. */
  .graphic.demo {
    width: 100%;
  }
  iframe.dae {
    display: block;
    width: 100%;
    height: 14rem;
    border: 0;
    border-radius: 4px;
    background: #fff;
  }
</style>
