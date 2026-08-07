<script>
  import ComponentPost from "$lib/ComponentPost.svelte";
  import Micrographic from "$lib/Micrographic.svelte";
  import Micrographic2 from "$lib/Micrographic2.svelte";
  import MicrographicDotmatrix from "$lib/MicrographicDotmatrix.svelte";
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
  }
  .graphic.landscape {
    width: 18rem;
  }
</style>
