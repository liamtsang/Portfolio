import type { PageLoad } from "./$types";
import { works } from "$lib/works";

export const load: PageLoad = () => {
	return { works };
};
