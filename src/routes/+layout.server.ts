import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
	return {
		projects: [
			{
				id: "card1",
				project: "lloydsteven",
				initialAngle: "-3.62deg",
				zIndex: 0,
			},
			{ id: "card2", project: "feel", initialAngle: "0deg", zIndex: 1 },
			{ id: "card3", project: "topimage", initialAngle: "0deg", zIndex: 2 },
		],
	};
};
