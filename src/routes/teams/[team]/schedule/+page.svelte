<script lang="ts">
	import type { IGame, ITeam } from '$lib/api';
	import GameCard from '$lib/components/game-card.svelte';
	const { data }: { data: { schedule: IGame[]; teams: Map<string, ITeam> } } = $props();
	const schedule = data.schedule;
	const teams = data.teams;
	const preseason = $derived(schedule?.filter((game: IGame) => game.seasonType === 'Preseason'));
	const regularSeason = $derived(
		schedule?.filter((game: IGame) => game.seasonType === 'Regular Season')
	);
	const postseason = $derived(schedule?.filter((game: IGame) => game.seasonType === 'Postseason'));
</script>

<h3>Preseason</h3>
<div class="schedule-container">
	{#each preseason as game}
		<div class="card-container">
			<GameCard {game} {teams} weekLabel={game.gameWeek} />
		</div>
	{/each}
</div>
<h3>Regular Season</h3>
<div class="schedule-container">
	{#each regularSeason as game}
		<div class="card-container">
			<GameCard {game} {teams} weekLabel={game.gameWeek} />
		</div>
	{/each}
</div>
{#if postseason.length > 0}
	<h3>Playoffs</h3>
	<div class="schedule-container">
		{#each postseason as game}
			<div class="card-container">
				<GameCard {game} {teams} weekLabel={game.gameWeek} />
			</div>
		{/each}
	</div>
{/if}

<style>
	.schedule-container {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
	}
	.card-container {
		flex-basis: 50%;
	}
</style>
