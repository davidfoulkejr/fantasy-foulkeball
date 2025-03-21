<script lang="ts">
  import type { IGame } from "$lib/api";
  import { gameDateAsDate } from "./utils";
	import TabSelector from "./tab-selector.svelte";
  
	let { data, children } = $props();
  function getDateRangeForWeek(week: IGame[]) {
    const gameDatesForWeek = week.map(game => parseInt(game.gameDate));
    const minDate = Math.min(...gameDatesForWeek);
    const maxDate = Math.max(...gameDatesForWeek);
    
    return {
      startDate: gameDateAsDate(minDate.toString())?.toLocaleDateString("en-US", { month: "short", day: "numeric" }) || "",
      endDate: gameDateAsDate(maxDate.toString())?.toLocaleDateString("en-US", { month: "short", day: "numeric" }) || ""
    };
  }

	let weekButtons = $derived(data.schedule?.map((week, i) => ({
    label: `Week ${i + 1}`,
    value: i + 1,
    dates: getDateRangeForWeek(week),
  })));
</script>

<TabSelector {weekButtons} />
{@render children()}
