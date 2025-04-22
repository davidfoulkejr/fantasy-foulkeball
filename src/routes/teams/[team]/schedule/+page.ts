import API, { sortTeamScheduleByWeek } from '$lib/api';

export async function load({ parent }) {
	const parentData = await parent();
	const teams = parentData.teams;
	const teamMap = new Map(teams.map((team) => [team.teamAbv, team]));

	const teamAbv = parentData.team?.teamAbv?.toUpperCase();
	const teamSchedule = API.getTeamSchedule(teamAbv);
	return {
		teams: teamMap,
		schedule: teamSchedule.then((schedule) => sortTeamScheduleByWeek(schedule))
	};
}
