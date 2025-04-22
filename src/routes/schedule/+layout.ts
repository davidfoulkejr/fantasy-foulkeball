import API, { sortLeagueScheduleByWeek } from '$lib/api';

export async function load() {
	const schedule = API.getLeagueSchedule().then((res) => sortLeagueScheduleByWeek(res));
	const teams = API.getAllTeams().then((t) => new Map(t.map((team) => [team.teamAbv, team])));

	return {
		schedule,
		teams
	};
}
