const slide = document.querySelectorAll('.slide');
const navLinks = document.querySelectorAll('.nav a');
const navListItems = document.querySelectorAll('.nav li');
const body = document.querySelector('body');

const indexInParent = target => {
	const children = [...target.parentNode.childNodes];
	return children.findIndex(node => node === target);
};

const getActiveSlide = () => document.querySelector('.slide.active');

const init = () => {
	// set active slide visible
	TweenLite.set(getActiveSlide(), {
		y: '0%'
	});

	// Fade slides in
	TweenLite.set(body, { className: '-=loading' });
};

const setActiveSection = (sectionFrom, sectionTo) => {
	sectionFrom.classList.remove('active');
	sectionTo.classList.add('active');

	body.removeAttribute('class');
	body.classList.add(`${sectionTo.id}-active`);

	const currentSlideIndex = parseInt(sectionTo.id.slice(-2)) - 1;
	navListItems.forEach(item => item.removeAttribute('class'));
	navListItems[currentSlideIndex].classList.add('active');
};

const scrollToSection = (sectionFrom, sectionTo) => {
	const from = indexInParent(sectionFrom);
	const to = indexInParent(sectionTo);
	const heading = sectionTo.querySelector('h1');
	const subheading = sectionTo.querySelector('p');
	const bcg = sectionTo.querySelector('.bcg');
	const bcgFrom = sectionFrom.querySelector('.bcg');
	const tlDown = new TimelineLite({
		onComplete: setActiveSection(sectionFrom, sectionTo)
	});
	const tlUp = new TimelineLite({
		onComplete: setActiveSection(sectionFrom, sectionTo)
	});

	if (from === to) return;

	if (from < to) {
		tlDown
			.set(body, { className: '+=is-animating' })
			.to(sectionFrom, 1.2, {
				y: '-=100%',
				ease: Power4.easeInOut,
				clearProps: 'all'
			}, '0')
			.to(sectionTo, 1.2, {
				y: '0%',
				ease: Power4.easeInOut,
			}, '0')
			.to(bcgFrom, 1.2, {
				y: '30%',
				ease: Power4.easeInOut,
				clearProps: 'all'
			}, '0')
			.from(bcg, 1.2, {
				y: '-30%',
				ease: Power4.easeInOut,
				clearProps: 'all'
			}, '0')
			.from(heading, 0.7, {
				autoAlpha: 0,
				y: 40,
				ease: Power4.easeInOut
			}, '-=1')
			.from(subheading, 0.7, {
				autoAlpha: 0,
				y: 40,
				ease: Power4.easeInOut
			}, '-=0.6')
			.set(body, { className: '-=is-animating' });
	} else {
		tlUp
			.set(body, { className: '+=is-animating' })
			.set(sectionTo, { y: '-100%' })
			.to(sectionFrom, 1.2, {
				y: '100%',
				ease: Power4.easeInOut,
				clearProps: 'all'
			}, '0')
			.to(sectionTo, 1.2, {
				y: '0%',
				ease: Power4.easeInOut,
			}, '0')
			.to(bcgFrom, 1.2, {
				y: '-30%',
				ease: Power4.easeInOut,
				clearProps: 'all'
			}, '0')
			.from(bcg, 1.2, {
				y: '30%',
				ease: Power4.easeInOut,
				clearProps: 'all'
			}, '0')
			.from(heading, 0.7, {
				autoAlpha: 0,
				y: 40,
				ease: Power4.easeInOut
			}, '-=1')
			.from(subheading, 0.7, {
				autoAlpha: 0,
				y: 40,
				ease: Power4.easeInOut
			}, '-=0.6')
			.set(body, { className: '-=is-animating' });
	}
};

const handleLinkClick = (e) => {
	e.preventDefault();
	const sectionToId = e.target.hash;
	const sectionTo = document.querySelector(sectionToId);
	const isAnimating = body.classList.contains('is-animating');
	
	if (!isAnimating) {
		scrollToSection(getActiveSlide(), sectionTo);
	};
};

const addEventListeners = () => {
	navLinks.forEach(link => {
		link.addEventListener('click', handleLinkClick);
	});
};

window.addEventListener('load', () => {
	init();
	addEventListeners();
});