'use strict';

import {getResource} from '../services/services';

function cards() {
    class MenuCard {
        constructor(img, alt, title, descr, price, parentSelector, ...clasess) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parentSelector = parentSelector;
            this.clasess = clasess;
            this.currency = 36;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = parseInt(this.price * this.currency);
        }

        render() {
            const element = document.createElement('div');

            if (this.clasess.length === 0) {
                this.clasess = 'menu__item';
                element.classList.add(this.clasess);
            } else {
                this.clasess.forEach(item => {
                    element.classList.add(item);
                });
            }

            element.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;

            document.querySelector(this.parentSelector).append(element);
        }
    }

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        })
        .catch(err => console.error(err));
}

export default cards;