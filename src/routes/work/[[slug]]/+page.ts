import { error } from "@sveltejs/kit";
import { works } from "$lib/works";
import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = () =>
	works.map((work) => ({ slug: work.slug }));

export const load: PageLoad = ({ params }) => {
	if (!params.slug) {
		return { works, selected: null };
	}
	const selected = works.find((work) => work.slug === params.slug);
	if (!selected) {
		error(404, "Project not found");
	}
	return { works, selected };
};
