const searchForm = document.querySelector('.support-search form');

if (searchForm) {
    const searchInput = searchForm.querySelector('input');

    searchForm.addEventListener('submit', evt => {
        evt.preventDefault();

        const url = new URL(`${searchForm.action}?a=search&q=${searchInput.value}`).href;
        window.location.assign(url);
    });
}