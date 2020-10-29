import InitCustomSelect from './custom-select';
import Inputmask from 'inputmask';
import Axios from 'axios';
import * as $ from 'jquery';
import * as $Validation from 'jquery-validation';

export default class InitForm {
    constructor(options) {
        this.form = options.form;

        this.action = options.action;
        this.method = options.method;
        this.button = options.button;
        this.inputs = options.inputs;
        this.data = options.data;
        this.validationRules = {};
        this.response = null;

        this.BeforeRequest = options.BeforeRequest;
        this.SuccessCallback = options.SuccessCallback;
        this.ErrorCallback = options.ErrorCallback;
        this.CaptchaErrorCallback = options.CaptchaErrorCallback;

        this.Init();
    }

    get CreateAction() {
        let action;

        if (this.action){
            action = this.action;
        } else {
            action = this.form.getAttribute('action');
        }

        return action;
    }

    get CreateMethod() {
        let method;

        if (this.method){
            method = this.method;
        } else {
            method = this.form.getAttribute('method');
        }

        return method;
    }

    get CreateButton() {
        let button;

        if (this.button){
            button = this.button;
        } else if (this.button !== false){
            button = this.form.querySelector('button[type=submit]');
        } else {
            button = null;
        }

        return button;
    }

    get CreateData() {
        let Data;

        if (this.data){
            Data = this.data;
        } else {
            Data = new FormData(this.form);
        }

        return Data;
    }

    get GetResponse() {
        return this.response;
    }

    Init() {
        this.InitEmailInputs();
        this.InitPhoneInputs();
        this.InitCodeInputs();
        this.InitNumberInputs();
        this.InitCustomSelects();
        this.InitFileInputs();

        $(this.form).validate({
            rules: this.validationRules,
            submitHandler: () => {
                this.CreateRequest();
            }
        });
    }

    InitEmailInputs() {
        const emailInputs = this.form.querySelectorAll('.js-email-input input');

        if (emailInputs.length) {
            emailInputs.forEach(emailInput => {
                const methodName = `validate-${emailInput.name}`;

                $.validator.addMethod(methodName, function(value, element) {
                    return this.optional(element) || /^([a-z0-9_\.-]+)@([a-z\.-]+)\.([a-z\.]{2,6})$/.test(emailInput.value);
                });

                this.validationRules[emailInput.name] = {
                    [methodName]: true
                };
            });
        }
    }

    InitPhoneInputs() {
        const phoneInputs = this.form.querySelectorAll('.js-phone-input input');

        if (phoneInputs.length) {
            phoneInputs.forEach(phoneInput => {
                this.InitNumericInput(phoneInput);
            });
        }
    }

    InitCodeInputs() {
        const codeInputs = this.form.querySelectorAll('.js-code-input input');

        if (codeInputs.length) {
            codeInputs.forEach(codeInput => {
                this.InitNumericInput(codeInput);
            });
        }
    }

    InitNumericInput(input) {
        let pattern = input.getAttribute('data-pattern');

        Inputmask({
            regex: pattern
        }).mask(input);

        const methodName = `validate-${input.name}`;

        $.validator.addMethod(methodName, function(value, element) {
            pattern = new RegExp(pattern);
            return this.optional(element) || pattern.test(input.value);
        });

        this.validationRules[input.name] = {
            [methodName]: true
        };
    }

    InitNumberInputs() {
        const numberInputs = this.form.querySelectorAll('.js-number-input input');

        if (numberInputs.length) {
            numberInputs.forEach(numberInput => {
                Inputmask({ 
                    regex: '\\d*',
                    showMaskOnHover: false,
                }).mask(numberInput);
            });
        }
    }

    InitCustomSelects() {
        const customSelects = this.form.querySelectorAll('.js-custom-select select');

        if (customSelects.length) {
            customSelects.forEach(customSelect => {
                new InitCustomSelect({
                    customSelect: customSelect
                });
            }); 
        }
    }

    ClearCustomSelects() {
        const selectContainers = this.form.querySelectorAll('.js-custom-select');
        const productSelects = this.form.querySelectorAll('.js-questionnaire-product-select');
        const versionSelect = this.form.querySelector('.js-version-select');

        if (selectContainers.length) {
            selectContainers.forEach(selectContainer => {
                const dropdownButton = selectContainer.querySelector('.js-Dropdown-title');
                const option = selectContainer.querySelector('option');

                dropdownButton.textContent = option.textContent;

                dropdownButton.removeAttribute('style');

                const dropdownOptions = selectContainer.querySelectorAll('.js-Dropdown-list li');
                dropdownOptions.forEach(option => {
                    option.classList.remove('is-selected');
                });
                dropdownOptions[0].classList.add('is-selected');
            });
        }

        if (productSelects.length > 1) {
            productSelects.forEach((select, index) => {
                if (index !== 0) {
                    select.remove();
                }
            });

            const options = productSelects[0].querySelectorAll('li');
            options.forEach(option => {
                if (option.classList.contains('is-disabled')) {
                    option.classList.remove('is-disabled');
                }
            });
        }

        if (versionSelect) {
            const dropdownOptions = versionSelect.querySelectorAll('.js-Dropdown-list li');

            dropdownOptions.forEach((option, index) => {
                if (index !== 0) {
                    option.remove();
                }
            });
            
            versionSelect.classList.add('is-disabled');
        }
    }

    InitFileInputs() {
        const fileInputContainers = this.form.querySelectorAll('.js-file-input .file-input__item');

        if (fileInputContainers.length) {
            const IMAGE_FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'webp'];
            const VIDEO_FILE_TYPES = ['avi', 'mp4', 'm4v', 'mov', 'mpg', 'mpeg', 'wmv', 'mkv'];
            const PDF_FILE_TYPE = ['pdf'];

            fileInputContainers.forEach(fileInputContainer => {
                const fileInput = fileInputContainer.querySelector('input');
                const removeButton = fileInputContainer.querySelector('button');

                fileInput.addEventListener('change', () => {
                    const files = Array.from(fileInput.files);

                    if (checkTypeMatches(files, IMAGE_FILE_TYPES)) {
                        addImagePrewiev(fileInputContainer, files);
                    } else if (checkTypeMatches(files, VIDEO_FILE_TYPES)) {
                        addVideoIcon(fileInputContainer);
                    } else if (checkTypeMatches(files, PDF_FILE_TYPE)) {
                        addPdfIcon(fileInputContainer);
                    } else {
                        fileInput.value = '';
                    }
                });

                removeButton.addEventListener('click', () => {
                    this.RemoveSelectedFile(fileInputContainer);
                });
            });

            const checkTypeMatches = (files, fileTypes) => {
                const fileNames = files.map(file => {
                    return file.name.toLowerCase();
                });
    
                return fileNames.every(name => {
                    return fileTypes.some(type => {
                        return name.endsWith(type);
                    });
                });
            };

            const addImagePrewiev = (fileInputContainer, files) => {
                const reader = new FileReader();
                const imageElement = document.createElement('img');

                fileInputContainer.append(imageElement);
                fileInputContainer.classList.add('is-selected');

                reader.readAsDataURL(files[0]);
                reader.addEventListener('load', () => {
                    imageElement.src = reader.result;
                });
            };

            const addVideoIcon = fileInputContainer => {
                const videoIcon = `
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 0C9.84972 0 0 9.84972 0 22C0 34.1502 9.84972 43.9999 22 43.9999C34.1502 43.9999 43.9999 34.1502 43.9999 22C43.987 9.85515 34.1448 0.0129827 22 0ZM22 40.8571C11.5854 40.8571 3.14282 32.4145 3.14282 22C3.14282 11.5854 11.5854 3.14282 22 3.14282C32.4145 3.14282 40.8571 11.5854 40.8571 22C40.8458 32.4099 32.4099 40.8458 22 40.8571Z" fill="white"/>
                        <path d="M31.265 21.2989C31.1127 20.9934 30.8651 20.7457 30.5595 20.5934L17.9881 14.3077C17.2118 13.9198 16.268 14.2346 15.88 15.0109C15.7709 15.2293 15.7141 15.47 15.7142 15.7141V28.2856C15.7139 29.1535 16.417 29.8573 17.285 29.8578C17.529 29.8579 17.7698 29.8012 17.9881 29.6921L30.5595 23.4063C31.3363 23.0192 31.6522 22.0756 31.265 21.2989ZM18.8572 25.743V18.2567L26.3435 21.9999L18.8572 25.743Z" fill="white"/>
                    </svg>
                `;
                fileInputContainer.insertAdjacentHTML('beforeend', videoIcon);
                fileInputContainer.classList.add('is-selected');
            };

            const addPdfIcon = fileInputContainer => {
                const pdfIcon = `
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.9757 19.5938H9.00001C8.62632 19.5938 8.26791 19.7425 8.00401 20.0072C7.7401 20.2718 7.59254 20.6307 7.59376 21.0045L7.61448 31.6868C7.61448 32.4635 8.2441 33.0931 9.02073 33.0931C9.79735 33.0931 10.427 32.4635 10.427 31.6868V28.4434C11.0019 28.4405 11.6162 28.4379 11.9757 28.4379C14.4466 28.4379 16.4569 26.4542 16.4569 24.0158C16.4569 21.5775 14.4466 19.5938 11.9757 19.5938ZM11.9757 25.6254C11.613 25.6254 10.9965 25.628 10.4193 25.631C10.4163 25.0323 10.4137 24.3876 10.4137 24.0158C10.4137 23.6978 10.4121 23.032 10.4104 22.4062H11.9756C12.8801 22.4062 13.6443 23.1433 13.6443 24.0158C13.6443 24.8884 12.8802 25.6254 11.9757 25.6254Z" fill="white"/>
                        <path d="M23.9372 19.5938H21C20.6266 19.5938 20.2685 19.7422 20.0047 20.0065C19.7408 20.2708 19.593 20.6292 19.5938 21.0026C19.5938 21.0027 19.6147 31.3382 19.6148 31.3757C19.6162 31.7487 19.7656 32.1059 20.0303 32.3687C20.2939 32.6302 20.6499 32.7769 21.021 32.7769H21.0263C21.1151 32.7765 23.2102 32.7685 24.0477 32.7539C27.2253 32.6984 29.5315 29.9359 29.5315 26.1853C29.5314 22.2427 27.2833 19.5938 23.9372 19.5938ZM23.9986 29.9419C23.6344 29.9482 23.0078 29.9534 22.4226 29.9572C22.4186 28.7357 22.4109 23.6756 22.4088 22.4062H23.9372C26.5184 22.4062 26.7189 25.2988 26.7189 26.1854C26.7189 28.0315 25.8778 29.9091 23.9986 29.9419Z" fill="white"/>
                        <path d="M38.7997 22.2979C39.5763 22.2979 40.2059 21.6682 40.2059 20.8916C40.2059 20.115 39.5763 19.4854 38.7997 19.4854H34.5C33.7234 19.4854 33.0938 20.115 33.0938 20.8916V31.5002C33.0938 32.2768 33.7234 32.9064 34.5 32.9064C35.2766 32.9064 35.9062 32.2768 35.9062 31.5002V27.5017H38.4581C39.2347 27.5017 39.8644 26.8721 39.8644 26.0955C39.8644 25.3189 39.2347 24.6892 38.4581 24.6892H35.9062V22.2979H38.7997Z" fill="white"/>
                        <path d="M42.9375 13.5938H41.9062V13.1926C41.9062 11.3849 41.2213 9.66694 39.9776 8.355L34.1365 2.19366C32.8148 0.799594 30.955 0 29.0339 0H10.3125C7.98628 0 6.09375 1.89253 6.09375 4.21875V13.5938H5.0625C2.73628 13.5938 0.84375 15.4863 0.84375 17.8125V34.6875C0.84375 37.0137 2.73628 38.9062 5.0625 38.9062H6.09375V43.7812C6.09375 46.1075 7.98628 48 10.3125 48H37.6875C40.0137 48 41.9062 46.1075 41.9062 43.7812V38.9062H42.9375C45.2637 38.9062 47.1562 37.0137 47.1562 34.6875V17.8125C47.1562 15.4863 45.2637 13.5938 42.9375 13.5938ZM8.90625 4.21875C8.90625 3.44334 9.53709 2.8125 10.3125 2.8125H29.0339C30.1866 2.8125 31.3025 3.29222 32.0955 4.12875L37.9366 10.2901C38.6828 11.0772 39.0938 12.108 39.0938 13.1926V13.5938H8.90625V4.21875ZM39.0938 43.7812C39.0938 44.5567 38.4629 45.1875 37.6875 45.1875H10.3125C9.53709 45.1875 8.90625 44.5567 8.90625 43.7812V38.9062H39.0938V43.7812ZM44.3438 34.6875C44.3438 35.4629 43.7129 36.0938 42.9375 36.0938H5.0625C4.28709 36.0938 3.65625 35.4629 3.65625 34.6875V17.8125C3.65625 17.0371 4.28709 16.4062 5.0625 16.4062H42.9375C43.7129 16.4062 44.3438 17.0371 44.3438 17.8125V34.6875Z" fill="white"/>
                    </svg>
                `;
                fileInputContainer.insertAdjacentHTML('beforeend', pdfIcon);
                fileInputContainer.classList.add('is-selected');
            }
        }
    }

    ClearFileInputs() {
        const fileInputContainers = this.form.querySelectorAll('.js-file-input .file-input__item');

        if (fileInputContainers.length) {
            fileInputContainers.forEach(fileInputContainer => {
                this.RemoveSelectedFile(fileInputContainer);
            });
        }
    }

    RemoveSelectedFile(fileInputContainer) {
        const image = fileInputContainer.querySelector('img');
        const icon = fileInputContainer.querySelector('svg');

        if (image) {
            image.remove();
        }

        if (icon) {
            icon.remove();
        }
        
        fileInputContainer.classList.remove('is-selected');
        fileInputContainer.querySelector('input').value = '';
    }

    CreateRequest() {
        if (this.BeforeRequest){
            this.BeforeRequest();
        }

        const method = this.CreateMethod.toLowerCase();
        const RequestOptions = {
            url: this.CreateAction,
            method: this.CreateMethod,
            headers: {
                'x-requested-with': 'XMLHttpRequest'
            },
        };

        if (method === 'post'){
            RequestOptions['data'] = this.CreateData;
        }

        if (method === 'get'){
            RequestOptions['params'] = this.data;
        }

        Axios(RequestOptions).then(response => {
            this.response = response.data;

            if (this.response.RESULT === 'added' && this.SuccessCallback){
                this.SuccessCallback();
            } else if (this.response.RESULT === 'error' && this.ErrorCallback) {
                this.ErrorCallback();

                if ('UNCORRECT_CAPTCHA' in this.response.ERRORS && this.CaptchaErrorCallback) {
                    this.CaptchaErrorCallback();
                }
            }

            this.form.reset();
            this.ClearFileInputs();
            this.ClearCustomSelects();
            
        }).catch(error => {
            if (this.ErrorCallback){
                this.ErrorCallback();
            }
        }).finally(() => {
            
        });
    }
}