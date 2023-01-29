'use strict';

import tabs from './modules/tabs';
import modal, {openModal} from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

document.addEventListener('DOMContentLoaded', function() {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabcontent', '.tabheader__items', '.tabheader__item', 'tabheader__item_active');
    timer('.timer', '2023-02-28');
    cards();
    calc();
    forms();
    slider({
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        container: '.offer__slider'
    });
    modal('[data-modal]', '.modal', modalTimerId);
});