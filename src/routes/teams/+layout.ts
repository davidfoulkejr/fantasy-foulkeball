import API from '$lib/api';
import type { ITeam } from '$lib/api/schema.interface';
import { getTeamsByConference } from '$lib/helpers';
import type { ITeamsLayoutData } from './layout.interface';

export async function load() {
	async function getAllTeams(): Promise<ITeam[]> {
		// Sort teams by conference, division, and team city
		return API.getAllTeams().then((teams) =>
			teams.sort(
				(a, b) =>
					a.conferenceAbv.localeCompare(b.conferenceAbv) ||
					a.division.localeCompare(b.division) ||
					a.teamCity.localeCompare(b.teamCity)
			)
		);
	}

	const teams = getAllTeams();

	return {
		teamsPromise: teams
	} as ITeamsLayoutData;
}
