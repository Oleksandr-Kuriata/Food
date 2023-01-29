'use strict';

import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: "img/form/spinner.svg",
        success: "Дякую! Скоро ми з вами зв'яжемося",
        failure: "Щось відбулося не так..."
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                margin: 15px auto;
                display: block;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const data = new FormData(form);
            const object = {};
            data.forEach((value, key) => {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    statusMessage.remove();
                    showThanksModal(message.success);
                })
                .catch(err => {
                    console.error(err);
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        openModal('.modal');

        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');

        const modalThanks = document.createElement('div');
        modalThanks.classList.add('modal__dialog');
        modalThanks.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(modalThanks);
        setTimeout(() => {
            modalThanks.remove();
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;