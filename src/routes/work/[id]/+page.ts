import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	return {
		title: `${params.id}`,
		content: `Content for ${params.id} goes here`,
	};
};
