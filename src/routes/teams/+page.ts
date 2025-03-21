import API from '$lib/api';

export async function load() {
	const teamsByAbv = await API.getAllTeams();
	const teamsByDivision = teamsByAbv.sort(
		(a, b) =>
			a.conferenceAbv.localeCompare(b.conferenceAbv) ||
			a.division.localeCompare(b.division) ||
			a.teamCity.localeCompare(b.teamCity)
	);
	return {
		teams: teamsByDivision
	};
}
