# Frontend Mentor - Manage landing page

![Design preview for the Manage landing page coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [Intro](#intro)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [Useful resources](#useful-resources)

## Overview

### Intro
Hello! This is my solution to [Manage landing page - Frontend Mentor](https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5). Single page  with carousel which turned out to be the biggest challenge during the process of creating this landing page.


### The challenge

>Your challenge is to build out this landing page and get it looking as close to the design as possible.
>
>You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.
>
>Your users should be able to:

>- View the optimal layout for the site depending on their device's screen size
>- See hover states for all interactive elements on the page
>- See all testimonials in a horizontal slider
>- Receive an error message when the newsletter sign up form is submitted if:
  >- The input field is empty
  >- The email address is not formatted correctly

### Links

- [LIVE PREVIEW](https://manage-tediko.netlify.app/) to check my solution.
- [Frontend Mentor](https://www.frontendmentor.io) challenges allow you to improve your skills in a real-life workflow.

## My process

### Built with

 - Webpack
 - SCSS
 - BEM methodology
 - Mobile first
 - Semantic HTML5 markup
 - JavaScript
 - Flexbox
 - Grid
 - Intersection Observer API

### Features
- Added `counter()` function for my *pseudo-elements* content in *about__features*. **CSS counters** let you adjust the appearance of content based on its location in a document. For example, you can use counters to automatically number the headings in a webpage.
- Used `inset` CSS property to position some of my *pseudo-elements*. It is a shorthand that corresponds to the *top, right, bottom*, and *left* properties. It has the same multi-value syntax of the margin shorthand.
- For hover effect on navigation links I used `mask-image` property. A mask in CSS hides part of the element is applied to.
- Added ***touch-enabled*** mobile navigation. It's hard to reach for the hamburger menu on larger phones so I added a menu that is enabled by touchmove feature. Swipe from left to right to open menu on mobiles. 
- Implemented ***Skip to content*** link. Skip links are little internal navigation links that help users move around a page. It is used as an accessibility enhancement that lets keyboard users and screen readers jump from the top of the page to the content without have to go through other elements on the page first.
- Added ***sticky nav menu*** using `Intersection Observer API`. In short, this API is a native way of detecting if an object has entered the viewport. My observer looking at `.kv` section, and if that section is no longer interacting with viewport it triggers my header to appear.
- Applied ***load events*** to prevent animating content before assets has downloaded. In short it is using JavaScript to listen for a load event, and make use `animation-play-state` to pause our animations until the assets has downloaded.
- Implemented `prefers-reduced-motion` CSS media feature which is used to detect if the user has requested that the system minimize the amount of non-essential motion it uses. Prevent animations in brief.
- `:focus-visible` pseudo class. This selector only indicate focus when it is helpful to the user - such as in cases where the user interacts with the page via a keyboard or some other non-pointing device. It isn't supported by Safari yet, but there is simple [workaround](https://stackoverflow.com/questions/31402576/enable-focus-only-on-keyboard-use-or-tab-press).
- Tried to create more accessible mobile navigation. Used the `aria-expanded` and `aria-controls` attributes.
- To create this project I used webpack. More specifically i used `laravel mix` which is a wrapper for webpack and targets the 80% usecase.

### Useful resources

- [DOCS - CSS Counters](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Lists_and_Counters/Using_CSS_counters)
- [VIDEO - CSS Counters](https://youtu.be/0gayskscLY4?t=355)
- [LINK - mask-image](https://css-tricks.com/almanac/properties/m/mask-image/)
- [LINK - touch-events](https://flaviocopes.com/touch-events/)
- [LINK - skip-to-content](https://css-tricks.com/how-to-create-a-skip-to-content-link/)
- [LINK - load-events](https://css-tricks.com/making-animations-wait/)
- [DOCS - Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [LINK - webpack](https://laravel-mix.com/docs/6.0/what-is-mix)