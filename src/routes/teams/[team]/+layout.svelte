<script lang="ts">
	import { page } from '$app/state';
	import TabSelector from '$lib/components/tab-selector.svelte';
	import type { ITeamLayoutData } from './layout.interface.js';

	const { data, children } = $props();
	const { team, divisionRank }: ITeamLayoutData = data;

	const lastUrlSegment = $derived(page.url.pathname.split('/').pop());
</script>

<div class="page">
	<div class="team-info">
		<img src={team.nflComLogo1} alt="{team.teamName} logo" />
		<div class="team-details">
			<h2>{team.teamName}</h2>
			<h3>{team.teamCity}</h3>
		</div>
		<div class="team-rankings">
			<h4>{`${team.wins} - ${team.loss}${team.tie > '0' ? ` - ${team.tie}` : ''}`}</h4>
			<h4>#{divisionRank} in {team.conferenceAbv} {team.division}</h4>
		</div>
	</div>

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
</div>

{@render children()}

<style>
	.team-info {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 20px;
		border-bottom: 2px solid #ccc;
		padding: 10px 0;
		margin-bottom: 20px;
		width: 100%;
		> img {
			height: 8rem;
		}
	}
	.team-details {
		flex-grow: 1;
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		gap: 5px;
	}

  .tab-container {
    width: 100%;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    gap: 20px;
  }

	h2,h3,h4 {
			margin: 0;
			padding: 0;
		}
</style>
