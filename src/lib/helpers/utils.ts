import { TeamColors } from '$lib/api/mocks';
import type { ITeam } from '$lib/api/schema.interface.js';

export const gameDateAsDate = (gameDate: string): Date | null => {
	const datePattern = new RegExp(/(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})/);
	const gameDateMatch = datePattern.exec(gameDate.toString());
	if (!gameDateMatch || !gameDateMatch.groups) {
		return null;
	}
	return new Date(
		parseInt(gameDateMatch.groups.year),
		parseInt(gameDateMatch.groups.month),
		parseInt(gameDateMatch.groups.day)
	);
};

export const getTeamColors = (team: ITeam): string[] | undefined =>
	TeamColors.find((t) => t.name === `${team.teamCity} ${team.teamName}`)?.colors?.hex;

/**
 * Calculates the brightness of a color based on its RGB values.
 * @param r RGB red value (0-255)
 * @param g RGB green value (0-255)
 * @param b RGB blue value (0-255)
 * @returns integer value representing the brightness of the color
 * @description The formula used is based on the perceived brightness of the color, which is a weighted sum of the RGB values.
 * @see https://www.w3.org/TR/AERT/#color-contrast
 */
function calculateColorBrightness(r: number, g: number, b: number): number {
	return (r * 299 + g * 587 + b * 114) / 1000;
}

/**
 * Determines the contrasting text color (black or white) based on the brightness of the background color.
 * @param r RGB red value (0-255)
 * @param g RGB green value (0-255)
 * @param b RGB blue value (0-255)
 * @returns 'black' or 'white' depending on the brightness of the background color
 * @description If the brightness is greater than 125, it returns 'black'; otherwise, it returns 'white'.
 */
function getContrastingTextColor(r: number, g: number, b: number): string {
	const brightness = calculateColorBrightness(r, g, b);
	return brightness > 125 ? 'black' : 'white';
}

export const getFontColorFromBackground = (backgroundColor: string): string => {
	const hexPattern1 = /^#(?<hexR>[0-9A-F])(?<hexG>[0-9A-F])(?<hexB>[0-9A-F])$/i;
	const hexPattern2 = /^#(?<hexR>[0-9A-F]{2})(?<hexG>[0-9A-F]{2})(?<hexB>[0-9A-F]{2})$/i;
	const rgbPattern = /^rgb\((?<r>\d{1,3}),\s*(?<g>\d{1,3}),\s*(?<b>\d{1,3})\)$/;

	const isHex = hexPattern1.test(backgroundColor) || hexPattern2.test(backgroundColor);
	const isRgb = rgbPattern.test(backgroundColor);
	if (!isHex && !isRgb) {
		return 'white';
	}

	let r: number, g: number, b: number;
	if (isHex) {
		const hexPattern = hexPattern1.test(backgroundColor) ? hexPattern1 : hexPattern2;
		// Match the hex pattern with 3 or 6 digits
		// and extract the RGB values using named groups
		// Example: #FF5733 or #F53
		const hexRegEx = new RegExp(hexPattern);
		const match = hexRegEx.exec(backgroundColor);
		if (!match || !match.groups) {
			return 'white';
		}
		r = parseInt(match.groups.hexR, 16);
		g = parseInt(match.groups.hexG, 16);
		b = parseInt(match.groups.hexB, 16);
	} else {
		const rgbRegEx = new RegExp(rgbPattern);
		const match = rgbRegEx.exec(backgroundColor);
		if (!match || !match.groups) {
			return 'white';
		}
		r = parseInt(match.groups.r, 10);
		g = parseInt(match.groups.g, 10);
		b = parseInt(match.groups.b, 10);
	}
	return getContrastingTextColor(r, g, b);
};
