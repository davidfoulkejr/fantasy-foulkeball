import { GameResult, type IGame, type IWeek } from './schema.interface';

export const nflSeasonOrder = [
	'Hall of Fame Weekend',
	'Preseason Week 1',
	'Preseason Week 2',
	'Preseason Week 3',
	'Week 1',
	'Week 2',
	'Week 3',
	'Week 4',
	'Week 5',
	'Week 6',
	'Week 7',
	'Week 8',
	'Week 9',
	'Week 10',
	'Week 11',
	'Week 12',
	'Week 13',
	'Week 14',
	'Week 15',
	'Week 16',
	'Week 17',
	'Week 18',
	'Wild Card',
	'Divisional Round',
	'Conference Championship',
	'Super Bowl'
];

/**
 * Sorts the team schedule based on the NFL season order.
 * @param games - An array of all games in the team schedule (assumed to contain a single season)
 * @returns An array of games sorted by week
 * @description This function takes a team schedule and sorts the games according to the NFL season order. It uses a Map to store the games by their game week, and then constructs a sorted array based on the predefined NFL season order.
 */
export function sortTeamScheduleByWeek(games: IGame[]): IGame[] {
	const sortedGames: IGame[] = [];
	const weeksMap = new Map<string, IGame>(games.map((game) => [game.gameWeek, game]));
	nflSeasonOrder.forEach((week) => {
		if (weeksMap.has(week)) {
			sortedGames.push(weeksMap.get(week) as IGame);
		}
	});
	return sortedGames;
}

/**
 * Sorts the league schedule into IWeek sorted by the NFL season order.
 * @param schedule - A flat array of all games in the league schedule
 * @returns An array of weeks, each containing an array of games
 * @description This function takes a schedule of games and transforms it into an array of weeks, each containing an array of games. The weeks are sorted according to the NFL season order.
 */
export function sortLeagueScheduleByWeek(schedule: IGame[]): IWeek[] {
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

export const getRandomScore = (game: IGame): IGame => {
	const randomAwayScore = Math.floor(Math.random() * 45);
	const randomHomeScore = Math.floor(Math.random() * 45);
	return {
		...game,
		homePts: randomHomeScore.toString(),
		awayPts: randomAwayScore.toString(),
		homeResult:
			randomHomeScore === randomAwayScore
				? GameResult.Tie
				: randomHomeScore > randomAwayScore
					? GameResult.Win
					: GameResult.Loss,
		awayResult:
			randomHomeScore === randomAwayScore
				? GameResult.Tie
				: randomHomeScore > randomAwayScore
					? GameResult.Loss
					: GameResult.Win
	};
};
