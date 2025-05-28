import type { PageLoad } from "./$types";

export const load: PageLoad = () => {
	return {
		works: [
			{
				date: "Current",
				url: "",
				title: "Metis (NDA)",
				articleTitle: "Metis",
				img: "",
				description: "poop!",
			},
			{
				date: "2024-2025",
				url: "https://www.topimageservices.com",
				title: "topimageservices.com",
				articleTitle: "Top Image Services",
				img: "/imgs/topimageservices/home.png",
				description:
					"Blah <span id='img-hover' data-hover-img='/imgs/topimageservices/1.png'>hover for link</span> blah",
			},
		],
	};
};
