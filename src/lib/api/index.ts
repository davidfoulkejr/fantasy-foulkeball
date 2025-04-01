import { NflApi } from './nfl-api';
export { GameResult } from './schema.interface';
export type {
	IStreak,
	Conference,
	Division,
	ITeam,
	IGame,
	IPlayerInjury,
	IPlayer,
	INewsLink
} from './schema.interface';
export default new NflApi(
	import.meta.env.VITE_API_BASE_URL,
	import.meta.env.VITE_USE_MOCK_DATA === 'true'
);
