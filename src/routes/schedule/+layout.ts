import API from '$lib/api';
import type { IGame } from '$lib/api/schema.interface';
import type { IWeek } from './layout.interface';
import { nflSeasonOrder } from './constants';

export async function load() {
	const res = await API.getLeagueSchedule();
	const teams = await API.getAllTeams();
	const teamMap = new Map(teams.map((team) => [team.teamAbv, team]));

	function transformScheduleByWeek(schedule: IGame[]): IWeek[] {
		const weeksMap = new Map<string, IGame[]>();

		schedule.forEach((game) => {
			if (!weeksMap.has(game.gameWeek)) {
				weeksMap.set(game.gameWeek, []);
			}
			weeksMap.get(game.gameWeek)?.push(game);
		});

		const weeksArray: IWeek[] = [];
		nflSeasonOrder.forEach((week) => {
			if (weeksMap.has(week)) {
				weeksArray.push({ label: week, games: weeksMap.get(week) as IGame[] });
			}
		});

		return weeksArray;
	}

	return {
		schedule: transformScheduleByWeek(res),
		teams: teamMap
	};
}
