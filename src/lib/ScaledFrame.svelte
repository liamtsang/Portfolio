<!-- Embeds a page 1:1 at its native desktop size, scaled down to fit the
     container. The iframe renders at width×height and is transform-scaled,
     so the embedded app sees the viewport it was designed for.
     interactOnClick gates pointer events behind a click for embeds that
     hijack scroll; leaving the frame re-arms the shield. -->
<script lang="ts">
  let {
    src,
    title,
    width = 1280,
    height = 800,
    crop = undefined,
    interactOnClick = false,
  }: {
    src: string;
    title: string;
    width?: number;
    height?: number;
    /* Visible virtual height — the embed keeps its width×height viewport
       but the container clips below this, hiding dead page space. */
    crop?: number;
    interactOnClick?: boolean;
  } = $props();

  let containerWidth = $state(0);
  let active = $state(false);
  const scale = $derived(containerWidth ? containerWidth / width : 0);
</script>

<div
  class="frame"
  bind:clientWidth={containerWidth}
  style:height="{(crop ?? height) * scale}px"
  onmouseleave={() => (active = false)}
  role="presentation"
>
  {#if scale > 0}
    <iframe
      {src}
      {title}
      loading="lazy"
      style:width="{width}px"
      style:height="{height}px"
      style:transform="scale({scale})"
      style:pointer-events={interactOnClick && !active ? "none" : "auto"}
    ></iframe>
    {#if interactOnClick && !active}
      <button class="shield" onclick={() => (active = true)}>
        click to interact
      </button>
    {/if}
  {/if}
</div>

<style>
  .frame {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 4px;
  }
  iframe {
    display: block;
    border: 0;
    transform-origin: top left;
    background: #fff;
  }
  .shield {
    all: unset;
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    color: transparent;
    font-size: 0.8rem;
    transition: all 0.15s ease;
  }
  .shield:hover {
    background: rgba(16, 15, 15, 0.55);
    color: var(--flexoki-dark-tx);
  }
</style>
