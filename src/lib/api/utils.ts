import { GameResult, type IGame } from './schema.interface';

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
