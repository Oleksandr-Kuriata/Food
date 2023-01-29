'use strict';

function tabs(tabContentSelector, tabsParentSelector, tabSelector, activeClass) {
    const tabContent = document.querySelectorAll(tabContentSelector),
          tabsParent = document.querySelector(tabsParentSelector),
          tabs = document.querySelectorAll(tabSelector);

    tabsParent.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains(tabSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (e.target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    
    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.remove('hide');
        tabContent[i].classList.add('show', 'fade');

        tabs[i].classList.add(activeClass);
    }

    hideTabContent();

    showTabContent();
}

export default tabs;