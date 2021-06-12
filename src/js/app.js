class Slider {
    constructor() {
        if (!this.vars()) return;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            container: 'data-slider-container',
            slides: 'data-slider-reference',
            inputs: 'data-slider-input'
        }

        this.container = document.querySelector(`[${this.selectors.container}]`);
        this.slides = document.querySelectorAll(`[${this.selectors.slides}]`);
        this.inputs = document.querySelectorAll(`[${this.selectors.inputs}]`);
        
        if (!this.container || !this.slides) return;
        
        this.slidesNumber = this.slides.length;
        this.slideWidth = this.slides[0].clientWidth;
        this.pageWidth = window.innerWidth;
        this.lastClonedSlideIndex = this.slidesNumber + 1;
        this.activeSlideIndex = 2;
        this.index = 1;
        this.previousIndex = 0;
        this.firstInputIndex = 0;
        this.lastInputIndex = this.inputs.length - 1;
        this.isTransitionEnd = true;
        this.isInitialized = false;
        this.transitionDuration = 500;

        return true;
    }

    setupEvents() {
        this.moveToActiveSlide();
        this.cloneFirstAndLastSlide();
        this.setCheckedAttribute(this.activeSlideIndex - 1);
        this.isInitialized = true;
        
        window.addEventListener('resize', () => {
            this.updateWidthValues();
        });

        this.inputs.forEach((input, index) => {
            input.addEventListener('click', () => {
                if (!this.isTransitionEnd) return;
                this.index = index;

                this.setActiveSlideIndex(this.index);
                this.moveToActiveSlide();
                this.setCheckedAttribute(this.index);
                this.previousIndex = this.index;
            })
        })

        window.addEventListener('touchstart', (event) => {
            this.startPosition = Math.floor(event.touches[0].clientX);
            this.endPosition = 0;
        })    
        window.addEventListener('touchmove', (event) => {
            this.endPosition = Math.floor(event.touches[0].clientX);
        })
        window.addEventListener('touchend', () => {
            if (this.startPosition > this.endPosition && this.endPosition != 0) {
                this.index++; 
                
                if (this.index > this.lastInputIndex) {
                    this.index = this.firstInputIndex;
                }

                this.setActiveSlideIndex(this.index);
                this.moveToActiveSlide();
                this.setCheckedAttribute(this.index);
                this.previousIndex = this.index;

            } else if (this.startPosition < this.endPosition && this.endPosition != 0) {
                this.index--; 

                if (this.index < this.firstInputIndex) {
                    this.index = this.lastInputIndex;
                }

                this.setActiveSlideIndex(this.index);
                this.moveToActiveSlide();
                this.setCheckedAttribute(this.index);
                this.previousIndex = this.index;
            } else {
                console.log('lmaooo');
                return;
            }
        })

    }

    removeTransition(direction) {
        let nextSlideIndex = direction === 'next' ? 1 : this.slidesNumber;

        window.setTimeout(() => {
            this.container.style.transform = `translateX(-${this.slideWidth * nextSlideIndex}px)`;
            this.container.style.transition = `none`;
            this.isTransitionEnd = true;
        }, this.transitionDuration)
    }
    
    updateWidthValues() {
        this.pageWidth = window.innerWidth;
        this.slideWidth = this.slides[0].clientWidth;
        this.moveToActiveSlide();
    }

    moveToActiveSlide() {
        this.slideValue = this.activeSlideIndex * this.slideWidth;
        this.container.style.transform = `translateX(-${this.slideValue}px)`;
        if (!this.isInitialized) return;
        this.container.style.transition = `transform ${this.transitionDuration}ms ease-in-out`;
    }

    cloneFirstAndLastSlide() {
        this.firstSlideClone = this.slides[0].cloneNode(true);
        this.lastSlideClone = this.slides[this.slidesNumber - 1].cloneNode(true);
        this.container.append(this.firstSlideClone);
        this.container.prepend(this.lastSlideClone);
    }

    setActiveSlideIndex(index) {        
        if (index === this.firstInputIndex && this.previousIndex === this.lastInputIndex) {
            this.activeSlideIndex = this.lastClonedSlideIndex;
            this.isTransitionEnd = false;
            this.removeTransition('next');
        } else if (index === this.lastInputIndex && this.previousIndex === this.firstInputIndex) {
            this.activeSlideIndex = 0;
            this.isTransitionEnd = false;
            this.removeTransition('prev');
        } else {
            this.activeSlideIndex = index + 1;
        }
    }

    setCheckedAttribute(index) {
        this.inputs[index].checked = true;
    }
}

let lol = new Slider();