export default class FormValidation {
    constructor() {
        if (!this.vars()) return false;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            form: 'data-form',
            input: 'data-input',
            submitButton: 'data-submit',
            invalidClass: 'invalid'
        }

        this.form = document.querySelector(`[${this.selectors.form}]`);
        this.input = document.querySelector(`[${this.selectors.input}]`);
        this.submitButton = document.querySelector(`[${this.selectors.submitButton}]`);

        if (!this.form || !this.input || !this.submitButton) return false;

        this.regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return true;
    }

    setupEvents() {
        this.form.addEventListener('submit', (event) => this.formValidation(event))
    }

    /**
    * Function to display error or submit form
    * @param    {Event} event    Event from eventlistener
    */
    formValidation(event) {
        event.preventDefault();
        this.inputValue = this.input.value;

        this.emailValidation(this.inputValue) ?
            this.form.submit() :
            (this.form.classList.add(`${this.selectors.invalidClass}`), this.form.reset());
    }

    /**
    * Function that check if our email is correct
    * @param    {String} email    String with email address
    * @return   {Boolean}         Returns true or false
    */
    emailValidation(email) {
        return this.regex.test(email);
    }
}