<script lang="ts">
  import type { ITeamsLayoutData } from './layout.interface';

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