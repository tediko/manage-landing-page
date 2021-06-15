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

        this.slidesNumberAfterClone;
        this.lastTrueElement; /* Last slide that isn't clone*/
        this.slideWidth = this.slides[0].clientWidth;
        this.sliderWrapperWidth = this.sliderWrapper.clientWidth;
        
        this.numOfElementsToClone = 2; /* Number of elements to clone */
        this.activeSlideIndex = 3; /* Which slide to show first */
        this.index = this.activeSlideIndex - this.numOfElementsToClone;
        this.previousIndex = 0;
        this.firstIndicatorIndex = 0;
        this.lastIndicatorIndex = this.indicators.length - 1;

        /* Helpers */
        this.isTransitionEnd = true;
        this.isInitialized = false;
        this.isMobile = true;
        this.isMousePressed = false;
        this.transitionDuration = 700;
        this.dragTriggerPoint = 35;
        this.breakToDesktop = 768;

        return true;
    }

    setupEvents() {
        this.isMobile = this.sliderWrapperWidth >= this.breakToDesktop ? false : true;
        this.moveToActiveSlide();
        this.cloneSlides(this.numOfElementsToClone);
        this.setCheckedAttribute(this.index);
        this.isInitialized = true;
        
        // Look for window resize
        window.addEventListener('resize', () => {
            this.updateWidthValues();
            this.isMobile = 
                this.sliderWrapperWidth >= this.breakToDesktop ?
                false : true;
        });

        // Indicators listener
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

        // Mobile dragging events
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
            this.handleDrag();
        })

        // Desktop dragging events
        this.sliderWrapper.addEventListener('mousedown', (event) => {
            event.preventDefault();
            this.isMousePressed = true;
            this.slider.style.cursor = 'grabbing';
            this.touchStartX = event.clientX;
            this.touchEndX = 0;
            this.touchShiftValue = 0;
        })

        this.sliderWrapper.addEventListener('mousemove', (event) => {
            if (!this.isMousePressed) return;
            this.touchEndX = event.clientX;
            this.touchShiftValue = this.touchStartX - this.touchEndX;
        })  

        this.sliderWrapper.addEventListener('mouseup', () => {
            if (!this.isTransitionEnd) return;
            this.isMousePressed = false;
            this.slider.style.cursor = 'grab';
            this.handleDrag();
        })  
    }

    /**
    * Function to remove transition effect when the carousel loops.
    * @param    {String} direction    String with direction of next slide
    */
    removeTransition(direction) {
        let nextSlideIndex = direction === 'next' ? this.numOfElementsToClone : this.lastTrueElement;
        let mobileSlideValue = -(nextSlideIndex * this.slideWidth);
        let desktopSlideValue = (this.sliderWrapperWidth / 2 - this.slideWidth / 2) - (nextSlideIndex * (this.slideWidth + 30));
        let slideValue = this.isMobile ? mobileSlideValue : desktopSlideValue;
        
        window.setTimeout(() => {
            this.slider.style.transform = `translateX(${slideValue}px)`;
            this.slider.style.transition = `none`;
            this.isTransitionEnd = true;
        }, this.transitionDuration)
    }

    /**
    * Function that update width values
    */
    updateWidthValues() {
        this.sliderWrapperWidth = this.sliderWrapper.clientWidth;
        this.slideWidth = this.slides[0].clientWidth;
        this.moveToActiveSlide();
    }
    
    /**
    * Function that move/transform our container so it show current slide
    */
    moveToActiveSlide() {
        let mobileSlideValue = -(this.activeSlideIndex * this.slideWidth);
        let desktopSlideValue = (this.sliderWrapperWidth / 2 - this.slideWidth / 2) - (this.activeSlideIndex * (this.slideWidth + 30));
        let slideValue = this.isMobile ? mobileSlideValue : desktopSlideValue;
        this.slider.style.transform = `translateX(${slideValue}px)`;
        if (!this.isInitialized) return;
        this.slider.style.transition = `transform ${this.transitionDuration}ms ease-in-out`;
    }
    
    /**
    * Function that clone given number of slides at the beginning and at the end.
    * @param    {Number} amount    Amount of slides to clone
    */
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

        this.slidesNumberAfterClone = document.querySelectorAll('[data-slider-reference]').length - 1;
        this.lastTrueElement = this.slidesNumberAfterClone - this.numOfElementsToClone;
    }
    
    /**
    * Function that check if our slider is on first/last slide
    * and assign new activeSlideIndex value.  
    * @param    {Number} index    Value of new indicator index
    */
    setActiveSlideIndex(index) {        
        if (index === this.firstIndicatorIndex && this.previousIndex === this.lastIndicatorIndex) {
            this.activeSlideIndex = this.slidesNumberAfterClone - 1;
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
    
    /**
    * Function that set attribute 'checked' to given input
    * @param    {Number} index    Value of new indicator index
    */
    setCheckedAttribute(index) {
        this.indicators[index].checked = true;
    }

    /**
    * Function that change current slide, active indicators
    */
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

    /**
    * Function that check direction of dragging move
    * and chooses which direction our slider slides. 
    */
    handleDrag() {
        if (this.touchShiftValue > this.dragTriggerPoint) {
            this.index++; 
            this.changeSlide();
        } else if (this.touchShiftValue < -this.dragTriggerPoint) {
            this.index--; 
            this.changeSlide();
        } else {
            return;
        }
    }
}

let lol = new Slider();