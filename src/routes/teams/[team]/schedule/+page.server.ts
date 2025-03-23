export async function load({ fetch, params }) {
	const team = params.team;
	if (!team) {
		throw new Error('Team parameter is missing');
	}

	// Fetch the team schedule using the provided team abbreviation
	const baseUrl = import.meta.env.VITE_NFL_API_URL;
	const apiUrl = `https://${baseUrl}/getNFLTeamSchedule?teamAbv=${team}`;
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': import.meta.env.VITE_NFL_API_KEY,
			'x-rapidapi-host': baseUrl
		}
	};
	try {
		const response = await fetch(apiUrl, options);
		const result = await response.json();
		const schedule = result.body.schedule;
		return { schedule };
	} catch (error) {
		console.error(error);
		return { error: 'Failed to fetch schedule' };
	}
}
