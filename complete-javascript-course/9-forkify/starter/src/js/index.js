//global controller
import Search from './models/Search';
import * as searchView from './views/searchView';
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

        // 4 search for recipes
        await state.search.getResults(); // have access to anything inside search obj

        // 5 render results on ui
        clearLoader();
        searchView.renderResults(state.search.result)
    }
};

elements.searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    controlSearch();
});


