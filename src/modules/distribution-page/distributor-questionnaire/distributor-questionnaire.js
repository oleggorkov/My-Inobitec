import InitForm from '../../forms/forms';
import InitCustomSelect from '../../forms/custom-select';
import CustomSelect from 'vanilla-js-dropdown';
import * as $ from 'jquery';
window.jQuery = $;
require('@fancyapps/fancybox/dist/jquery.fancybox');
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

const form = document.querySelector('.distributor-questionnaire form');

if (form) {
    const addSelectButton = form.querySelector('.js-add-select-button');
    const productSelect = form.querySelector('.js-questionnaire-product-select');

    if (addSelectButton) {
        const productSelectTemplate = productSelect.cloneNode(true);
        const productsOptionsNumber = productSelect.querySelectorAll('option[value]').length;
        let productSelectsNumber = 1;
        
        addSelectButton.addEventListener('click', (evt) => {
            evt.stopPropagation();
            
            addProductSelect();

            productSelectsNumber++;

            if (productSelectsNumber === productsOptionsNumber) {
                addSelectButton.remove();
            }
        });

        const addProductSelect = () => {
            const productSelectClone = productSelectTemplate.cloneNode(true);
            addSelectButton.before(productSelectClone);

            new InitCustomSelect({
                customSelect: productSelectClone.querySelector('select')
            });

            syncSelectsOptions(productSelectClone);
        };
    }

    new InitForm({
        form: form,
        SuccessCallback: function () {
            const successPopup = document.querySelector('#distribution-success-popup');

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

    const disableSelectedOptionsInNewSelect = select => {
        const selectedOptions = form.querySelectorAll('li.is-selected:not(:first-child)');
        
        if (selectedOptions.length) {
            selectedOptions.forEach(selectedOption => {
                const newSelectOption = select.querySelector(`li[data-value="${selectedOption.dataset.value}"]`);
                newSelectOption.classList.add('is-disabled');
            });
        }
    }

    const disableSelectedOptionsInAllSelects = option => {
        const selectedOptions = form.querySelectorAll(`li[data-value="${option.dataset.value}"]`);

        selectedOptions.forEach(selectedOption => {
            if (selectedOption !== option) {
                selectedOption.classList.add('is-disabled');
            }
        });
    }

    const enableUnselectedOptionsInAllSelects = option => {
        const unselectedOptionValue = option.parentElement.querySelector('.is-selected').dataset.value;
        const unselectedOptions = form.querySelectorAll(`li[data-value="${unselectedOptionValue}"]`);

        unselectedOptions.forEach(unselectedOption => {
            if (unselectedOption !== option) {
                unselectedOption.classList.remove('is-disabled');
            }
        });
    }

    const syncSelectsOptions = select => {
        disableSelectedOptionsInNewSelect(select);

        const options = select.querySelectorAll('li');

        options.forEach(option => {
            option.addEventListener('click', () => {
                if (!option.classList.contains('is-selected')) {
                    disableSelectedOptionsInAllSelects(option);
                    enableUnselectedOptionsInAllSelects(option);
                }
            });
        });
    };

    syncSelectsOptions(productSelect);
}
