<script lang="ts">
	import { page } from '$app/state';
	import type { IGame } from '$lib/api';
	import { gameDateAsDate } from '$lib/helpers/utils';
	import TabSelector from '$lib/components/tab-selector.svelte';
	import type { ITab } from '$lib/components/tab-selector.interface.js';
	import AppContent from '$lib/components/app-content.svelte';
	import type { IWeek } from '$lib/api/schema.interface.js';

	let { data, children } = $props();
	function getDateRangeForWeek(week: IGame[]) {
		const gameDatesForWeek = week.map((game) => parseInt(game.gameDate));
		const minDate = Math.min(...gameDatesForWeek);
		const maxDate = Math.max(...gameDatesForWeek);

		return {
			startDate:
				gameDateAsDate(minDate.toString())?.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric'
				}) || '',
			endDate:
				gameDateAsDate(maxDate.toString())?.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric'
				}) || ''
		};
	}

	const selectedWeek = $derived(parseInt(page.url.pathname.split('/').pop() || '1'));

	function getTabs(weeks: IWeek[], selectedWeek: number) {
		return weeks.map((week, i) => {
			const dates = getDateRangeForWeek(week.games);
			return {
				href: `/schedule/${i + 1}`,
				label: week.label,
				sublabel: `${dates.startDate} - ${dates.endDate}`,
				isActive: i + 1 === selectedWeek
			};
		});
	}
</script>

<AppContent>
	{#await data.schedule}
		<div>Loading...</div>
	{:then schedule}
		<div class="flex flex-col gap-4">
			<TabSelector tabs={getTabs(schedule, selectedWeek)} scrollButtons={true} />
			{@render children()}
		</div>
	{/await}
</AppContent>
