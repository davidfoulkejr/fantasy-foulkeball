import { NflApi } from './nfl-api';
export { GameResult } from './schema.interface';
export type { IPlayer, ITeam, IGame } from './schema.interface';
export default new NflApi(
	import.meta.env.VITE_API_BASE_URL,
	import.meta.env.VITE_USE_MOCK_DATA === 'true'
);
