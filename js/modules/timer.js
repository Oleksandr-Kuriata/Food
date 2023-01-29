'use strict';

function timer(timerSelector, endtime) {
    function getTimeRemaining() {
        const total = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor((total / (1000 * 60 * 60 * 24))),
              hours = Math.floor((total / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((total / (1000 * 60)) % 60),
              seconds = Math.floor((total / 1000) % 60);

        return {
            total: total,
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function addZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    setClock();

    function setClock() {
        const timer = document.querySelector(timerSelector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds');
        let timerId = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining();

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timerId);
            }
        }
    }
}

export default timer;