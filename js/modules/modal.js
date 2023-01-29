'use strict';

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('hide');
    modal.classList.add('show');

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function modal(modalTriggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(modalTriggerSelector),
          modal = document.querySelector(modalSelector);

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });

    document.addEventListener('click', function(e) {
        if (e.target && e.target === modal && e.target.classList.contains('show') || e.target && e.target.classList.contains('modal__close')) {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('keydown', function(e) {
        if (e.code === 'Escape') {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);

    function showModalByScroll() {
        if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
}

export default modal;
export {openModal};
export {closeModal};