const images = [
	{ title: "Genesis", url: "img/phone1.png" },
	{ title: "Impetus", url: "img/phone2.png" },
	{ title: "Acceleration", url: "img/phone3.png" },
	{ title: "Recursion", url: "img/phone4.png" },
	{ title: "Oracle", url: "img/phone5.png" },
	{ title: "Metacognition", url: "img/phone6.png" },
	{ title: "Irrationality", url: "img/phone7.png" },
	{ title: "Terminus", url: "img/phone8.png" },
	{ title: "Transcendence", url: "img/phone9.png" },
	{ title: "Dimension", url: "img/phone10.png" },
	{ title: "Diffraction", url: "img/phone11.png" },
	{ title: "Assumption", url: "img/phone12.png" },
	{ title: "Chroma", url: "img/phone13.png" }
];

const FLIP_SPEED = 750;
let flipTiming = {
	duration: FLIP_SPEED,
	iterations: 1
};

// flip down
let flipAnimationTop = [
	{ transform: "rotateX(0)" },
	{ transform: "rotateX(-90deg)" },
	{ transform: "rotateX(-90deg)" }
];
let flipAnimationBottom = [
	{ transform: "rotateX(90deg)" },
	{ transform: "rotateX(90deg)" },
	{ transform: "rotateX(0)" }
];

// flip up
let flipAnimationTopReverse = [
	{ transform: "rotateX(-90deg)" },
	{ transform: "rotateX(-90deg)" },
	{ transform: "rotateX(0)" }
];
let flipAnimationBottomReverse = [
	{ transform: "rotateX(0)" },
	{ transform: "rotateX(90deg)" },
	{ transform: "rotateX(90deg)" }
];

// selectors
const flipGallery = document.getElementById("flip-gallery");
const flipUnite = flipGallery.querySelectorAll(".unite");

let currentIndex = 0;

// flip that image!
function updateGallery(currentIndex, isReverse = false) {
	// define direction
	const topAnimation = isReverse ? flipAnimationTopReverse : flipAnimationTop;
	const bottomAnimation = isReverse
		? flipAnimationBottomReverse
		: flipAnimationBottom;

	// animate flipping
	flipGallery.querySelector(".overlay-top").animate(topAnimation, flipTiming);
	flipGallery
		.querySelector(".overlay-bottom")
		.animate(bottomAnimation, flipTiming);

	// hide title
	flipGallery.style.setProperty("--title-y", "-1rem");
	flipGallery.style.setProperty("--title-opacity", 0);
	flipGallery.setAttribute("data-title", "");

	// Update image
	flipUnite.forEach((el, idx) => {
		let delay;
		if (isReverse) {
			delay = idx === 1 || idx === 2 ? 0 : FLIP_SPEED - 200;
		} else {
			delay = idx === 1 || idx === 2 ? FLIP_SPEED - 200 : 0;
		}

		/*
		const delay = (isReverse && (idx !== 1 && idx !== 2)) || (!isReverse && (idx === 1 || idx === 2)) 
		? FLIP_SPEED - 200 
		: 0;
*/
		setTimeout(() => setActiveImage(el), delay);
	});

	// update and reveal new title
	//flipUnite[3].addEventListener("animationend", () => {
	setTimeout(() => setImageTitle(), FLIP_SPEED * 0.5); // approx delay on revealing title
}
// set active image
function setActiveImage(el) {
	el.style.backgroundImage = `url("${images[currentIndex].url}")`;
}
// set active image title and reveal
function setImageTitle() {
	flipGallery.setAttribute("data-title", images[currentIndex].title);
	flipGallery.style.setProperty("--title-y", "0");
	flipGallery.style.setProperty("--title-opacity", 1);
}

// update the image index and flip the galllery
function updateIndex(increment) {
	const newIndex = Number(increment);
	const isReverse = newIndex < 0;
	currentIndex = (currentIndex + newIndex + images.length) % images.length;
	updateGallery(currentIndex, isReverse);
}

// nav buttons
const galleryNavButtons = document
	.querySelectorAll("[data-gallery-nav]")
	.forEach((btn) => {
		btn.addEventListener("click", () => updateIndex(btn.dataset.galleryNav));
	});

// set up first image including title (no animation)
function defineFirstImg() {
	flipUnite.forEach((el, idx) => {
		setActiveImage(el);
		setImageTitle(el);
	});
}
defineFirstImg();
