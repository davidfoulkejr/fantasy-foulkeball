<script lang="ts">
	import type { ITeam } from '$lib/api';
	import AppContent from '$lib/components/app-content.svelte';
	const { data } = $props();
	const { teamsByConference } = data;

	function getTeamDisplayName(team: ITeam) {
		return `${team.teamCity} ${team.teamName}`;
	}
</script>

<AppContent>
	<div class="teams-container">
		{#each teamsByConference as conference}
			<div class="conference">
				<h2>{conference.name}</h2>
				{#each conference.divisions as division}
					<div class="division">
						<h4>{division.name}</h4>
						<ul class="teams-list">
							{#each division.teams as team}
								<li class="team-list-item">
									<a class="team-home-link" href="/teams/{team.teamAbv}"
										><img class="team-logo" src={team.nflComLogo1} alt="{team.teamName} logo" /></a
									>
									<div class="team-info">
										<span>{getTeamDisplayName(team)}</span>
										<ul class="team-links">
											<li><a href="/teams/{team.teamAbv}">News</a></li>
											<li><a href="/teams/{team.teamAbv}/schedule">Schedule</a></li>
											<li><a href="/teams/{team.teamAbv}/roster">Roster</a></li>
										</ul>
									</div>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		{/each}
	</div>
</AppContent>

<style>
	.teams-container {
		display: flex;
		flex-flow: row wrap;
		@media (max-width: 768px) {
			gap: 40px;
		}
	}

	.conference {
		flex-basis: 100%;
		display: flex;
		flex-flow: column nowrap;
		gap: 20px;
		@media (min-width: 768px) {
			flex-basis: 50%;
		}
	}

	.division {
		display: flex;
		flex-flow: column nowrap;
		gap: 1rem;
		width: 100%;
		> :first-child {
			position: relative;
			&::after {
				content: '';
				border-bottom: 1px solid #ddd;
				position: absolute;
				bottom: -0.5rem;
				left: 0;
				right: 2rem;
			}
		}
	}

	.teams-list {
		display: flex;
		flex-flow: column nowrap;
		gap: 10px;
	}

	.team-list-item {
		height: 3rem;
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.team-home-link {
		height: 100%;
		flex-basis: 3rem;
		> img {
			width: 100%;
		}
	}

	.team-info {
		display: flex;
		flex-flow: column nowrap;
		gap: 5px;
		> span {
			font-weight: 500;
		}
	}

	.team-links {
		display: flex;
		gap: 1rem;
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0.8rem;
		> li {
			position: relative;
			&:not(:last-child) {
				::after {
					content: '';
					border-right: 1px solid #ccc;
					position: absolute;
					bottom: 0;
					right: -0.5rem;
					height: 0.8rem;
				}
			}
		}
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	h2,
	h4 {
		margin: 0;
		padding: 0;
		line-height: auto;
	}
</style>
