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

<svg
  class="clock"
  viewBox="0 0 240 240"
  width="100%"
  preserveAspectRatio="xMidYMid meet"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
>
  <title>{title}</title>

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
  <line
    class="hand-seconds"
    x1={pivot.x}
    y1={pivot.y}
    x2={secondHand.x}
    y2={secondHand.y}
    stroke-linecap="round"
  />
</svg>

<style>
  .clock {
    display: block;
    /* Single ink color for the whole face. Override --clock-ink from a parent
       to sit the face on a dark background. */
    --ink: var(--clock-ink, #14142b);
    pointer-events: none;
  }

  .diamond {
    fill: var(--ink);
    stroke: none;
  }

  .numeral {
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 11px;
    font-weight: 400;
    fill: var(--ink);
  }

  .zone {
    font-family: -apple-system, "Segoe UI", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    fill: none;
    stroke: var(--ink);
    stroke-width: 0.5;
  }

  .hand {
    stroke: var(--ink);
    stroke-width: 1.5;
    fill: none;
  }

  .hand-seconds {
    stroke: var(--flexoki-red-500);
    stroke-width: 1;
    fill: none;
    transition: translate 2s linear ;
  }
</style>
