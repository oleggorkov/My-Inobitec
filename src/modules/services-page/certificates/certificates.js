import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);
import * as $ from "jquery";
window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');

const slider = document.querySelector('.js-certificates-slider');

if (slider) {
    const certificatesSlider = new Swiper('.js-certificates-slider', {
        loop: true,
        navigation: {
          nextEl: '.js-button-next',
          prevEl: '.js-button-prev',
        },
    });

    window.addEventListener('load', () => {
        setTimeout(() => {
            certificatesSlider.update();
        }, 0);
    });

    $('[data-fancybox="certificate"]').fancybox({
        loop: true,
        infobar: false,
        smallBtn: true,
        backFocus : false,
        btnTpl: {
            smallBtn:
                `<button type="button" data-fancybox-close class="fancybox-button">
                    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="31" cy="31" r="30" stroke="white" stroke-width="2"/>
                        <rect x="44.4351" y="17.1509" width="2" height="40" transform="rotate(45 44.4351 17.1509)" fill="white"/>
                        <rect x="45.8492" y="45.4351" width="2" height="40" transform="rotate(135 45.8492 45.4351)" fill="white"/>
                    </svg>
                </button>`,
            arrowLeft:
                `<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left">
                    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="31" cy="31" r="30" transform="rotate(-180 31 31)" stroke="white" stroke-width="2"/>
                        <rect x="21.0293" y="31" width="2" height="24" transform="rotate(-135 21.0293 31)" fill="white"/>
                        <rect x="19.5229" y="29.937" width="2" height="24" transform="rotate(-45 19.5229 29.937)" fill="white"/>
                    </svg>
                </button>`,
            arrowRight:
                `<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right">
                    <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="31" cy="31" r="30" stroke="white" stroke-width="2"/>
                        <rect x="40.9706" y="31" width="2" height="24" transform="rotate(45 40.9706 31)" fill="white"/>
                        <rect x="42.4772" y="32.063" width="2" height="24" transform="rotate(135 42.4772 32.063)" fill="white"/>
                    </svg>
                </button>`,
        },
        afterShow: () => {
            positionNavigationButtons();

            window.addEventListener('resize', positionNavigationButtons);
        },
        afterClose: () => {
            window.removeEventListener('resize', positionNavigationButtons);
        },
    });

    const positionNavigationButtons = () => {
        const slideWidth = document.querySelector('.fancybox-slide--current .fancybox-content').offsetWidth;
        document.querySelector('.fancybox-navigation').style.width = `${slideWidth + 236}px`;
    };
}