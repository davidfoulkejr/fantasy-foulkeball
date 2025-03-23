import API from '$lib/api';
import type { ITeam } from '$lib/api/schema.interface';
import type { Division, Conference, ITeamsLayoutData } from './layout.interface';

function getDivisionDisplayName(team: ITeam) {
	return `${team.conferenceAbv} ${team.division}`;
}

export async function load() {
	console.log('Loading teams...');
	const teamsByAbv = await API.getAllTeams();

	// Sort teams by conference, division, and team city
	const teams = teamsByAbv.sort(
		(a, b) =>
			a.conferenceAbv.localeCompare(b.conferenceAbv) ||
			a.division.localeCompare(b.division) ||
			a.teamCity.localeCompare(b.teamCity)
	);

	let currentConference = teams[0].conference;
	let currentDivision = getDivisionDisplayName(teams[0]);
	let division: Division = { name: currentDivision, teams: [] };
	const conferences: Conference[] = [{ name: currentConference, divisions: [division] }];

	for (let i = 0; i < teams.length; i++) {
		const team = teams[i];
		if (team.conference !== currentConference) {
			conferences.push({ name: team.conference, divisions: [] });
			currentConference = team.conference;
		}
		const divisionName = getDivisionDisplayName(team);
		if (divisionName !== currentDivision) {
			division = { name: getDivisionDisplayName(team), teams: [] };
			currentDivision = divisionName;
			conferences[conferences.length - 1].divisions.push(division);
		}
		division.teams.push(team);
	}

	return {
		teams,
		teamsByConference: conferences
	} as ITeamsLayoutData;
}
