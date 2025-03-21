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
