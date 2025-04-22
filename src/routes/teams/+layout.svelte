<script lang="ts">
  import type { ITeam } from '$lib/api';
  import type { ITeamsLayoutData } from './layout.interface';
  import AppContent from '$lib/components/app-content.svelte';

  const { data, children } = $props();
  const { teamsPromise } = data as ITeamsLayoutData;
</script>

{#await teamsPromise}
<p>loading...</p>
{:then}
  {@render children()}
{:catch error}
  <p>Error loading teams: {error}</p>
{/await}