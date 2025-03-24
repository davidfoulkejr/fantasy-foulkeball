<script lang="ts">
	import { page } from '$app/state';
	import AppContent from '$lib/components/app-content.svelte';
	import TabSelector from '$lib/components/tab-selector.svelte';
	import { getFontColorFromBackground } from '$lib/helpers/utils';
	import type { ITeamLayoutData } from './layout.interface.js';

	const { data, children } = $props();
	const { team, divisionRank, teamColors }: ITeamLayoutData = data;
	const lastUrlSegment = $derived(page.url.pathname.split('/').pop());
	const teamPrimaryColor = $derived(teamColors?.[0]);
	const teamInfoTextColor = $derived(
		teamPrimaryColor ? getFontColorFromBackground(teamPrimaryColor) : null
	);
</script>

<div
	class="banner"
	style="background-color:{teamPrimaryColor || 'inherit'}; color:{teamInfoTextColor || 'inherit'}"
>
	<div>
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
				<span>#{divisionRank} in {team.conferenceAbv} {team.division}</span>
			</div>
		</div>
	</div>
</div>
<AppContent>
	<div class="tab-container">
		<TabSelector
			tabs={[
				{
					href: `/teams/${team.teamAbv}`,
					label: 'Home',
					isActive: lastUrlSegment === team.teamAbv
				},
				{
					href: `/teams/${team.teamAbv}/schedule`,
					label: 'Schedule',
					isActive: lastUrlSegment === 'schedule'
				},
				{
					href: `/teams/${team.teamAbv}/roster`,
					label: 'Roster',
					isActive: lastUrlSegment === 'roster'
				},
				{
					href: `/teams/${team.teamAbv}/depthchart`,
					label: 'Depth Chart',
					isActive: lastUrlSegment === 'depthchart'
				}
			]}
			scrollButtons={false}
		/>
	</div>

	{@render children()}
</AppContent>

<style>
	.banner {
		padding: 0 20px;
	}

	.back-link {
		padding-top: 1rem;
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
			height: 8rem;
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

	.tab-container {
		width: 100%;
		margin-bottom: 20px;
		border-bottom: 1px solid #ccc;
		display: flex;
		gap: 20px;
	}

	h1,
	h3,
	h4 {
		margin: 0;
		padding: 0;
	}
</style>
