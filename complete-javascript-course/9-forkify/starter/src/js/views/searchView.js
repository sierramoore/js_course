import {elements} from './base';

export const getInput = () => elements.searchInput.value; //explicit return

export const clearInput = () => {
    elements.searchInput.value = '';
};//wrap in braces to not return

export const clearResults = () => {
    elements.searchResList.innerHTML = ''; // clear results list
    elements.searchResPages.innerHTML = ''; // clear buttons
};


/* 'Pasta with tomato and spinach'
* acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
* acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'width']
* acc: 9/ acc + cur.length = 15 / newTitle = ['Pasta', 'width', 'tomato']
* acc: 15/ acc + cur.length = 18 / newTitle = ['Pasta', 'width', 'tomato'] ->not pushed 'and' bc limit is 17
* */
// reduce accumulator is like a for loop with a sum variable outside
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];

    if(title.length > limit) {
        // spliting at a space means seperating at each word
        title.split(' ').reduce((totalLength, cur) => {
            if(totalLength + cur.length <= limit) {
                newTitle.push(cur);
            }
            return totalLength + cur.length;
        }, 0);

        //return result with ...
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `<li>
                <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="img/test-1.jpg" alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};
// type: prev or next
const createButton = (page, type) => {
    return(
        // increment or decrement page number
        `<button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
          <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
          <svg class="search__icon">
              <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
           </svg>
    </button>`
    )

};
// implicit return if no block {}

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if(page === 1 && pages > 1) {
        //only next btn
        button = createButton(page, 'next');
    } else if (page < pages) {
        // both next and prev btns
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    }
    else if (page === pages && pages > 1) {
        //only prev btn
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultPerPage = 10) =>{
    /*
    * page 1 will be (1 - 1) * 10
    * page 2 will be (2 - 1) * 10 -> showing second set of 10 items
    * and so on..
    * */
    const start = (page - 1) * resultPerPage;
    const end = page * resultPerPage;

    recipes.slice(start, end).forEach(renderRecipe); //recipes is arr of all recipes. looping over each and rendering in side panel

    //render btns
    renderButtons(page, recipes.length, resultPerPage);
};

