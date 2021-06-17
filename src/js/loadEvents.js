export default class LoadEvents {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            body: 'data-body',
            loadingClass: 'loading'
        }

        this.body = document.querySelector(`[${this.selectors.body}]`);
        if (!this.body) return false;

        return true;
    }

    /**
    * Watching when whole page is loaded including stylesheets and images
    * and then invoke showAnimation().
    */
    setupEvents() {
        window.addEventListener('load', () => this.showAnimations());
    }

    /**
    * Function to remove class from body
    */
    showAnimations() {
        this.body.classList.remove(`${this.selectors.loadingClass}`);
    }
}