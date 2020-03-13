//global controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';


//want ALL of our current state data in one obj
/* global state of app
* search obj
* current recipie obj
* shopping list obj
* liked recipies
* */
const state= {};

//async functions return promises
const controlSearch = async () => {
    // 1 get seach input from view
    const query = searchView.getInput();

    if (query) {
        // 2 new seach obj and add to state
        state.search = new Search(query); //declaring a variable search in state obj which is a new instance of search class

        // 3 prepare ui for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);// arg is html parent container

        try {
            // 4 search for recipes
            await state.search.getResults(); // have access to anything inside search obj

            // 5 render results on ui
            clearLoader();
            searchView.renderResults(state.search.result)
        } catch (error){
            alert('something went wrong');
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    controlSearch();
});

// use event delegation when you want to attach something like an event listener to something that hasnt come into our page yet. attach event to a common ancenstor
elements.searchRes.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline'); // closest find closest element. finds itself or matching ancestor. in this case, span, a, icon will all be selected as button

    if(btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); //added data-goto attr in btn used for page number. radix 10 is 0-9
        searchView.clearResults(); // clear results to not add to current page
        searchView.renderResults(state.search.result, goToPage); // show next page of results
        console.log(goToPage);
    }
});


/////// RECIPE CONTROLLER  /////////
const controlRecipe = async () => {
    const id = window.location.hash.replace('#', ''); //get hash(.location is entire url). removing hash from id
    console.log(id);

    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // hightlight selected search item
        // if something was searched...
        if (state.search) searchView.highlightSelected(id);

        // create new recipe obj
        state.recipe = new Recipe(id);


        try {
            // get recipe data
            await state.recipe.getRecipe();
            // parse ingredients
            state.recipe.parseIngredients();

            // calc servings
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('error processing recipe');
        }
    }
};

// each click of a item changes the hash in url (hash contains id)
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// to add multiple events with same callback
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// handling recipe btn clicks
// + or - servings
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')){ // * = any child of it
        // decrement btn
        if(state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increment btn
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
});
