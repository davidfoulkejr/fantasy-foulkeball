<script lang="ts">
	import API from '$lib/api';
	import { page } from '$app/state';
	import GameCard from '$lib/components/game-card.svelte';
	const { data } = $props();
	const teams = $derived(data.teams);
	const schedule = $derived(data.schedule);
	const selectedWeek = $derived(parseInt(page.url.pathname.split('/').pop() || '1'));
	async function getWeeklyScores(week: number) {
		return API.getWeeklyScores(undefined, undefined, week.toString());
	}
	const games = $derived(getWeeklyScores(selectedWeek));
</script>

<h3>Week {selectedWeek}</h3>
<div class="games-list">
	{#await games}
		{#each schedule[selectedWeek - 1] as game}
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
