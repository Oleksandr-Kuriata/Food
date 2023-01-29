'use strict';

function slider({slide, totalCounter, currentCounter, prevArrow, nextArrow, wrapper, field, container}) {
    const slides = document.querySelectorAll(slide),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          prevBtn = document.querySelector(prevArrow),
          nextBtn = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          widthSlide = parseInt(window.getComputedStyle(slidesWrapper).width),
          slider = document.querySelector(container),
          dots = [];
    let slideIndex = 1,
        offset = 0;
    
    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    total.textContent = addZero(slides.length);
    current.textContent = addZero(slideIndex);

    slidesWrapper.style.overflow = 'hidden';

    slidesField.style.display = 'flex';
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.transition = '0.5s all';

    slides.forEach(slide => {
        slide.style.width = widthSlide + 'px';
    });

    prevBtn.addEventListener('click', () => {
        if (offset === 0) {
            offset = widthSlide * (slides.length - 1);
        } else {
            offset = offset - widthSlide;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        current.textContent = addZero(slideIndex);

        dots.forEach(dot => dot.style.opacity = '0.5');

        dots[slideIndex - 1].style.opacity = '1';
    });

    nextBtn.addEventListener('click', () => {
        if (offset === widthSlide * (slides.length - 1)) {
            offset = 0;
        } else {
            offset = offset + widthSlide;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex === slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        current.textContent = addZero(slideIndex);

        dots.forEach(dot => dot.style.opacity = '0.5');

        dots[slideIndex - 1].style.opacity = '1';
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style-type: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            width: 30px;
            height: 8px;
            background-color: #fff;
            opacity: 0.5;
            margin: 0 5px;
            cursor: pointer;
            transition: opacity .5s ease;
        `;
        if (i === 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = +e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = widthSlide * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            current.textContent = addZero(slideIndex);

            dots.forEach(dot => dot.style.opacity = '0.5');

            dots[slideIndex - 1].style.opacity = '1';
        });
    });
}

export default slider;