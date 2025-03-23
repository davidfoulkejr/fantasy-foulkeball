import type { ITeam } from '$lib/api';

export interface ITeamLayoutData {
	team: ITeam;
	teamColors?: string[];
	leagueRank: number;
	conferenceRank: number;
	divisionRank: number;
}
