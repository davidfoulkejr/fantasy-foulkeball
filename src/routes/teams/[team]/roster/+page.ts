import API from '$lib/api';

export async function load({ params }) {
	const team = params.team;
	const roster = API.getTeamRoster(team).then((players) =>
		players.sort((a, b) => {
			const aFirst = a.longName.split(' ')[0].toLowerCase();
			const bFirst = b.longName.split(' ')[0].toLowerCase();
			const aLast = a.longName.split(' ').slice(1).join(' ').toLowerCase();
			const bLast = b.longName.split(' ').slice(1).join(' ').toLowerCase();
			if (aLast < bLast) return -1;
			else if (aLast > bLast) return 1;
			else if (aFirst < bFirst) return -1;
			else if (aFirst > bFirst) return 1;
			else return 0;
		})
	);

	return {
		roster
	};
}
