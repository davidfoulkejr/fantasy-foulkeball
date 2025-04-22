import { getTeamsByConference } from '$lib/helpers';

export const load = async ({ parent }) => {
	const teams = await parent().then((data) => data.teamsPromise);
	const teamsByConference = getTeamsByConference(teams);
	return {
		teamsByConference
	};
};
