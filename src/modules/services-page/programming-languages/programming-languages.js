const moreButton = document.querySelector('.js-programming-languages-button');

if (moreButton) {
    const container = document.querySelector('.js-programming-languages-container');

    moreButton.addEventListener('click', () => {
        container.style.maxHeight = `${container.scrollHeight}px`;
        moreButton.classList.add('is-hidden');
    });
}