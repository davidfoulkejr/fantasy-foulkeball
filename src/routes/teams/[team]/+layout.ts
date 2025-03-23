import type { ITeam } from '$lib/api/schema.interface.js';
import type { ITeamLayoutData } from './layout.interface.js';
import { TeamColors } from '$lib/api/mocks';

export const load = async ({ parent, params }) => {
	const parentData = await parent();
	const teams: ITeam[] = parentData.teams;
	const team: string = params.team.toUpperCase();
	const teamData = teams.find((t) => t.teamAbv === team);
	const teamColors: string[] | undefined = TeamColors.find(
		(t) => t.name === `${teamData?.teamCity} ${teamData?.teamName}`
	)?.colors?.hex?.map((color) => `#${color}`);
	if (!teamData) {
		throw new Error(`Team ${team} not found`);
	}

	const conference = teamData.conferenceAbv;
	const division = teamData.division;
	const sortedTeams = teams.sort(
		(a, b) => parseInt(a.wins) - parseInt(b.wins) || parseInt(a.tie) - parseInt(b.tie)
	);
	let leagueRank = 1;
	let conferenceRank = 1;
	let divisionRank = 1;
	for (const t of sortedTeams) {
		if (t.conferenceAbv === conference) {
			if (t.teamAbv === teamData.teamAbv) {
				break;
			}
			if (t.conferenceAbv === conference) {
				conferenceRank++;
				if (t.division === division) {
					divisionRank++;
				}
			}
			leagueRank++;
		}
	}

	return {
		team: teamData,
		teamColors,
		leagueRank,
		conferenceRank,
		divisionRank
	} as ITeamLayoutData;
};
