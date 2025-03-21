import API from '$lib/api';

export async function load() {
	const res = await API.getLeagueSchedule();
	const teams = await API.getAllTeams();
	const teamMap = new Map(teams.map((team) => [team.teamAbv, team]));
	return {
		schedule: res,
		teams: teamMap
	};
}
