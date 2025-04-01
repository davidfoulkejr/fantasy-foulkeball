import type { IGame } from '$lib/api/schema.interface';

export interface IWeek {
	label: string;
	games: IGame[];
}
