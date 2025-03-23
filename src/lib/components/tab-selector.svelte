<script lang="ts">
	import type { ITabSelectorProps } from './tab-selector.interface';

	const { tabs, scrollButtons }: ITabSelectorProps = $props();

	// function onPrevButtonClicked() {
	// 	const currentTabIndex = tabs.findIndex((tab) => tab.isActive);
	// 	if (currentTabIndex >= 1) {
	// 		const nextTab = tabs[currentTabIndex - 1];
	// 		if (nextTab) {
	// 			window.location.href = nextTab.href;
	// 		}
	// 	}
	// }

	// function onNextButtonClicked() {
	// 	const currentTabIndex = tabs.findIndex((tab) => tab.isActive);
	// 	if (currentTabIndex >= 0 && currentTabIndex < tabs.length - 1) {
	// 		const nextTab = tabs[currentTabIndex + 1];
	// 		if (nextTab) {
	// 			window.location.href = nextTab.href;
	// 		}
	// 	}
	// }

	const activeTabIndex = $derived(tabs.findIndex((tab) => tab.isActive));
	const isPrevButtonDisabled = $derived(activeTabIndex <= 0);
	const isNextButtonDisabled = $derived(activeTabIndex >= tabs.length - 1);
	const nextHref = $derived(tabs[activeTabIndex + 1]?.href || '');
	const prevHref = $derived(tabs[activeTabIndex - 1]?.href || '');
</script>

<div class="tab-selector">
	{#if scrollButtons}
		<a class="tab-selector__prev {isPrevButtonDisabled && 'disabled'}" href={prevHref}>{'<'}</a>
	{/if}
	<ul class="tab-list">
		{#each tabs as tab, index}
			<li class="tab-item">
				<a class="tab {tab.isActive ? 'active' : ''}" href={tab.href}
					><span class='tab-label'>{tab.label}</span>
					{#if tab.sublabel}
						<span class='tab-sublabel'>{tab.sublabel}</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
	{#if scrollButtons}
		<a class="tab-selector__next {isNextButtonDisabled && 'disabled'}" href={nextHref}>{'>'}</a>
	{/if}
</div>

<style>
	.tab-selector {
		display: flex;
		flex-direction: row nowrap;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
	}

	.tab-selector__prev,
	.tab-selector__next {
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

		a {
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
		&.disabled {
			visibility: hidden;
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
		> .tab-label {
			font-weight: bold;
		}
		> .tab-sublabel {
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
