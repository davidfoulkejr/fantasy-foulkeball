<script lang="ts">
	import { page } from '$app/state';
	import type { IGame } from '$lib/api';
	import { gameDateAsDate } from '$lib/helpers/utils';
	import TabSelector from '$lib/components/tab-selector.svelte';
	import type { ITab } from '$lib/components/tab-selector.interface.js';
	import AppContent from '$lib/components/app-content.svelte';
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

	const tabs: ITab[] = $derived(
		data.schedule?.map((week, i) => {
			const dates = getDateRangeForWeek(week);
			return {
				href: `/schedule/${i + 1}`,
				label: `Week ${i + 1}`,
				sublabel: `${dates.startDate} - ${dates.endDate}`,
				isActive: i + 1 === parseInt(page.url.pathname.split('/').pop() || '1')
			};
		})
	);
</script>

<AppContent>
  
<TabSelector {tabs} scrollButtons={true} />
{@render children()}
</AppContent>