<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();

	let input: HTMLElement;
	let file: File | undefined = $state(undefined);
</script>

<div class="container">
	<h1>Upload</h1>

	<form class="container" enctype="multipart/form-data" use:enhance action="?/upload" method="POST">
		<button
			type="button"
			class="filePicker"
			onclick={() => {
				input.click();
			}}
		>
			{file?.name ?? 'Click to upload a file...'}
		</button>
		{#if file}
			<button type="submit">Submit</button>
		{/if}
		{#if form?.error}
			<p>{form.error}</p>
		{/if}

		<input
			class="input"
			type="file"
			name="file"
			bind:this={input}
			accept=".jpg, .png, .jpeg, .gif, .bmp, .dib"
			onchange={(e: Event) => {
				const target = e.target as HTMLInputElement;
				if (!target || !target.files) {
					return;
				}

				file = target.files[0];
			}}
		/>
	</form>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}
	.filePicker {
		all: unset;
		padding: 1rem;
		border: 2px dashed var(--secondary);

		&:hover {
			cursor: pointer;
		}
	}
	.input {
		display: none;
	}
</style>
