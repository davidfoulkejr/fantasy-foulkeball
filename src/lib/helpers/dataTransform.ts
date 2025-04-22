import type { ITeam } from '$lib/api/schema.interface';
import type { IConference } from './transforms.interface';

function getDivisionDisplayName(team: ITeam) {
	return `${team.conferenceAbv} ${team.division}`;
}

export const getTeamsByConference = (teams: ITeam[]) => {
	const conferences: IConference[] = [];

	teams.forEach((team) => {
		const conferenceName = team.conference;
		const divisionName = getDivisionDisplayName(team);

		let conference = conferences.find((conf) => conf.name === conferenceName);
		if (!conference) {
			conference = { name: conferenceName, divisions: [] };
			conferences.push(conference);
		}

		let division = conference.divisions.find((div) => div.name === divisionName);
		if (!division) {
			division = { name: divisionName, teams: [] };
			conference.divisions.push(division);
		}

		division.teams.push(team);
	});

	return conferences;
};

export const getTeamRankings = (teams: ITeam[], team: ITeam) => {
	const conference = team.conferenceAbv;
	const division = team.division;
	const sortedTeams = teams.sort(
		(a, b) => parseInt(b.wins) - parseInt(a.wins) || parseInt(b.tie) - parseInt(a.tie)
	);
	let leagueRank = 1;
	let conferenceRank = 1;
	let divisionRank = 1;
	for (const t of sortedTeams) {
		if (t.conferenceAbv === conference) {
			if (t.teamAbv === team.teamAbv) {
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

	return { leagueRank, conferenceRank, divisionRank };
};
