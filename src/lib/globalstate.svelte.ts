export const globalState = $state({
	projects: [
		{
			id: "card1",
			project: "lloydsteven",
			initialAngle: "-3.62deg",
			zIndex: 0,
			position: { x: -140, y: -300 },
			savedPosition: { x: 0, y: 0 },
		},
		{
			id: "card2",
			project: "feel",
			initialAngle: "0deg",
			zIndex: 1,
			position: { x: 100, y: -150 },
			savedPosition: { x: 0, y: 0 },
		},
		{
			id: "card3",
			project: "topimage",
			initialAngle: "3deg",
			zIndex: 2,
			position: { x: -100, y: 45 },
			savedPosition: { x: 0, y: 0 },
		},
	],
});

export const moveCardToTop = (project) => {
	// console.log("Moving ", id)
	for (let i = 0; i < globalState.projects.length; i++) {
		if (globalState.projects[i].project === project) {
			globalState.projects[i].zIndex = globalState.projects.length;
		} else if (
			globalState.projects[i].project !== project &&
			globalState.projects[i].zIndex !== 0
		) {
			globalState.projects[i].zIndex -= 1;
		}
	}
	return;
};
