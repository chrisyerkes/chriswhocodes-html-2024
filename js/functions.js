document.addEventListener('DOMContentLoaded', () => {
	// Mobile Menu Toggler
	const mobileNav = document.querySelector('.offcanvas');
	mobileNav.addEventListener('hide.bs.offcanvas', () => {
		mobileNav.classList.add('hiding');
	});

	// Light/dark mode toggle
	const lightswitch = document.querySelector('.light-switch');
	lightswitch.addEventListener('click', (e) => {
		e.preventDefault();
		document.body.classList.toggle('dark-mode');
		lightswitch.classList.toggle('active');
		lightswitch.classList.toggle('off');
	});

	// Flickity Slider
	const services = document.querySelector('.services-slider');
	new Flickity(services, {
		cellSelector: '.single-service',
		cellAlign: 'left',
		contain: true,
		pageDots: false,
		prevNextButtons: false,
		on: {
			ready: () => {
				const serviceElements =
					document.querySelectorAll('.single-service');
				let maxHeight = 0;
				serviceElements.forEach((element) => {
					maxHeight = Math.max(maxHeight, element.offsetHeight);
				});
				serviceElements.forEach((element) => {
					element.style.height = `${maxHeight}px`;
				});
			},
		},
	});

	// Hero animation
	const animation = document.querySelector('.chris-animated-container');
	const randomAnimation = (min, max) => {
		const num = Math.floor(Math.random() * (max - min + 1)) + min;
		const animLengthSeed = Math.floor(Math.random() * 100);
		const animLength =
			animLengthSeed <= 33 ? 3200 : animLengthSeed <= 66 ? 6400 : 9000;

		animation.classList.add('animating');
		setTimeout(() => {
			animation.classList.remove('animating');
			setTimeout(() => randomAnimation(min, max), num);
		}, animLength);
	};

	if (animation) {
		randomAnimation(1000, 10000);
	}

	// Animated portrait
	const portrait = document.querySelector('.contact-photo');
	const overlay = document.querySelector('.overlay');

	portrait.addEventListener('click', (e) => {
		e.preventDefault();
		if (window.innerWidth > 575) {
			const portraitWrap = portrait.querySelector('.portrait-wrap');
			const { offsetWidth: portraitWidth, offsetHeight: portraitHeight } =
				portraitWrap;
			const { left: portraitLeft, top: portraitTop } =
				portrait.getBoundingClientRect();

			overlay.classList.add('active');
			portraitWrap.style.width = `${portraitWidth}px`;
			portraitWrap.style.height = `${portraitHeight}px`;
			portrait.style.paddingTop = `${
				portraitHeight + (window.innerWidth < 768 ? 27 : 22)
			}px`;
			portraitWrap.style.left = `${
				portraitLeft +
				(window.innerWidth < 768
					? (portrait.offsetWidth - 300) / 2 - 12
					: 0)
			}px`;
			portraitWrap.style.top = `${portraitTop}px`;

			portrait.classList.add('loading');
			setTimeout(() => {
				portrait.classList.add('loaded');
				setTimeout(() => portrait.classList.add('animated'), 750);
			}, 100);
		}
	});

	overlay.addEventListener('click', (e) => {
		e.preventDefault();
		const portraitWrap = portrait.querySelector('.portrait-wrap');

		overlay.classList.remove('active');
		portrait.classList.add('closing');
		setTimeout(() => {
			portrait.style.paddingTop = '';
			portraitWrap.style.width = '';
			portraitWrap.style.height = '';
			portraitWrap.style.left = '';
			portraitWrap.style.top = '';
			portrait.classList.remove(
				'animated',
				'loaded',
				'loading',
				'closing'
			);
		}, 500);
	});
});
