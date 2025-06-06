import type { PageLoad } from "./$types";
import type { Work } from "$lib/types";

export const load: PageLoad = (): { works: Work[] } => {
	return {
		works: [
			{
				date: "Current",
				url: "",
				title: "Metis (NDA)",
				articleTitle: "Metis",
				img: "/imgs/metis/home.png",
				description:
					"A complete UX and UI overhaul for a web app that is a combination of TurboTax and inventory software. Some of my favorite work, you will have to trust me that it looks great.",
				tags: ["Design", "Frontend", "Backend"],
			},
			{
				date: "2024-2025",
				url: "https://www.topimageservices.com",
				title: "topimageservices.com",
				articleTitle: "Top Image Services",
				img: "/imgs/top-image-services/home.png",
				description:
					"Implemented a <span class='img-hover' data-hover-img='/imgs/top-image-services/1.gif'>masonry grid that opens up as the user scrolls</span>. Sped up loading times with caching rules and performance improvements. Implemented a custom CMS for the client to easily change and edit the content.",
				tags: ["Frontend", "Backend", "Sysadmin"],
			},
			{
				date: "2025",
				url: "https://molarandfriends.com",
				title: "molarandfriends.com",
				articleTitle: "Molar and Friends",
				img: "/imgs/molar-and-friends/home.png",
				description:
					"Full web presence delivery for a pediatric dental practice. Website has an eye-catching, friendly design with <span class='img-hover' data-hover-img='/imgs/molar-and-friends/1.png'>clear CTAs</span>. Set up many behind-the-scenes necessities like Google Analytics, custom email, SEO etc.",
				tags: ["Design", "Frontend", "Sysadmin"],
			},
			{
				date: "2025",
				url: "https://activechapter.online",
				title: "activechapter.online",
				articleTitle: "Active Chapter",
				img: "/imgs/active-chapter/home.png",
				description:
					"Designed and developed from start to finish the website for Active Chapter, a nonprofit art collective and print studio ran by my <span class='img-hover' data-hover-img='/imgs/active-chapter/friends.png'>close friends</span>. Brutalist, minimal design with a <span class='img-hover' data-hover-img='/imgs/active-chapter/1.gif'>single page that transforms and reshapes its form</span>. Balanced the single page magic with animations and URL state holding information for linking out articles. Custom CMS implemented for posting articles.",
				tags: ["Design", "Frontend", "Backend", "Sysadmin"],
			},
			{
				date: "2024",
				url: "https://www.lloydsteven.com",
				title: "lloydsteven.com",
				articleTitle: "Lloyd Steven",
				img: "/imgs/lloyd-steven/home.png",
				description:
					"Built a custom Shopify theme using the liquid template language for Lloyd Steven's jewelry business. Home page features a <span class='img-hover' data-hover-img='/imgs/lloyd-steven/1.gif'>raining collage of items</span> that link out to sections of the site. Implemented a feature to <span class='img-hover' data-hover-img='/imgs/lloyd-steven/2.gif'>preview the item in different metals on hover.</span>",
				tags: ["Frontend"],
			},
			{
				date: "2023",
				url: "https://www.feel.studio",
				title: "feel.studio",
				articleTitle: "Feel",
				img: "/imgs/feel/home.png",
				description:
					"Built an interactive 3D gallery that pans and moves with the users actions. Upon clicking an image <span class='img-hover' data-hover-img='/imgs/feel/1.gif'>all of the images from the project turn to face the user</span>. Built upon previous dev's work to speed up load times using caching and ISR.",
				tags: ["Design", "Frontend"],
			},
		],
	};
};
