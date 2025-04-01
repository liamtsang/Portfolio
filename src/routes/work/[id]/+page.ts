import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	switch (params.id) {
		case "feel":
			return {
				title: `${params.id}`,
				url: "https://feel.studio",
				content:
					"Give me a list of one way flights from Chicago to Paris.  I've been watching this guy for over a decade and it never gets old hearing things like I might be making a mistake and I'm gonna do this even though chat won't like it as he finally makes the right choice that we've all been waiting for.",
			};
		default:
			return {
				title: `${params.id}`,
				content: `Content for ${params.id} goes here`,
			};
	}
};
