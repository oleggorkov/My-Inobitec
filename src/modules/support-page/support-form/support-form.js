import InitForm from "../../forms/forms";
import InitCustomSelect from '../../forms/custom-select';
import * as $ from "jquery";
window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const forms = document.querySelectorAll('.support-form form');

$(function() {
    $(document).ready(function() {
        var $textarea = '#question-message';
        var $counter = '#counter';
        var $maxSymbol = '#max-symbols';

        $($textarea).on('blur, keyup', function() {
            var $max = 1000; // Максимальное кол-во символов
            var $val = $(this).val();
            $(this).attr('maxlength', $max); // maxlength=""
            if( $val.length <= 0 ) {
                $($counter).html(0);
                $($maxSymbol).text(`/1000`);
            } else {
                if( $max < parseInt( $val.length ) ) {
                    $this.val( $val.substring(0, $max) );
                }
                $($counter).html( $(this).val().length );
                $($maxSymbol).text(`/1000`);
            }
        });
    });
});

$(function() {
    $(document).ready(function() {
        var $textarea = '#issue-message';
        var $counter = '#counter-problem';
        var $maxSymbol = '#max-symbols-problem';

        $($textarea).on('blur, keyup', function() {
            var $max = 1000; // Максимальное кол-во символов
            var $val = $(this).val();
            $(this).attr('maxlength', $max); // maxlength=""
            if( $val.length <= 0 ) {
                $($counter).html(0);
                $($maxSymbol).text(`/1000`);
            } else {
                if( $max < parseInt( $val.length ) ) {
                    $this.val( $val.substring(0, $max) );
                }
                $($counter).html( $(this).val().length );
                $($maxSymbol).text(`/1000`);
            }
        });
    });
});

if (forms.length) {
    forms.forEach(form => {
        new InitForm({
            form: form,
            SuccessCallback: function () {
                const successPopup = document.querySelector('#success-popup');
    
                if (successPopup) {
                    $.fancybox.open(successPopup, {
                        touch: false,
                        smallBtn: false,
                        toolbar: false,
                        afterShow: () => {
                            disableBodyScroll(successPopup);
                        },
                        beforeClose: () => {
                            clearAllBodyScrollLocks();
                        },
                    });
                }

                grecaptcha.execute('6LdNy7wUAAAAAPeRFWzbD3GIijmFnH-dJ_oNE8YD', {action: 'homepage'}).then(function(token) {
                    $('input[name="recaptcha_response"]').val(token);
                });
            },
            ErrorCallback: function () {
                const errorPopup = document.querySelector('#error-popup');
    
                if (errorPopup) {
                    $.fancybox.open(errorPopup, {
                        touch: false,
                        smallBtn: false,
                        toolbar: false,
                        afterShow: () => {
                            disableBodyScroll(errorPopup);
                        },
                        beforeClose: () => {
                            clearAllBodyScrollLocks();
                        },
                    });
                }
            },
            CaptchaErrorCallback: function () {
                grecaptcha.execute('6LdNy7wUAAAAAPeRFWzbD3GIijmFnH-dJ_oNE8YD', {action: 'homepage'}).then(function(token) {
                    $('input[name="recaptcha_response"]').val(token);
                });
            }
        });
    });

    const formToggles = document.querySelectorAll('.support-form__toggle input');
    const productSelect = document.querySelector('.js-issue-product-select select');
    const versionSelect = document.querySelector('.js-version-select select');
    const versionSelectContainer = document.querySelector('.js-version-select');

    if (formToggles.length) {
        const questionForm = document.querySelector('.js-question-form');
        const issueForm = document.querySelector('.js-issue-form');

        formToggles.forEach(toggle => {
            toggle.addEventListener('change', () => {
                if (toggle.value === 'question') {
                    issueForm.classList.remove('is-open');
                    questionForm.classList.add('is-open');
                } else {
                    questionForm.classList.remove('is-open');
                    issueForm.classList.add('is-open');
                }
            });
        });
    }

    if (productSelect && versionSelect) {
        const requestURL = versionSelect.dataset.productVersions;
        const versionSelectTemplate = versionSelect.cloneNode(true);
        const productSelectOptions = productSelect.querySelectorAll('option');
        let productVersions = {};

        productSelectOptions.forEach((option, index) => {
            if (option.hasAttribute('data-multicolor')) {
                const multicolorVisibleOption = productSelect.parentElement.querySelector(`li:nth-child(${index + 1})`);

                multicolorVisibleOption.addEventListener('click', () => {
                    setTimeout(() => {
                        const options = versionSelectContainer.querySelectorAll('li');

                        options.forEach(option => {
                            const optionValue = option.dataset.value;
                            if (optionValue.includes('PostgreSQL')) {
                                option.classList.add('is-orange');
                            } else if (optionValue.includes('MySQL')) {
                                option.classList.add('is-blue');
                            }
                        });
                    }, 0);
                });
            }
        });

        const getProductVersions = requestURL => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('GET', requestURL);
            xhr.send();
    
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    productVersions = xhr.response;
                }
            });
        };

        const createVersionSelectClone = productName => {
            const selectedProductVersions = productVersions[productName];
            const versionSelectClone = versionSelectTemplate.cloneNode(true);
    
            if (selectedProductVersions.length) {
                selectedProductVersions.forEach(version => {
                    const optionElement = document.createElement('option');
                    optionElement.setAttribute('value', version);
                    optionElement.textContent = version;
                    versionSelectClone.append(optionElement);
                });

                versionSelectContainer.classList.remove('is-disabled');
            } else {
                versionSelectContainer.classList.add('is-disabled');
            }

            return versionSelectClone;
        };
    
        const reinitializeVersionSelect = productName => {
            const versionSelectClone = createVersionSelectClone(productName);

            versionSelectContainer.querySelector('.js-Dropdown').remove();
            versionSelectContainer.querySelector('select').remove();

            versionSelectContainer.append(versionSelectClone);

            new InitCustomSelect({
                customSelect: versionSelectClone
            });
        };

        getProductVersions(requestURL);

        productSelect.addEventListener('change', () => {
            reinitializeVersionSelect(productSelect.value);
        });
    }
}
