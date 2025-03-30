<script lang="ts">
	import type { PageProps } from './$types';
  let { data }: PageProps = $props()
</script>

<div>{data.title}</div>
<div>{data.content}</div>
