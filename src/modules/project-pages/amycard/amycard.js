import * as $ from "jquery";
window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');

const PlayVideo = document.querySelector('.amycard__plot-block-video-js');

if (PlayVideo) {

    $('[data-fancybox]').fancybox({
        youtube : {
            controls : 0,
            showinfo : 0
        },
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
                </button>`
        },
    });
}