import API from '$lib/api';
import { getTeamsByConference } from '$lib/helpers';
import type { ITeamsLayoutData } from './layout.interface';

export async function load() {
	// Sort teams by conference, division, and team city
	const teams = API.getAllTeams().then((teams) =>
		teams.sort(
			(a, b) =>
				a.conferenceAbv.localeCompare(b.conferenceAbv) ||
				a.division.localeCompare(b.division) ||
				a.teamCity.localeCompare(b.teamCity)
		)
	);
	const teamsByConference = teams.then((res) => getTeamsByConference(res));

	return {
		teamsPromise: teams,
		teamsByConference
	} as ITeamsLayoutData;
}
