export default class Menu {
	constructor(menuElement) {
		this.menuElement = menuElement;
		this.menuToggle = this.menuElement.querySelector('.menu-toggle');
		this.submenuToggles = this.menuElement.querySelectorAll('button.menu-link');
		this.submenus = this.menuElement.querySelectorAll('[data-level="2"]');
		this.menuIcon = this.menuToggle.querySelector('.icon');
		this.menuState = 'closed';
		this.transitionTiming = 250;
		this.init();
	}
	init() {
		this.setHeight();

		// start with the nav closed
		this.close();

		// Listen for clicks on the whole doc
		// If click is outside the menu, close it
		document.addEventListener('click', (e) => {
			let target = e.target; // clicked element

			do {
				if (target == this.menuElement) {
					// This is a click inside.
					if (e.target == this.menuToggle) {
						this.toggle();
						return;
					}
					this.submenuToggles.forEach((submenuToggle) => {
						if (submenuToggle == e.target) {
							this.toggleSubmenu(e.target);
							return;
						}
					});
					return;
				}
				// Go up the DOM
				target = target.parentNode;
			} while (target);

			// This is a click outside.
			this.close();
		});
	}
	setHeight() {
		// get the full height of the nav
		// this will be used to calibrate the max-height animation
		const menuHeight = this.menuElement.querySelector('.menu-list').offsetHeight;
		this.menuElement.style.setProperty('--menu-height', menuHeight + 'px');
		this.submenus.forEach((submenu) => {
			const height = submenu.offsetHeight;
			submenu.style.setProperty('--submenu-height', 'calc(2rem + ' + height + 'px)');
		});
	}
	toggle() {
		// add transition animation
		this.menuElement.style.setProperty('--menu-transition-timing', this.transitionTiming + 'ms');
		this.menuState == 'open' ? this.close() : this.open();

		// remove transition animation
		this.killTransition();
	}
	toggleSubmenu(el) {
		const parent = el.closest('.menu-item');

		this.submenus.forEach((submenu) => {
			if (submenu.closest('.menu-item') == parent) {
				parent.dataset.state = parent.dataset.state == 'open' ? 'closed' : 'open';
			} else {
				submenu.dataset.state = 'closed';
			}
		});
	}
	killTransition() {
		// remove the transition animation so that we dont
		// get a height blip switching from mobile to desktop
		setTimeout(() => {
			this.menuElement.style.setProperty('--menu-transition-timing', 0 + 'ms');
		}, this.transitionTiming);
	}
	open() {
		this.menuIcon.textContent = '✕';
		this.updateState('open');
	}
	close() {
		this.menuIcon.textContent = '☰';
		this.submenus.forEach((submenu) => {
			submenu.closest('li').dataset.state = 'closed';
		});
		this.updateState('closed');
		this.killTransition();
	}
	updateState(state) {
		this.menuElement.dataset.state = state;
		this.menuState = state;
		document.documentElement.dataset.menuState = state;
	}
}
