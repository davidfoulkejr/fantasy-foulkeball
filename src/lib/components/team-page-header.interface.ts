import type { ITeam } from '$lib/api';

export interface ITeamPageHeaderProps {
	teams: ITeam[];
	selectedTeam: ITeam;
}
