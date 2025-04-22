import type { ITeam } from '$lib/api/schema.interface';

export interface IConference {
	name: string;
	divisions: IDivision[];
}

export interface IDivision {
	name: string;
	teams: ITeam[];
}
