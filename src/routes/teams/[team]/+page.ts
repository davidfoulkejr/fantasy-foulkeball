import API from '$lib/api';

export async function load({ params }) {
	const team = params.team;
	const news = await API.getNews(team);
	return {
		news
	};
}
