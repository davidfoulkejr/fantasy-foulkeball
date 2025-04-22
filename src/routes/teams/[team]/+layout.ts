import type { ITeam } from '$lib/api/schema.interface.js';
import type { ITeamLayoutData } from './layout.interface.js';

export const load = async ({ parent, params }) => {
	const { teamsPromise } = await parent();
	const teams = await teamsPromise;
	const teamAbv: string = params.team.toUpperCase();
	const teamData = teams.find((t: ITeam) => t.teamAbv === teamAbv);

	return {
		teams,
		team: teamData
	} as ITeamLayoutData;
};
