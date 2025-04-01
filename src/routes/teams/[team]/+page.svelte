<script lang="ts">
	import NoImage from '$lib/assets/no-image.jpg';
	import type { INewsLink } from '$lib/api';
	const { data } = $props();
	const news: INewsLink[] = data.news;
</script>

<h2>News</h2>
<ul class="news-list">
	{#each news as { link, title, image }}
		<li class="news-item">
			<a class="news-item-link" href={link} target="_blank" rel="noopener noreferrer">
				<div class="image-container">
					{#if image}
						<img src={image} alt={title} />
					{:else}
						<img src={NoImage} alt="Blank placeholder - no preview was found for this link." />
					{/if}
				</div>
				<div class="headline-container">
					<h4 class="headline">{title}</h4>
				</div></a
			>
		</li>
	{/each}
</ul>

<style>
	.news-list {
		display: flex;
		flex-flow: row wrap;
		list-style: none;
		padding: 0;
		margin: 0;
		gap: 20px;
	}
	.news-item {
		border-radius: 5px;
		border: 1px solid #ccc;
		box-sizing: border-box;
		overflow: hidden;
		flex-basis: calc(50% - 20px);
	}
	.news-item-link {
		height: 100%;
		display: flex;
		gap: 10px;
		flex-direction: column;
		text-decoration: none;
		color: inherit;
		background-color: #ccc;
	}
	.image-container {
		background-color: white;
		width: 100%;
		height: 200px;
		overflow: hidden;
		position: relative;
		> img {
			height: 100%;
			width: auto;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			object-fit: cover;
		}
	}

	.headline-container {
		padding: 10px;
		padding-top: 0;
	}

	.headline {
		@supports (-webkit-line-clamp: 2) {
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 2;
		}
	}

	h4 {
		margin: 0;
	}
</style>
