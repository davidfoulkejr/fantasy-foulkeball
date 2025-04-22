<script lang="ts">
	import type IPlayer from '$lib/api';

	const { data } = $props();
	const roster: Promise<IPlayer[]> = data.roster;
</script>

<div class="grid grid-cols-3 gap-4">
	{#await roster}
		<div class="col-span-2 sm:col-span-3">Loading...</div>
	{:then players}
		{#each players as player}
			<div class="flex flex-col items-center border-2 border-gray-300 rounded-lg shadow-sm">
				<img src={player.espnHeadshot} alt={player.longName} class="size-full" />
				<div class="p-2 flex flex-col gap-1 bg-gray-100 w-full items-center">
					<strong>{player.longName}</strong>
					<span>{player.pos}</span>
				</div>
			</div>
		{/each}
	{/await}
</div>
