export default class ToggleMenu {
    constructor() {
        if (!this.vars()) return;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            body: 'data-body',
            nav: 'data-nav',
            menu: 'data-menu-cta',
            menuOverlay: 'data-menu-overlay',
            slider: 'data-slider-wrapper',
            activeClass: 'active',
            disabledClass: 'disabled',
            menuOpenClass: 'menu-open',
            navOpenClass: 'nav-open',
            navCloseClass: 'nav-close',
            overflowClass: 'overflow'
        }
        
        this.body = document.querySelector(`[${this.selectors.body}]`);
        this.nav = document.querySelector(`[${this.selectors.nav}]`);
        this.menu = document.querySelector(`[${this.selectors.menu}]`);
        this.menuOverlay = document.querySelector(`[${this.selectors.menuOverlay}]`);
        this.slider = document.querySelector(`[${this.selectors.slider}]`);

        if (!this.body || !this.nav || !this.menu) return;
        
        this.timer;
        this.isExpanded = false;
        this.isOpen = false;
        this.isTransitionend = true;
        this.isSwiped = true;
        this.transitionDuration = 1000;
        this.swipeTriggerPoint = 100;

        return true;
    }
    
    setupEvents() {
        this.menu.addEventListener('click', () => this.toggle());
        this.menuOverlay.addEventListener('click', () => {
            if (!this.isOpen) return;
            this.hide();
        });
        window.addEventListener('resize', () => this.disableOnDesktop());
        
        // Touch listeners
        window.addEventListener('touchstart', (event) => {
            this.startPosition = Math.floor(event.touches[0].clientX);
        })
        window.addEventListener('touchmove', (event) => {
            this.endPosition = Math.floor(event.touches[0].clientX);
        })

        window.addEventListener('touchend', (event) => {
            let eventTarget = event.target;
            let closestEl = eventTarget.closest(`[${this.selectors.slider}]`);

            if (closestEl === this.slider) return;
            this.toggleOnSwipe();
        })
    }

    /**
    * Function to toggle menu
    */
    toggle() {
        if (!this.isTransitionend) return;
        !this.isOpen ? this.show() : this.hide();
    }

    /**
    * Function to display menu
    */
    show() {
        this.isTransitionend = false;
        this.isOpen = !this.isOpen;
        this.isExpanded = !this.isExpanded;

        this.nav.classList.add(`${this.selectors.menuOpenClass}`);
        this.nav.classList.add(`${this.selectors.navOpenClass}`);
        this.body.classList.add(`${this.selectors.overflowClass}`);
        this.menuOverlay.classList.add(`${this.selectors.activeClass}`);
        this.menu.setAttribute('aria-expanded', this.isExpanded)

        this.timer = setTimeout(() => {
            this.isTransitionend = true;
        }, this.transitionDuration);
    }

    /**
    * Function to hide menu
    */
    hide() {
        this.isTransitionend = false;
        this.isOpen = !this.isOpen;
        this.isExpanded = !this.isExpanded;

        this.nav.classList.add(`${this.selectors.navCloseClass}`);
        this.menuOverlay.classList.add(`${this.selectors.disabledClass}`);
        this.nav.classList.remove(`${this.selectors.menuOpenClass}`);
        this.menu.setAttribute('aria-expanded', this.isExpanded)

        this.timer = setTimeout(() => {
            this.nav.classList.remove(`${this.selectors.navOpenClass}`);
            this.nav.classList.remove(`${this.selectors.navCloseClass}`);
            this.body.classList.remove(`${this.selectors.overflowClass}`);
            this.menuOverlay.classList.remove(`${this.selectors.activeClass}`);
            this.menuOverlay.classList.remove(`${this.selectors.disabledClass}`);
            this.isTransitionend = true;
            this.timer = false;
        }, this.transitionDuration);
    }
    
    /**
    * Function to disable menu on desktop
    */
    disableOnDesktop() {
        this.windowWidth = window.innerWidth;
        this.breakpoint = 768;

        if (this.windowWidth > this.breakpoint) {
            this.body.classList.remove(`${this.selectors.overflowClass}`);
            this.nav.classList.remove(`${this.selectors.navOpenClass}`);
            this.nav.classList.remove(`${this.selectors.navCloseClass}`);
            this.nav.classList.remove(`${this.selectors.menuOpenClass}`);
            this.menuOverlay.classList.remove(`${this.selectors.activeClass}`);
            this.menuOverlay.classList.remove(`${this.selectors.disabledClass}`);

            this.isTransitionend = true;
            this.isOpen = false;
            this.isExpanded = false;
            this.menu.setAttribute('aria-expanded', this.isExpanded);
        }
    }

    /**
    * Function to toggle nav on touch slide
    */
    toggleOnSwipe() {
        if (!this.isSwiped) return;
        this.isSwiped = !this.isSwiped;
        this.touchSlideLength = this.endPosition - this.startPosition;

        if (this.touchSlideLength > this.swipeTriggerPoint) {
            this.toggle();
        }

        window.setTimeout(() => {
            this.isSwiped = true;
        }, this.transitionDuration)
    }
}