// JS
import '../modules/legacy.js/angular';
import '../modules/legacy.js/index';
import '../modules/legacy.js/ycp';

// styles
import '../styles/legacy.scss';

//Plugins init
import * as $ from "jquery";

(function () {
    let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if (isIE11) {
        if (document.querySelector('.video')) {
            document.querySelector('.video').style.display = 'flex';
        }
    } else {
        // $("#unix").ycp({
        //     apikey : 'AIzaSyCTqXPv1-fjpzVHWl-_rR3z1BsCV5MmVO8',
        //     playlist : 50,
        //     autoplay : true,
        //     related : true
        // });
    }
}());