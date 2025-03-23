<script lang="ts">
	const { children } = $props();
</script>

<div class="app-content">
	{@render children()}
</div>

<style>
	.app-content {
		width: 100%;
		height: 100%;
		padding: 20px;
		box-sizing: border-box;
	}
</style>
