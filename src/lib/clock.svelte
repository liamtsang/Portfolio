<script>
	import { onMount } from 'svelte';

	let time = $state(new Date());
	let timeString = $derived(convertToEST(time))

	function convertToEST(input) {
  	const timeString = input.toLocaleTimeString('en-us', {timeZone: 'America/New_York'})
    if (timeString.match(/\s*(am|pm)$/i)) {
      // Remove the AM/PM and add EST
      return timeString.replace(/\s*(am|pm)$/i, " EST");
    }
    return timeString; // Return original string if no AM/PM found
  }


	// these automatically update when `time`
	// changes, because of the `$:` prefix
	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div id="clock">
  {timeString}
</div>

<style>
  #clock{
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-100%);
    padding: 8px 0px;
    font-family: monospace;
  }
</style>
