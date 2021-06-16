export default class OnScrollAnimations {
    constructor() {
        if (!this.vars()) return;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            elementsToAnimate: 'data-animate',
            animateClass: 'animated',
        }

        this.elementsToAnimate = document.querySelectorAll(`[${this.selectors.elementsToAnimate}]`);
        if (!this.elementsToAnimate) return;

        return true;
    }

    setupEvents() {
        this.elementsToAnimate.forEach(element => {
            this.scrollObserver(element);
        })
    }

    /**
    * Function to start observe element and add class with animation to it.
    * @param    {Element} element    Element to observe
    */
    scrollObserver(element) {
        this.options = {
            threshold: 0.7
        }

        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(`${this.selectors.animateClass}`);
                }
            })
        }, this.options);
        this.observer.observe(element);
    }
}