import { page } from '$app/state';

export function load({ redirect }) {
	const lastUrlSegment = page.url.pathname.split('/').pop();
	if (!lastUrlSegment || isNaN(parseInt(lastUrlSegment))) {
		redirect(308, '/schedule/1');
	}
}
