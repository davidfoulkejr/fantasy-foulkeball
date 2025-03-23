<script lang="ts">
	import NoImage from '$lib/assets/no-image.jpg';
  import type { INewsLink } from './page.server.interface';	const { data }: {data: {news: INewsLink[]}} = $props();
	const news: { link: string; title: string; image?: string; playerID?: string }[] = data.news;
</script>

<h2>News</h2>
<ul class="news-list">
	{#each news as { link, title, image }}
		<li class="news-item">
			<a class="news-item-link" href={link} target="_blank" rel="noopener noreferrer">
				<div class='image-container'>
					{#if image}
						<img class="image-link" src={image} alt={title} />
					{:else}
						<img
							class="image-link"
							src={NoImage}
							alt="Placeholder since no preview was found for this link."
						/>
					{/if}
				</div>
				<h4>{title}</h4></a
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
		border: 1px solid #555;
		box-sizing: border-box;
		flex-basis: calc(50% - 20px);
	}
	.news-item-link {
    padding: 10px;
    height: 100%;
		display: flex;
		flex-direction: column;
    gap: 10px;
		text-decoration: none;
		color: inherit;
	}
  .image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
  }
	.image-link {
		height: 100%;
    width: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
	}
   h4 {
    margin: 0;
   }
</style>
