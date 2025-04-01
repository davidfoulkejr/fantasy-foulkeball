<script lang="ts">
	import API from '$lib/api';
	import type { ITeam } from '$lib/api';
	import { page } from '$app/state';
	import GameCard from '$lib/components/game-card.svelte';
	import type { IWeek } from '../layout.interface';
	const { data } = $props();
	const teams: Map<string, ITeam> = data.teams;
	const schedule: IWeek[] = data.schedule;
	const selectedWeek = $derived(parseInt(page.url.pathname.split('/').pop() || '1'));
	async function getWeeklyScores(week: number) {
		return API.getWeeklyScores("2024", "reg", week.toString());
	}
	const games = $derived(getWeeklyScores(selectedWeek));
</script>

<h3>Week {selectedWeek}</h3>
<div class="games-list">
	{#await games}
		{#each schedule[selectedWeek - 1].games as game}
			<div class="game">
				<GameCard {game} {teams} />
			</div>
		{/each}
	{:then games}
		{#each games as game}
			<div class="game">
				<GameCard {game} {teams} />
			</div>
		{/each}
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
