import CustomSelect from 'vanilla-js-dropdown';

export default class InitCustomSelect {
    constructor(options) {
        this.customSelect = options.customSelect;
        this.Init();
    }

    Init() {
        new CustomSelect({
            elem: this.customSelect
        });

        const selectContainer = this.customSelect.parentElement;
        const dropdownButton = selectContainer.querySelector('.js-Dropdown-title');
        const dropdownList = selectContainer.querySelector('.js-Dropdown-list');
    
        dropdownButton.addEventListener('click', () => {
            if (!dropdownList.classList.contains('is-open')) {
                selectContainer.classList.add('is-open');
            } else {
                selectContainer.classList.remove('is-open');
            }
        });
    
        this.customSelect.addEventListener('change', () => {
            dropdownButton.style.color = '#000000';
        });
    
        window.addEventListener('click', evt => {
            if (selectContainer.classList.contains('is-open') && !evt.target.matches('.js-Dropdown-title') && !evt.target.matches('.js-Dropdown-list')) {
                selectContainer.classList.remove('is-open');
            }
        });

        const setCustomSelectValidation = () => {
            const form = this.customSelect.closest('form');

            form.addEventListener('submit', () => {
                const isEmpty = this.customSelect.value === 'Выберите из списка' || this.customSelect.value === 'Select from the list';

                if (isEmpty && this.customSelect.parentElement && !this.customSelect.parentElement.classList.contains('has-error')) {
                    showError();

                    this.customSelect.addEventListener('change', onCustomSelectChange);
                }
            });
        }

        const onCustomSelectChange = () => {
            hideError();
        };

        const showError = () => {
            const selectContainer = this.customSelect.parentElement;
            selectContainer.classList.add('has-error');

            const errorMessage = this.customSelect.dataset.msg;

            const errorMessageElement = document.createElement('label');
            errorMessageElement.textContent = errorMessage;
            errorMessageElement.classList.add('has-error');

            selectContainer.append(errorMessageElement);
        };

        const hideError = () => {
            const selectContainer = this.customSelect.parentElement;

            selectContainer.classList.remove('has-error');
            selectContainer.querySelector('label.has-error').remove();

            this.customSelect.removeEventListener('change', onCustomSelectChange);
        };

        if (this.customSelect.hasAttribute('required')) {
            setCustomSelectValidation();
        }

        if (this.customSelect.parentElement.classList.contains('has-error')) {
            this.customSelect.addEventListener('change', onCustomSelectChange);
        }
    }
}