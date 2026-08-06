<script>
  let { timezone = "America/New_York", label = undefined } = $props();

  let now = $state(new Date());

  $effect(() => {
    const id = setInterval(() => (now = new Date()), 1000);
    return () => clearInterval(id);
  });

  const formatter = $derived(
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }),
  );
  const parts = $derived(
    Object.fromEntries(
      formatter.formatToParts(now).map((p) => [p.type, p.value]),
    ),
  );
  const hours = $derived(Number(parts.hour));
  const minutes = $derived(Number(parts.minute));
  const seconds = $derived(Number(parts.second));
  const zone = $derived(label ?? parts.timeZoneName);

  const CENTER = 120;
  const NUMBER_RADIUS = 74;
  const DIAMOND_RADIUS = 96;

  // Hands pivot on the geometric center. Offset this to swing the V off-axis.
  const pivot = { x: CENTER, y: CENTER };
  const MINUTE_LENGTH = 62;
  const HOUR_LENGTH = 40;
  const SECOND_LENGTH = 72;
  // Counterweight tail past the pivot, opposite the seconds tip.
  const SECOND_TAIL = 16;

  // Timezone tag rides above the pivot, so it follows if the pivot moves.
  const zoneLabel = { x: pivot.x, y: pivot.y - 32 };

  /** @param {number} deg */
  const rad = (deg) => (deg * Math.PI) / 180;

  const numerals = Array.from({ length: 12 }, (_, i) => {
    const n = i + 1;
    const a = rad(n * 30 - 90);
    return {
      n,
      x: CENTER + NUMBER_RADIUS * Math.cos(a),
      y: CENTER + NUMBER_RADIUS * Math.sin(a),
    };
  });

  // 24 markers on an even 15deg step, alternating: a large diamond on each hour
  // (aligned with its numeral) and a small one on each half hour between them.
  const HOUR_SIZE = 7;
  const HALF_SIZE = 5;

  const diamonds = Array.from({ length: 24 }, (_, i) => {
    const a = rad(i * 15 - 90);
    return {
      size: i % 2 === 0 ? HOUR_SIZE : HALF_SIZE,
      cx: CENTER + DIAMOND_RADIUS * Math.cos(a),
      cy: CENTER + DIAMOND_RADIUS * Math.sin(a),
    };
  });

  const secondAngle = $derived(seconds * 6 - 90);
  const minuteAngle = $derived(minutes * 6 + seconds * 0.1 - 90);
  const hourAngle = $derived((hours % 12) * 30 + minutes * 0.5 - 90);

  const minuteHand = $derived({
    x: pivot.x + MINUTE_LENGTH * Math.cos(rad(minuteAngle)),
    y: pivot.y + MINUTE_LENGTH * Math.sin(rad(minuteAngle)),
  });
  const hourHand = $derived({
    x: pivot.x + HOUR_LENGTH * Math.cos(rad(hourAngle)),
    y: pivot.y + HOUR_LENGTH * Math.sin(rad(hourAngle)),
  });
  const secondHand = $derived({
    x: pivot.x + SECOND_LENGTH * Math.cos(rad(secondAngle)),
    y: pivot.y + SECOND_LENGTH * Math.sin(rad(secondAngle)),
  });
  const secondTail = $derived({
    x: pivot.x - SECOND_TAIL * Math.cos(rad(secondAngle)),
    y: pivot.y - SECOND_TAIL * Math.sin(rad(secondAngle)),
  });

  /** @type {Record<string, string>} */
  const ZONE_NAMES = {
    EST: "Eastern Standard Time",
    EDT: "Eastern Daylight Time",
    CST: "Central Standard Time",
    CDT: "Central Daylight Time",
    MST: "Mountain Standard Time",
    MDT: "Mountain Daylight Time",
    PST: "Pacific Standard Time",
    PDT: "Pacific Daylight Time",
    UTC: "Coordinated Universal Time",
  };

  const readableTime = $derived(
    `${hours}:${String(minutes).padStart(2, "0")}`,
  );
  const title = $derived(
    `Clock showing ${readableTime} ${ZONE_NAMES[zone] ?? zone}`,
  );
</script>

<div class="iso">
  <div class="plane back"></div>
  <svg
    class="hands"
    viewBox="0 0 240 240"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      class="hand-seconds"
      x1={secondTail.x}
      y1={secondTail.y}
      x2={secondHand.x}
      y2={secondHand.y}
      stroke-linecap="round"
    />
    <line
      class="hand"
      x1={pivot.x}
      y1={pivot.y}
      x2={minuteHand.x}
      y2={minuteHand.y}
      stroke-linecap="round"
    />
    <line
      class="hand"
      x1={pivot.x}
      y1={pivot.y}
      x2={hourHand.x}
      y2={hourHand.y}
      stroke-linecap="round"
    />
    <circle class="hand-cap" cx={pivot.x} cy={pivot.y} r="3" />
  </svg>
  <div class="plane mid"></div>
  <svg
  class="clock"
  viewBox="0 0 240 240"
  width="100%"
  preserveAspectRatio="xMidYMid meet"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>{title}</title>

  {#each numerals as { n, x, y }}
    <text class="numeral" {x} {y} text-anchor="middle" dominant-baseline="central"
      >{n}</text
    >
  {/each}

  <text
    class="zone"
    x={zoneLabel.x}
    y={zoneLabel.y}
    text-anchor="middle"
    dominant-baseline="central">{zone}</text
  >
</svg>
  <svg
    class="diamonds"
    viewBox="0 0 240 240"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {#each diamonds as d}
      <rect
        class="diamond"
        x={d.cx - d.size / 2}
        y={d.cy - d.size / 2}
        width={d.size}
        height={d.size}
        transform="rotate(45, {d.cx}, {d.cy})"
      />
    {/each}
  </svg>
  <div class="plane front"></div>
</div>

<style>
  .iso {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    /* Single ink color for the whole face. Override --clock-ink from a parent
       to sit the face on a dark background. */
    --ink: var(--clock-ink, #14142b);
    /* Depth between each plane and the clock face, as a whole cube. */
    --depth: 104px;
    /* No perspective on purpose: orthographic projection = true isometric. */
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }

  .iso:hover {
      transform: rotatex(33deg) rotatey(45deg);
  }

  .iso:hover > .plane{
    border-color: var(--flexoki-base-500);
  }

  .plane {
    position: absolute;
    inset: 4%;
    border: 1.5px dashed;
    border-color: transparent;
    transition: border-color 0.5s;
  }

  .plane.back {
    transform: translateZ(calc(var(--depth) * -1));
  }

  .plane.front {
    transform: translateZ(var(--depth));
  }

  .plane.mid{
    transform: translateZ(0);
  }

  .clock {
    display: block;
    transform: translateZ(0);
  }

  /* Hands live in their own svg so the 3D offset applies — transforms inside
     an svg are flattened, so translateZ on the lines themselves does nothing. */
  .hands {
    position: absolute;
    inset: 0;
    transform: translateZ(calc(var(--depth) * -1));
  }

  .diamonds {
    position: absolute;
    inset: 0;
    transform: translateZ(var(--depth));
  }

  .diamond {
    fill: var(--ink);
    stroke: none;
  }

  .numeral {
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    fill: var(--ink);
  }

  .zone {
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    fill: var(--ink);
    stroke: var(--flexoki-dark-bg);
    stroke-width: 0.1;
    z-index: 500;
  }

  .hand {
    stroke: var(--ink);
    stroke-width: 1.5;
    stroke-linecap: round;
    fill: none;
  }

  .hand-cap {
    fill: var(--flexoki-red-500);
    stroke: none;
  }

  .hand-seconds {
    stroke: var(--flexoki-red-500);
    stroke-width: 1;
    fill: none;
    transition: translate 2s linear ;
  }
</style>
