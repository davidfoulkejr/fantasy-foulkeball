<script lang="ts">
	import API from '$lib/api';
	import type { ITeam, IWeek, IGame } from '$lib/api/schema.interface';
	import { page } from '$app/state';
	import GameCard from '$lib/components/game-card.svelte';
	const { data } = $props();
	const teams: Promise<Map<string, ITeam>> = data.teams;
	const schedule: Promise<IWeek[]> = data.schedule;
	const selectedWeek = $derived(parseInt(page.url.pathname.split('/').pop() || '1'));
	async function getWeeklyScores(week: number) {
		return API.getWeeklyScores('2024', 'reg', week.toString());
	}
	const games = $derived(getWeeklyScores(selectedWeek));
	function mergeScoreWithGame(allGames: IWeek[], gameWithScores: IGame) {
		const gameId = gameWithScores.gameID;
		const gameFromSchedule = allGames[selectedWeek - 1].games.find((g) => g.gameID === gameId);
		if (!gameFromSchedule) return gameWithScores;
		return { ...gameWithScores, ...gameFromSchedule };
	}
</script>

<div class="flex flex-col gap-2">
	<h3>Week {selectedWeek}</h3>
	{#await schedule}
		<div>Loading...</div>
	{:then schedule}
		<div class="games-list">
			{#await games}
				{#each schedule[selectedWeek - 1].games as game}
					<div class="game">
						{#await teams then teams}
							<GameCard {game} {teams} />
						{/await}
					</div>
				{/each}
			{:then games}
				{#each games as game}
					<div class="game">
						{#await teams then teams}
							<GameCard game={mergeScoreWithGame(schedule, game)} {teams} />
						{/await}
					</div>
				{/each}
			{/await}
		</div>
	{/await}
</div>

<style>
	.games-list {
		display: flex;
		flex-flow: row wrap;
	}
	.game {
		flex-basis: 100%;
		@media (min-width: 768px) {
			flex-basis: 50%;
		}
	}
</style>
