<script lang="ts">
	import { page } from '$app/state';
	const { weekButtons } = $props();
	const selectedWeek = $derived(parseInt(page.url.pathname.split('/').pop() || '1'));
</script>

<div class="week-selector">
	<button
		class="week-selector__prev"
		onclick={() => {}}
		disabled={selectedWeek === 0}>{'<'}</button
	>
	<ul class="tab-list">
		{#each weekButtons as week, index}
			<li class="tab-item">
				<a class="tab {selectedWeek === index + 1 && 'active'}" href={`/schedule/${index + 1}`}
					><span>{week.label}</span><span
						>{`${week.dates?.startDate} - ${week.dates?.endDate}`}</span
					></a
				>
			</li>
		{/each}
	</ul>
	<button
		class="week-selector__next"
		onclick={() => {}}
		disabled={selectedWeek === weekButtons.length - 1}>{'>'}</button
	>
</div>

<style>
	.week-selector {
		display: flex;
		flex-direction: row nowrap;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
	}

	.week-selector__prev,
	.week-selector__next {
		font-size: 2rem;
	}

	.tab-list {
		display: flex;
		list-style: none;
		padding: 0;
		margin: 0;
		flex-grow: 1;
		overflow-x: auto;
	}

	.tab-item {
		flex-grow: 1;
	}

	button,a {
		text-decoration: none;
		color: inherit;
		font: inherit;
		outline: inherit;
		background-color: inherit;
		border: none;
		cursor: pointer;
		&:hover {
			background-color: #ddd;
		}
	}

	.tab {
		text-wrap: nowrap;
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
		position: relative;
		> span:first-child {
			font-weight: bold;
		}
		> span:last-child {
			font-size: 0.8rem;
			color: gray;
		}
		&.active {
			::after {
				position: absolute;
				bottom: 0;
				left: 0;
				content: '';
				display: block;
				width: 100%;
				height: 4px;
				background-color: #000;
			}
		}
	}
</style>
