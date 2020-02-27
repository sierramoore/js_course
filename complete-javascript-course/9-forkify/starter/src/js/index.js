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


