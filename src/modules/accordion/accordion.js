import * as $ from 'jquery';

const accordions = document.querySelectorAll('.accordion');

if (accordions.length) {
    accordions.forEach((accordion) => {
        const accordionHeader = accordion.querySelector('.accordion__header');
        const accordionContent = accordion.querySelector('.accordion__content');

        accordionHeader.addEventListener('click', () => {
            if (!accordionHeader.classList.contains('is-open')) {
                accordionHeader.classList.add('is-open');
                accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
                accordionContent.style.opacity = 1;
                $(window).resize(function() {
                    if (accordionHeader.classList.contains('is-open')) {
                        accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
                    }
                });
            } else {
                accordionHeader.classList.remove('is-open');
                accordionContent.removeAttribute('style');
            }
        });
    });
}
