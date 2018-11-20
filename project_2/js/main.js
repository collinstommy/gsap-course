const slide = document.querySelectorAll('.slide');
const navLinks = document.querySelectorAll('.nav a');
const nav = document.querySelector('.nav');
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
		x: '0%'
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
			.set(sectionTo, { scale: 0.9 })
			.add('out')
			.to(nav, 0.3, { y: '10px', autoAlpha: 0, ease: Power4.easeInOut }, 'out')
			.to(sectionFrom, 0.3, {
				scale: 0.9,
				transformOrigin: 'center center',
				ease: Power4.easeInOut
			}, 'out')
			.add('across')
			.to(sectionFrom, 1.2, { ease: Power4.easeInOut, x: '-=100%', clearProps: 'all' },  'out-=.1')
			.to(sectionTo, 1.2, { x: '0%', ease: Power4.easeInOut },  'out-=.1')
			.add('in')
			.to(sectionTo, 0.3, { scale: 1,  ease: Power4.easeInOut }, 'in-=0.4')
			.from(heading, 0.3, { autoAlpha: 0, y: '-15px',  ease: Power4.easeInOut }, 'in')
			.from(subheading, 0.3, { autoAlpha: 0, y: '-15px',  ease: Power4.easeInOut }, 'in+=0.1')
			.from(nav, 0.3, { autoAlpha: 1, y: '0',  ease: Power4.easeInOut }, 'in+=0.2')
			.set(body, { className: '-=is-animating' });
		} else {
		tlUp
			.set(body, { className: '+=is-animating' })
			.set(sectionTo, { x: '-100%', scale: 0.9 })
			.add('out')
			.to(nav, 0.3, { y: '10px', autoAlpha: 0, ease: Power4.easeInOut }, 'out')
			.to(sectionFrom, 0.3, {
				scale: 0.9,
				transformOrigin: 'center center',
				ease: Power4.easeInOut
			}, 'out')
			.add('across')
			.to(sectionFrom, 1.2, { ease: Power4.easeInOut, x: '100%', clearProps: 'all' },  'out-=.1')
			.to(sectionTo, 1.2, { x: '0%', ease: Power4.easeInOut },  'out-=.1')
			.add('in')
			.to(sectionTo, 0.3, { scale: 1,  ease: Power4.easeInOut }, 'in-=0.4')
			.from(heading, 0.3, { autoAlpha: 0, y: '-15px',  ease: Power4.easeInOut }, 'in')
			.from(subheading, 0.3, { autoAlpha: 0, y: '-15px',  ease: Power4.easeInOut }, 'in+=0.1')
			.from(nav, 0.3, { autoAlpha: 1, y: '0',  ease: Power4.easeInOut }, 'in+=0.2')
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