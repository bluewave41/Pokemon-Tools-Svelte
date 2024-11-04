<script>
	import SideBar from '$lib/components/SideBar.svelte';

	let { children } = $props();
</script>

<div class="container">
	<div class="leftCol">
		<SideBar />
	</div>
	<div class="rightCol">
		{@render children()}
	</div>
</div>

<style>
	.container {
		display: flex;
		gap: 1rem;
	}
	.leftCol {
		display: flex;
		flex-direction: column;
	}
	.rightCol {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}
</style>
