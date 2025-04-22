<script lang="ts">
	import { page } from '$app/state';
	import AppContent from '$lib/components/app-content.svelte';
	import TabSelector from '$lib/components/tab-selector.svelte';
	import TeamPageHeader from '$lib/components/team-page-header.svelte';

	const { data, children } = $props();
	const { team, teams } = data;
	const lastUrlSegment = $derived(page.url.pathname.split('/').pop());
</script>

<TeamPageHeader {teams} selectedTeam={team} />
<AppContent>
	<div class="tab-container">
		<TabSelector
			tabs={[
				{
					href: `/teams/${team.teamAbv}`,
					label: 'News',
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
				}
			]}
			scrollButtons={false}
		/>
	</div>

	{@render children()}
</AppContent>

<style>
	.tab-container {
		width: 100%;
		margin-bottom: 20px;
		border-bottom: 1px solid #ccc;
		display: flex;
		gap: 20px;
	}
</style>
