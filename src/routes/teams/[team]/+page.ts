import API from '$lib/api';

export async function load({ params }) {
	const team = params.team;
	const news = API.getNews(team);
	return {
		news
	};
}
