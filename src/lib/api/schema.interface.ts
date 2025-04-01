export const enum GameResult {
	Win = 'W',
	Loss = 'L',
	Tie = 'T'
}

export interface IStreak {
	length: string;
	result: GameResult;
}

export type Conference = 'AFC' | 'NFC';
export type Division = 'North' | 'South' | 'East' | 'West';

export interface ITeam {
	/**
	 * List of bye weeks for the team in the format { season: [weeks] }
	 * Example: { "2023": ["14"] }
	 */
	byeWeeks: { [season: string]: string[] };
	conference: Conference;
	/**
	 * Abbreviation of the conference name (e.g., "AFC" or "NFC")
	 */
	conferenceAbv: string;
	/**
	 * Current streak of the team
	 * Example: { length: "2", result: "W" } for a 2-game winning streak
	 */
	currentStreak: IStreak;
	/**
	 * Division of the team (e.g., "North", "South", "East", "West")
	 */
	division: Division;
	/**
	 * URL for the team's logo on ESPN
	 */
	espnLogo1: string;
	/**
	 * Number of losses in the specified season
	 */
	loss: string;
	/**
	 * URL for the team's logo on NFL.com
	 */
	nflComLogo1: string;
	/**
	 * Number of points allowed in the specified season
	 */
	pa: string;
	/**
	 * Number of points scored in the specified season
	 */
	pf: string;
	/**
	 * Team abbreviation (e.g., "NE" for New England Patriots)
	 */
	teamAbv: string;
	/**
	 * City name of the team (e.g., "New England")
	 */
	teamCity: string;
	/**
	 * ID of the team as used by the API (string representing a number 1-32)
	 */
	teamID: string;
	/**
	 * Name of the team (e.g., "Patriots")
	 */
	teamName: string;
	/**
	 * Number of ties in the specified season
	 */
	tie: string;
	/**
	 * Number of wins in the specified season
	 */
	wins: string;
}

export interface IGame {
	/**
	 * Abbreviation of the away team (e.g., "BAL" for Baltimore Ravens)
	 */
	away: string;
	/**
	 * URL for box score on CBS Sports
	 */
	cbsLink?: string;
	/**
	 * Game ID on ESPN
	 */
	espnID?: string;
	/**
	 * URL for the box score on ESPN
	 */
	espnLink?: string;
	/**
	 * Game date (YYYYMMDD format)
	 * Example: "20240905" for September 5, 2024
	 */
	gameDate: string;
	/**
	 * Game ID as used by the API
	 * Example: "20240905_BAL@KC" for a game between Baltimore Ravens and Kansas City Chiefs on September 5, 2024
	 */
	gameID: string;
	/**
	 * Game status (e.g., "Final")
	 */
	gameStatus: string;
	/**
	 * Game status code (e.g., "2" for "Final" or "Completed")
	 */
	gameStatusCode: string;
	/**
	 * Human-readable time of the game in Eastern Time (ET)
	 * Example: "8:20p"
	 */
	gameTime: string;
	/**
	 * Epoch time of the game (in milliseconds since January 1, 1970)
	 * Example: "1725583200.0" for a game on September 5, 2024 at 8:40 PM ET
	 */
	gameTime_epoch: string;
	/**
	 * Week of the season (e.g., "Week 1")
	 */
	gameWeek: string;
	/**
	 * Abbreviation of the home team (e.g., "KC" for Kansas City Chiefs)
	 */
	home: string;
	/**
	 * Boolean representing whether the game is a neutral site game (true) or not (false)
	 * Example: true for a game played at a neutral location (e.g., London, Mexico City)
	 */
	neutralSite?: string;
	/**
	 * String representing the season in which the game is played (e.g., "2024")
	 */
	season: string;
	/**
	 * String representing the type of season (e.g., "Regular Season")
	 */
	seasonType: string;
	/**
	 * ID of the away team (e.g., "3" for Baltimore Ravens)
	 */
	teamIDAway: string;
	/**
	 * ID of the home team (e.g., "16" for Kansas City Chiefs)
	 */
	teamIDHome: string;
	/**
	 * String representing the number of points scored by the away team
	 */
	awayPts?: string;
	/**
	 * String representing the result of the game for the away team (e.g., "W" for win, "L" for loss, "T" for tie)
	 */
	awayResult?: GameResult;
	/**
	 * String representing the number of points scored by the home team
	 */
	homePts?: string;
	/**
	 * String representing the result of the game for the home team (e.g., "W" for win, "L" for loss, "T" for tie)
	 */
	homeResult?: GameResult;
}

export interface IPlayerInjury {
	/**
	 * Description of the injury
	 */
	description: string;
	/**
	 * Designation of the injury (e.g., "Questionable", "Out")
	 */
	designation: string;
	/**
	 * Date of the injury (MM/DD/YYYY format)
	 */
	injDate: string;
	/**
	 * Expected return date from the injury (MM/DD/YYYY format)
	 */
	injReturnDate: string;
}

export interface IPlayer {
	/**
	 * Age of the player
	 */
	age: string;
	/**
	 * Birthdate of the player (MM/DD/YYYY format)
	 */
	bDay: string;
	/**
	 * Full name of the player as listed on CBS Sports
	 */
	cbsLongName: string;
	/**
	 * Full CBS Sports player ID
	 */
	cbsPlayerIDFull: string;
	/**
	 * Short name of the player as listed on CBS Sports
	 */
	cbsShortName: string;
	/**
	 * URL for the player's headshot on ESPN
	 */
	espnHeadshot: string;
	/**
	 * ESPN player ID
	 */
	espnID: string;
	/**
	 * Full ESPN player ID
	 */
	espnIDFull: string;
	/**
	 * URL for the player's profile on ESPN
	 */
	espnLink: string;
	/**
	 * Full name of the player as listed on ESPN
	 */
	espnName: string;
	/**
	 * Years of experience in the NFL
	 */
	exp: string;
	/**
	 * Football Reference player ID
	 */
	fRefID: string;
	/**
	 * URL for the player's profile on FantasyPros
	 */
	fantasyProsLink: string;
	/**
	 * FantasyPros player ID
	 */
	fantasyProsPlayerID: string;
	/**
	 * Height of the player (feet and inches)
	 */
	height: string;
	/**
	 * Injury information of the player
	 */
	injury: IPlayerInjury;
	/**
	 * Boolean indicating if the player is a free agent
	 */
	isFreeAgent: string;
	/**
	 * Jersey number of the player
	 */
	jerseyNum: string;
	/**
	 * Last game played by the player (game ID)
	 */
	lastGamePlayed: string;
	/**
	 * Full name of the player
	 */
	longName: string;
	/**
	 * Player ID as used by the API (string representing a number)
	 */
	playerID: string;
	/**
	 * Position of the player
	 */
	pos: string;
	/**
	 * RotoWire player ID
	 */
	rotoWirePlayerID: string;
	/**
	 * Full RotoWire player ID
	 */
	rotoWirePlayerIDFull: string;
	/**
	 * College or university the player attended
	 */
	school: string;
	/**
	 * SleeperBot player ID
	 */
	sleeperBotID: string;
	/**
	 * Team abbreviation the player is currently on
	 */
	team: string;
	/**
	 * Team ID the player is currently on
	 */
	teamID: string;
	/**
	 * Weight of the player (pounds)
	 */
	weight: string;
	/**
	 * URL for the player's profile on Yahoo Sports
	 */
	yahooLink: string;
	/**
	 * Yahoo Sports player ID
	 */
	yahooPlayerID: string;
}

export interface INewsLink {
	/**
	 * URL of the news article
	 */
	link: string;
	/**
	 * Title of the news article
	 */
	title: string;
	/**
	 * Preview image of the news article
	 */
	image?: string;
	/**
	 * Player ID associated with the news article
	 */
	playerID?: string;
}
