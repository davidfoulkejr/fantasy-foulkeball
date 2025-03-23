export async function load({ fetch }) {
	const url =
		'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLNews?topNews=true&maxItems=6&teamAbv=WSH';
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': '614af64808msh7c31241ca602ca1p1ecd48jsn6607c57160b5',
			'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
		}
	};
	try {
		const response = await fetch(url, options);
		const result = await response.json();
		const news = [];
		const urlMap: { [key: string]: boolean } = {};
		for (const item of result.body) {
			if (!urlMap[item.link]) {
				news.push(item);
				urlMap[item.link] = true; // Mark this URL as seen
			}
		}
		return { news };
	} catch (error) {
		console.error(error);
		return { error: 'Failed to fetch news' };
	}
}
