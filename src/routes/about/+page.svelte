<script>
  import { fade, blur } from "svelte/transition";
</script>

<section in:blur out:blur>
  <div in:blur={{ duration: 1000 }} out:fade={{duration: 500}}>
    
  </div>
</section>

<style>
  section {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,255,0.5);
    backdrop-filter: blur(100px);
    pointer-events: auto;
  }
</style>
