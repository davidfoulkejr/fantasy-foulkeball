export async function load({ parent, data }) {
	const parentData = await parent();
	const teams = parentData.teams;
	const teamMap = new Map(teams.map((team) => [team.teamAbv, team]));
	return {
		teams: teamMap,
		schedule: data.schedule
	};
}
