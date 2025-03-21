<script lang="ts">
	import type { IGame, ITeam } from '$lib/api';
	import { gameDateAsDate } from './utils';
	const { game, teams }: { game: IGame; teams: Map<string, ITeam> } = $props();
	const gameDate = $derived(gameDateAsDate(game.gameDate.toString()));
	const gameDateStr = $derived(gameDate
		? gameDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
		: 'undefined');

	const homeTeam = $derived(teams.get(game.home));
	const awayTeam = $derived(teams.get(game.away));

	function getHomeResult(game: IGame) {
		if (!game.homePts || !game.awayPts) return 'T';
		const homeDiff = parseInt(game.homePts) - parseInt(game.awayPts);
		if (homeDiff > 0) return 'W';
		else if (homeDiff < 0) return 'L';
		else return 'T';
	}
</script>

<div class="container">
	<div class="subsection matchup">
		<div class="team {getHomeResult(game) === 'W' ? 'winner' : ''}">
			<img src={homeTeam?.nflComLogo1} alt="{homeTeam?.teamName} logo" />
			<span class="name">{homeTeam?.teamName}</span>
			<span class="score">{game.homePts}</span>
		</div>
		<div class="team {getHomeResult(game) === 'L' ? 'winner' : ''}">
			<img src={awayTeam?.nflComLogo1} alt="{awayTeam?.teamName} logo" />
			<span class="name">{awayTeam?.teamName}</span>
			<span class="score">{game.awayPts}</span>
		</div>
	</div>
	<div class="subsection game-info">
		<div class="status">{game.gameStatus}</div>
		<div class="date">{gameDateStr}</div>
	</div>
</div>

<style>
	.container {
		border: 1px solid #ccc;
		display: flex;
		> .subsection:first-child {
			border-right: 1px solid #ccc;
		}
	}

	.matchup {
		flex: 1;
		align-items: flex-start;
	}

	.subsection {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 10px;
		gap: 10px;
		overflow: hidden;
	}

	.game-info {
		flex: 0 1 0;
		align-items: center;
		flex-basis: 5rem;
	}

	.status {
		font-weight: 500;
	}

	.date {
		text-wrap: nowrap;
	}

	.team {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 10px;
		> img {
			height: 2rem;
			flex-basis: 2rem;
		}
	}

	.winner {
		font-weight: bold;
		> .score {
			&::after {
				content: '';
				width: 0.8rem;
				height: 0.8rem;
				line-height: 0;
				transform: rotate(45deg);
				background-color: black;
				position: absolute;
				right: -1rem;
				top: 0.3rem;
			}
		}
	}

	.name {
		flex-grow: 1;
	}

	.score {
		padding-right: 10px;
		position: relative;
	}
</style>
