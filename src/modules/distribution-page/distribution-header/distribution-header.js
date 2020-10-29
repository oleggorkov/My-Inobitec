const button = document.querySelector('.js-distribution-header-btn');

if (button) {
    button.addEventListener('click', evt => {
        evt.preventDefault();
    
        const blockID = button.getAttribute('href').substring(1);
        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth'
        });
    });
}