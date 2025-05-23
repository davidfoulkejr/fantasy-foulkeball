import type { ITeam } from '$lib/api';
import type { IConference } from '$lib/helpers';
export type Division = { name: string; teams: ITeam[] };
export type Conference = { name: string; divisions: Division[] };

export interface ITeamsLayoutData {
	teamsPromise: Promise<ITeam[]>;
}
