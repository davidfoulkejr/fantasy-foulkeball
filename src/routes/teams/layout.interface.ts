import type { ITeam } from '$lib/api';
export type Division = { name: string; teams: ITeam[] };
export type Conference = { name: string; divisions: Division[] };

export interface ITeamsLayoutData {
	teams: ITeam[];
	teamsByConference: Conference[];
}
