export async function load({ fetch, params }) {
	const team = params.team;
	if (!team) {
		throw new Error('Team parameter is missing');
	}
	const baseUrl = import.meta.env.VITE_NFL_API_URL;
	const url = `https://${baseUrl}/getNFLNews?topNews=true&maxItems=10&teamAbv=${team}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': import.meta.env.VITE_NFL_API_KEY,
			'x-rapidapi-host': baseUrl
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
