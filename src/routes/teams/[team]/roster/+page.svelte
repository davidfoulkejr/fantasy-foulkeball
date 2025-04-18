<script lang="ts">
	import API, { type IPlayer } from '$lib/api';
	import { page } from '$app/state';

	const team = $derived(page.params.team);
	function fetchTeamRoster(team: string): Promise<IPlayer[]> {
		return API.getTeamRoster(team).then(roster => roster.sort((a, b) => {
      const aFirst = a.longName.split(' ')[0].toLowerCase();
      const bFirst = b.longName.split(' ')[0].toLowerCase();
      const aLast = a.longName.split(' ').slice(1).join(' ').toLowerCase();
      const bLast = b.longName.split(' ').slice(1).join(' ').toLowerCase();
      if (aLast < bLast) return -1;
      else if (aLast > bLast) return 1;
      else if (aFirst < bFirst) return -1;
      else if (aFirst > bFirst) return 1;
      else return 0;
    }));
	}
	const players = $derived(fetchTeamRoster(team));
</script>

<div class="grid grid-cols-3 gap-4">
	{#await players}
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
	{:catch error}
		<div class="col-span-2 sm:col-span-3">Something went wrong</div>
	{/await}
</div>
