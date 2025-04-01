import { MockTeams, MockSchedule, MockRoster, MockWsh, MockGames, MockNews } from './mocks';
import type { ITeam, IGame, IPlayer, INewsLink } from './schema.interface';

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
		) as Promise<ITeam[]>;
		return promise;
	}

	public async getOneTeam(team: string): Promise<ITeam> {
		const promise = (
			this.useMockData ? Promise.resolve(MockWsh) : this.getJson(`teams/${team}`)
		) as Promise<ITeam>;
		return promise;
	}

	public async getTeamRoster(team: string): Promise<IPlayer[]> {
		const promise = (
			this.useMockData ? Promise.resolve(MockRoster) : this.getJson(`teams/${team}/roster`)
		) as Promise<IPlayer[]>;
		return promise;
	}

	public async getTeamSchedule(team: string, season?: string): Promise<IGame[]> {
		const promise = (
			this.useMockData
				? Promise.resolve(MockSchedule)
				: this.getJson(`teams/${team}/schedule`, { season })
		) as Promise<IGame[]>;
		return promise;
	}

	public async getLeagueSchedule(
		season?: string,
		segment?: string,
		week?: string
	): Promise<IGame[]> {
		const promise = (
			this.useMockData
				? Promise.resolve(MockGames)
				: this.getJson('schedule', { season, segment, week })
		) as Promise<IGame[]>;
		return promise;
	}

	public async getWeeklyScores(season?: string, segment?: string, week?: string): Promise<IGame[]> {
		const promise = (
			this.useMockData
				? Promise.resolve(MockGames)
				: this.getJson(`scores/${season}/${segment}/${week}`)
		) as Promise<IGame[]>;
		return promise;
	}

	public async getNews(team?: string): Promise<INewsLink[]> {
		const promise = (
			this.useMockData ? Promise.resolve(MockNews) : this.getJson('news', { team })
		) as Promise<INewsLink[]>;
		return promise;
	}
}
