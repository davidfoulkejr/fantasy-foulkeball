<script lang="ts">
	import type { ITeam } from '$lib/api';
	type Division = { name: string; teams: ITeam[] };
	type Conference = { name: string; divisions: Division[] };
	const { data } = $props();
	const { teams } = data as { teams: ITeam[] };

	function getDivisionDisplayName(team: ITeam) {
		return `${team.conferenceAbv} ${team.division}`;
	}
	function getTeamDisplayName(team: ITeam) {
		return `${team.teamCity} ${team.teamName}`;
	}

	let currentConference = teams[0].conference;
	let currentDivision = getDivisionDisplayName(teams[0]);
	let division: Division = { name: currentDivision, teams: [] };
	const conferences: Conference[] = [{ name: currentConference, divisions: [division] }];

	for (let i = 0; i < teams.length; i++) {
		const team = teams[i];
		if (team.conference !== currentConference) {
			conferences.push({ name: team.conference, divisions: [] });
			currentConference = team.conference;
		}
		const divisionName = getDivisionDisplayName(team);
		if (divisionName !== currentDivision) {
			division = { name: getDivisionDisplayName(team), teams: [] };
			currentDivision = divisionName;
			conferences[conferences.length - 1].divisions.push(division);
		}
		division.teams.push(team);
	}
</script>

<div class="teams-container">
	{#each conferences as conference}
		<div class="conference">
			<h2>{conference.name}</h2>
			{#each conference.divisions as division}
				<div class="division">
					<h4>{division.name}</h4>
					<ul class="teams-list">
						{#each division.teams as team}
							<li class="team-list-item">
								<img src={team.nflComLogo1} alt="{team.teamName} logo" />
								<div class="team-info">
									<span>{getTeamDisplayName(team)}</span>
									<ul class="team-links">
										<li><a href="/teams/{team.teamAbv}/schedule">Schedule</a></li>
										<li><a href="/teams/{team.teamAbv}/roster">Roster</a></li>
										<li><a href="/teams/{team.teamAbv}/depthchart">Depth Chart</a></li>
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
		> img {
			height: 100%;
			flex-basis: 3rem;
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
