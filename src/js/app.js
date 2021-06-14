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
            indicators: 'data-slider-input'
        }

        this.sliderWrapper = document.querySelector(`[${this.selectors.sliderWrapper}]`);
        this.slider = document.querySelector(`[${this.selectors.slider}]`);
        this.slides = document.querySelectorAll(`[${this.selectors.slides}]`);
        this.indicators = document.querySelectorAll(`[${this.selectors.indicators}]`);
        
        if (!this.sliderWrapper || !this.slider || !this.slides) return;
        
        this.slidesNumber = this.slides.length;
        this.slideWidth = this.slides[0].clientWidth;
        this.sliderWrapperWidth = this.sliderWrapper.clientWidth;
        this.lastClonedSlideIndex = this.slidesNumber + 2;
        this.activeSlideIndex = 3;
        this.index = 1;
        this.previousIndex = 0;
        this.firstIndicatorIndex = 0;
        this.lastIndicatorIndex = this.indicators.length - 1;
        this.isTransitionEnd = true;
        this.isInitialized = false;
        this.isMobile = true;
        this.transitionDuration = 500;
        this.dragTriggerPoint = 25;
        this.breakToDesktop = 768;

        return true;
    }

    setupEvents() {
        this.isMobile = this.sliderWrapperWidth >= this.breakToDesktop ? false : true;
        this.moveToActiveSlide();
        this.cloneSlides(2);
        this.setCheckedAttribute(this.activeSlideIndex - 2);
        this.isInitialized = true;
        
        window.addEventListener('resize', () => {
            this.updateWidthValues();
            this.isMobile = 
                this.sliderWrapperWidth >= this.breakToDesktop ?
                false : true;
        });

        this.indicators.forEach((input, index) => {
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
        let nextSlideIndex = direction === 'next' ? 2 : this.slidesNumber + 1;
        let mobileSlideValue = -(nextSlideIndex * this.slideWidth);
        let desktopSlideValue = (this.sliderWrapperWidth / 2 - this.slideWidth / 2) - (nextSlideIndex * (this.slideWidth + 30));
        let slideValue = this.isMobile ? mobileSlideValue : desktopSlideValue;
        
        window.setTimeout(() => {
            this.slider.style.transform = `translateX(${slideValue}px)`;
            this.slider.style.transition = `none`;
            this.isTransitionEnd = true;
        }, this.transitionDuration)
    }
    
    updateWidthValues() {
        this.sliderWrapperWidth = this.sliderWrapper.clientWidth;
        this.slideWidth = this.slides[0].clientWidth;
        this.moveToActiveSlide();
    }
    
    moveToActiveSlide() {
        let mobileSlideValue = -(this.activeSlideIndex * this.slideWidth);
        let desktopSlideValue = (this.sliderWrapperWidth / 2 - this.slideWidth / 2) - (this.activeSlideIndex * (this.slideWidth + 30));
        let slideValue = this.isMobile ? mobileSlideValue : desktopSlideValue;
        this.slider.style.transform = `translateX(${slideValue}px)`;
        if (!this.isInitialized) return;
        this.slider.style.transition = `transform ${this.transitionDuration}ms ease-in-out`;
    }
    
    cloneSlides(amount) {
        let slidesArray = [...this.slides].slice();
        this.cloneBeginning = slidesArray.slice(0, amount);
        this.cloneEnd = slidesArray.reverse().slice(0, amount);
        
        this.cloneBeginning.forEach(clone => {
            this.slider.append(clone.cloneNode(true));
        })
        this.cloneEnd.forEach(clone => {
            this.slider.prepend(clone.cloneNode(true));
        })
    }
    
    setActiveSlideIndex(index) {        
        if (index === this.firstIndicatorIndex && this.previousIndex === this.lastIndicatorIndex) {
            this.activeSlideIndex = this.lastClonedSlideIndex;
            this.isTransitionEnd = false;
            this.removeTransition('next');
        } else if (index === this.lastIndicatorIndex && this.previousIndex === this.firstIndicatorIndex) {
            this.activeSlideIndex = 1;
            this.isTransitionEnd = false;
            this.removeTransition('prev');
        } else {
            this.activeSlideIndex = index + 2;
        }
    }
    
    setCheckedAttribute(index) {
        this.indicators[index].checked = true;
    }

    changeSlide() {
        this.isTransitionEnd = false;

        if (this.index > this.lastIndicatorIndex) {
            this.index = this.firstIndicatorIndex;
        } else if (this.index < this.firstIndicatorIndex) {
            this.index = this.lastIndicatorIndex;
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