import type { ITeam } from '$lib/api/schema.interface.js';
import type { ITeamLayoutData } from './layout.interface.js';

export const load = async ({ parent, params }) => {
	const parentData = await parent();
	const teams: ITeam[] = parentData.teams;
	const team: string = params.team;
	const teamData = teams.find((t) => t.teamAbv.toLowerCase() === team.toLowerCase());
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
			if (t.teamAbv === team) {
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
		leagueRank,
		conferenceRank,
		divisionRank
	} as ITeamLayoutData;
};
