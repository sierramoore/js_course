export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesField: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const elementStrings = {
    loader: 'loader',
};

//resueable w parent obj depending on html section
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw">
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader); //attach to parent
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${elementStrings.loader}`); //have to select here bc doesnt exist yet in state

    if (loader) loader.parentElement.removeChild(loader); //can only remove child elems so go up to parent first
};