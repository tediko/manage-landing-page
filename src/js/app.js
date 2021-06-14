class Slider {
    constructor() {
        if (!this.vars()) return;
        this.setupEvents();
    }

    vars() {
        this.selectors = {
            sliderWrapper: 'data-slider-wrapper',
            slider: 'data-slider',
            slides: 'data-slider-reference',
            inputs: 'data-slider-input'
        }

        this.sliderWrapper = document.querySelector(`[${this.selectors.sliderWrapper}]`);
        this.slider = document.querySelector(`[${this.selectors.slider}]`);
        this.slides = document.querySelectorAll(`[${this.selectors.slides}]`);
        this.inputs = document.querySelectorAll(`[${this.selectors.inputs}]`);
        
        if (!this.sliderWrapper || !this.slider || !this.slides) return;
        
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
        this.dragTriggerPoint = 25;

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

        this.sliderWrapper.addEventListener('touchstart', (event) => {
            this.touchStartX = Math.floor(event.touches[0].clientX);
            this.touchEndX = 0;
            this.touchShiftValue = 0;
        })   

        this.sliderWrapper.addEventListener('touchmove', (event) => {
            this.touchEndX = Math.floor(event.touches[0].clientX);
            this.touchShiftValue = this.touchStartX - this.touchEndX;
        })

        this.sliderWrapper.addEventListener('touchend', () => {
            if (!this.isTransitionEnd) return;
            
            if (this.touchShiftValue > this.dragTriggerPoint) {
                this.index++; 
                this.changeSlide();
            } else if (this.touchShiftValue < -this.dragTriggerPoint) {
                this.index--; 
                this.changeSlide();
            } else {
                return;
            }
        })

    }

    removeTransition(direction) {
        let nextSlideIndex = direction === 'next' ? 1 : this.slidesNumber;
        
        window.setTimeout(() => {
            this.slider.style.transform = `translateX(-${this.slideWidth * nextSlideIndex}px)`;
            this.slider.style.transition = `none`;
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
        this.slider.style.transform = `translateX(-${this.slideValue}px)`;
        if (!this.isInitialized) return;
        this.slider.style.transition = `transform ${this.transitionDuration}ms ease-in-out`;
    }
    
    cloneFirstAndLastSlide() {
        this.firstSlideClone = this.slides[0].cloneNode(true);
        this.lastSlideClone = this.slides[this.slidesNumber - 1].cloneNode(true);
        this.slider.append(this.firstSlideClone);
        this.slider.prepend(this.lastSlideClone);
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

    changeSlide() {
        this.isTransitionEnd = false;

        if (this.index > this.lastInputIndex) {
            this.index = this.firstInputIndex;
        } else if (this.index < this.firstInputIndex) {
            this.index = this.lastInputIndex;
        }

        this.setActiveSlideIndex(this.index);
        this.moveToActiveSlide();
        this.setCheckedAttribute(this.index);
        this.previousIndex = this.index;

        window.setTimeout(() => {
            this.isTransitionEnd = true;
        }, this.transitionDuration);
    }
}

let lol = new Slider();