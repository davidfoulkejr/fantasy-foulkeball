<script lang="ts">
	import { getTeamRankings } from '$lib/helpers/dataTransform';
	import { getFontColorFromBackground, getTeamColors } from '$lib/helpers/utils';
	import type { ITeamPageHeaderProps } from './team-page-header.interface';
	const { teams, selectedTeam: team }: ITeamPageHeaderProps = $props();
	const teamColors = $derived(getTeamColors(team));
	const teamPrimaryColor = $derived(teamColors?.[0]);
	const teamInfoTextColor = $derived(teamPrimaryColor ? getFontColorFromBackground(teamPrimaryColor) : null);
  const { divisionRank } = $derived(getTeamRankings(teams, team));	
</script>

<div
	class="banner"
	style="background-color:{teamPrimaryColor || 'inherit'}; color:{teamInfoTextColor || 'inherit'}"
>
	<div class="link-container">
		<a href="/teams" class="back-link">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				fill={teamInfoTextColor}
			>
				<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
			</svg>
			<span>All Teams</span>
		</a>
	</div>
	<div class="team-info">
		<img src={team.nflComLogo1} alt="{team.teamName} logo" />
		<div class="team-details">
			<div class="team-details-bio">
				<h1>{team.teamName}</h1>
				<h3>{team.teamCity}</h3>
			</div>
			<div class="team-details-rankings">
				<h4>{`${team.wins} - ${team.loss}${team.tie > '0' ? ` - ${team.tie}` : ''}`}</h4>
				{#await divisionRank}
					<span></span>
				{:then divisionRank}
					<span>#{divisionRank} in {team.conferenceAbv} {team.division}</span>
				{/await}
			</div>
		</div>
	</div>
</div>


<style>
	.banner {
		padding: 0 20px;
	}

	.link-container {
		display:flex;
		flex-direction:column;
		align-items: flex-start;
		justify-content: flex-end;
		height: 3rem;
	}
	
	.back-link {		padding: 5px;

		display: flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: inherit;
		font-size: 1rem;
		font-weight: bold;
	}

	.team-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		padding: 10px 0;
		width: 100%;
		> img {
			width: 8rem;
		}
	}

	.team-details {
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		flex-grow: 1;
		height: auto;
	}

	.team-details-bio {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		> :nth-child(1) {
			order: 2;
		}
		> :nth-child(2) {
			order: 1;
		}
		> :nth-child(3) {
			order: 3;
		}
	}

	.team-details-rankings {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
	}

	h1,
	h3,
	h4 {
		margin: 0;
		padding: 0;
	}
</style>
