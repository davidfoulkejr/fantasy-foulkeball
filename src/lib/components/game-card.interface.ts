import type { IGame, ITeam } from '$lib/api';

export interface IGameCardProps {
	game: IGame;
	teams: Map<string, ITeam>;
	weekLabel?: string;
}
