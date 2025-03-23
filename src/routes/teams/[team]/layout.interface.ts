import type { ITeam } from '$lib/api';

export interface ITeamLayoutData {
	team: ITeam;
	leagueRank: number;
	conferenceRank: number;
	divisionRank: number;
}
