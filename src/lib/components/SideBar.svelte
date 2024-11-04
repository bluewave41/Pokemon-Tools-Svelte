<script>
	import Upload from '../icons/upload.svelte';
</script>

<div class="container">
	<h1>Pokemon</h1>
	<a class="row" href="/upload">
		<Upload />
		Upload
	</a>
</div>

<style>
	.container {
		width: 16rem;
		height: 100vh;
		background-color: var(--primary);
		padding: 1rem;
		box-sizing: border-box;
		color: var(--primary-content);
	}
	.row {
		all: unset;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0 0.5rem;
		padding: 0.25rem;

		&:hover {
			cursor: pointer;
			background-color: var(--primary-light);
		}
	}
</style>
