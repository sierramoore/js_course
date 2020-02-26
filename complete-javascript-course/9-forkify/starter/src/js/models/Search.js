//default export -> for one thing
// export default 'I am an exported string';

//in future recipie file
//const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);

import axios from 'axios';


export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults(query) {
        try {
            //ajax call returns json obj
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
           this.result = res.data.recipes;

        } catch(error){
            console.log(error)
        }
    }
}

