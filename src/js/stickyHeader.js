export default class StickyHeader {
    constructor() {
        if (!this.vars()) return;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            header: 'data-header',
            kvSection: 'data-kv',
            scrollInClass: 'header-scroll-in',
            scrollOutClass: 'header-scroll-out',
        }

        this.header = document.querySelector(`[${this.selectors.header}]`);
        this.kvSection = document.querySelector(`[${this.selectors.kvSection}]`);

        if (!this.header || !this.kvSection) return;

        this.timer;
        this.isInitialized = false;
        this.transitionDuration = 300;

        return true;
    }

    setupEvents() {
        this.navObserver(this.kvSection);
    }

    /**
    * Function to start observe element and show/hide header.
    * @param    {Element} element    Element to observe
    */
    navObserver(element) {
        this.options = {
            threshold: 0.2
        }

        this.observer = new IntersectionObserver((entries, observer) => {
            if (this.isInitialized) {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        this.header.classList.add(`${this.selectors.scrollInClass}`);
                    } else {
                        this.header.classList.add(`${this.selectors.scrollOutClass}`);
                        
                        this.timer = setTimeout(() => {
                            this.header.classList.remove(`${this.selectors.scrollInClass}`);
                            this.header.classList.remove(`${this.selectors.scrollOutClass}`);
                            this.timer = false;
                        }, this.transitionDuration);
                    }
                })
            }
            this.isInitialized = true;
        }, this.options);
        this.observer.observe(element);
    }
}