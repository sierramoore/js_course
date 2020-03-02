import axios from 'axios';

// hash = #hashandwhatevercomesnext

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
            console.log(res);
        } catch (error) {
            console.log(error);
            alert('something went wrong >.<')
        }
    }

    calcTime() {
        // assuming we need 15min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);

        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitShort = ['tbsp', 'tbsp','oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // 1 uniform units (loops over all ingredients and converts to abreviated)
            let ingredient = el.toLocaleLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // 2 remove parentheses
            // regEx regular expression start and end with /\ used to match string/letter patterns
            ingredient = ingredient.replace(/ *\([^]*\) */g, " ");

            // 3 parse ingredients into count, unit, and ingredients
            // is there a unit in the ingredient li? if so where?
            const arrIng = ingredient.split(' '); //seperate words
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2)); // is elem in arr? returns index if true

            let objIng;
            if (unitIndex > -1) {
                //if unitShort word isnt there

            } else if (parseInt(arrIng[0],10)) { //if (word in ingredient) can be converted to a num it will return number else go below
                // there is NO unit but 1st elem is a number
                objIng = {
                    count: parseInt(arrIng[0],10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ') //entire arr execpt 1st elem
                }

            } else if(unitIndex === -1){
                // there is NO unit and NO number in 1st position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient //implicitly set to ingredient itself
                }
            }

            return ingredient;
        });

        this.ingredients = newIngredients;
    }
}