import {elements} from './base';

export const getInput = () => elements.searchInput.value; //explicit return

export const clearInput = () => {
    elements.searchInput.value = '';
};//wrap in braces to not return

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
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

export const renderResults = (recipes) =>{
    recipes.forEach(renderRecipe);
};