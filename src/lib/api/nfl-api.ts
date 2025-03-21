import { MockTeams, MockSchedule, MockRoster, MockWsh, MockGames } from './mocks';
import type { ITeam, IGame, IPlayer } from './schema.interface';
import { getRandomScore } from './utils';

export class NflApi {
	private baseUrl: string;
	private useMockData: boolean;
	public constructor(baseUrl: string, useMockData: boolean = false) {
		this.baseUrl = baseUrl;
		this.useMockData = useMockData;
	}

	private async send(
		method: string,
		url: string,
		headers: { [key: string]: string } = {},
		body?: unknown
	): Promise<Response> {
		return fetch(url, {
			method,
			headers: {
				...headers
			},
			body: method !== 'GET' ? JSON.stringify(body) : undefined
		});
	}

	private async getJson(url: string, params: { [key: string]: string | undefined } = {}) {
		const requestParams = new URLSearchParams();
		for (const [key, value] of Object.entries(params)) {
			if (value) {
				requestParams.append(key, value);
			}
		}
		let requestUrl = `${this.baseUrl}/${url}`;
		if (requestParams.toString()) {
			requestUrl += `?${requestParams.toString()}`;
		}
		const response = await this.send('GET', requestUrl, {
			'Content-Type': 'application/json'
		});
		return response.json();
	}

	public async getAllTeams(): Promise<ITeam[]> {
		const promise = (
			this.useMockData ? Promise.resolve(MockTeams) : this.getJson('teams')
		) as Promise<{ [key: string]: ITeam }>;
		const res = await promise;
		return Object.entries(res)
			.filter(([key]) => parseInt(key) > 0)
			.map((tuple) => tuple[1]);
	}

	public async getOneTeam(team: string): Promise<ITeam> {
		const promise = (
			this.useMockData ? Promise.resolve(MockWsh) : this.getJson(`teams/${team}`)
		) as Promise<{ [key: string]: ITeam }>;
		const res = await promise;
		return Object.values(res)[0];
	}

	public async getTeamRoster(team: string): Promise<IPlayer[]> {
		const promise = (
			this.useMockData ? Promise.resolve(MockRoster) : this.getJson(`teams/${team}/roster`)
		) as Promise<{ [key: string]: IPlayer }>;
		const res = await promise;
		return Object.values(res);
	}

	public async getTeamSchedule(team: string, season?: string): Promise<IGame[]> {
		const promise = (
			this.useMockData
				? Promise.resolve(MockSchedule)
				: this.getJson(`teams/${team}/schedule`, { season })
		) as Promise<{
			[key: string]: IGame;
		}>;
		const res = await promise;
		return Object.values(res);
	}

	public async getLeagueSchedule(
		season?: string,
		segment?: string,
		week?: string
	): Promise<IGame[][]> {
		const promise = (
			this.useMockData
				? Promise.resolve(MockGames)
				: this.getJson('games', { season, segment, week })
		) as Promise<{
			[weekId: string]: { [gameId: string]: IGame };
		}>;
		const res = await promise;
		const weeks = Object.entries(res)
			.map(([weekId, games]) => ({ weekId, games }))
			.sort((a, b) => parseInt(a.weekId) - parseInt(b.weekId));
		return weeks.map(({ games }) => Object.values(games));
	}

	public async getWeeklyScores(
		season: string = '2024',
		segment: string = 'reg',
		week: string = '1'
	): Promise<IGame[]> {
		const promise = (
			this.useMockData
				? Promise.resolve(MockGames).then((games) => {
						const gamesInWeek: { [key: string]: IGame } = games[week as keyof typeof games];
						const retVal: { [key: string]: IGame } = {};
						for (const gameId in gamesInWeek) {
							const game = gamesInWeek[gameId];
							retVal[gameId] = getRandomScore(game);
						}

						return retVal;
					})
				: this.getJson(`scores/${season}/${segment}/${week}`)
		) as Promise<{ [key: string]: IGame }>;
		const res = await promise;
		return Object.values(res);
	}
}
