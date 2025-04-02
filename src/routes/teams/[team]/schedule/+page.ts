import API, { sortTeamScheduleByWeek } from '$lib/api';

export async function load({ parent }) {
	const parentData = await parent();
	const teamAbv = parentData.team?.teamAbv?.toUpperCase();
	const teamSchedule = await API.getTeamSchedule(teamAbv);
	const teams = parentData.teams;
	const teamMap = new Map(teams.map((team) => [team.teamAbv, team]));
	return {
		teams: teamMap,
		schedule: sortTeamScheduleByWeek(teamSchedule)
	};
}
