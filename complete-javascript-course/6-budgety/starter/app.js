// module pattern returns an obj containing all the functions that we want to be public
// if try to log budgetController.x in the console it will be undefined bc it is private scoped
// BUDGET CONTROLLER ///////
const budgetController = (function () {
    // this data is private

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    // calculator
    Expense.prototype.calcPercentage = function(totalIncome) {
        // console.log(totalIncome);
        // console.log(this.percentage);
        // this.percentage = Math.round(this.value / totalIncome) * 100;
        // console.log(this.percentage);
        if (totalIncome > 0) {
            this.percentage = Math.round(this.value / totalIncome) * 100;
        } else {
            this.percentage = -1;
        }
        // prob it turns to 0
    };
    // getter
    Expense.prototype.getPercentage = function () {
        return this.percentage;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const calculateTotal = function (type){
        let sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        // store totals
        data.totals[type] = sum;
    };

    //global data sctructure
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1 // -1 not 0 so it doesnt exist
    };

    // a closure -has access to outer functions and variables
    return {
        // this data will be public
        addItem: function (type, des, val) { // type determines inc or exp
            let newItem, ID;

            // ID last ID += 1 (in case delete item)
            // if for case when no items at all
            //select which array from allItems w [type] then after which array number
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on 'inc' or 'exp'
            if(type === 'exp') { //refering to above data obj & value in html
                newItem = new Expense(ID, des, val);

            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //push it into our data structure
            data.allItems[type].push(newItem);

            //return new element for other controllers
            return newItem;
        },

        deleteItem: function(type, id){
            let ids, index;

            // if our array is like [2, 5, 6, 9] -> we cant say data.allItems[type][id].
            // creates a new array of all the existing items and reorders them
            ids = data.allItems[type].map(function(current){
                return current.id; // has id, description, value props
            });

            index = ids.indexOf(id); // now index correlates to the correct item index in the array


            if(index !== -1) { // if index exists
                data.allItems[type].splice(index, 1); //delete said item
            }
        },

        calculateBudget: function () {
            // calc total inc and exp
            calculateTotal('exp');
            calculateTotal('inc');

            // calc budget: inc - exp (how much money leftover)
            data.budget = data.totals.inc - data.totals.exp;


            // calc percentage of inc that is spent
            // if fixes for when only have exp cant divide by 0 (makes weird infinity number)
            if(data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc) * 100;
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function() {

            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc); //filling totalInc param in function
            });
        },

        getPercentages: function (){
            const allPercentages = data.allItems.exp.map(function (cur) {
                return cur.getPercentage()
            });
            return allPercentages; //an array of all percentages
        },

        //only retrieve data
        // this is where we create the obj that is going to be returned to the app controller which then passes it to the displayBudget method
        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },
        testing: function () {
            console.log(data);
        }
    }
})(); //iief



// UI CONTROLLER ///////
const UIController = (function() {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value', // grand total
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container', // container of all inc and exp list
        expensesPercLabel: '.item__percentage',
    };

    return {
        getInput: function () {
            return {
                // will be exp or inc
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }
        },
        addListItem: function(obj, type) {
            let html, newHtml, element;
            // create html string w placeholder text (important to use single quotes)
            if(type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html =  '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            //replace the placeholder text w some actual data
            newHtml = html.replace('%id%', obj.id);// first what to replace, then with what and we want the id number
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // insert html into dom
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

            // element is set to either inc or exp html list
            //beforeend - where we want to place it in html and 2nd what we want to be inserted

        },

        deleteListItem: function (selectorID) {
            //cant remove el in js need to get parent first then remove child
            const el = document.getElementById(selectorID); //grab parent
            el.parentNode.removeChild(el); //then remove child
        },

        clearFields: function() {
            let fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue); // returns a list

            //slice will create a copy of the list and return an array
            // will trick slice method to thinking fields is an array (fields.slice() will not work)
            fieldsArr = Array.prototype.slice.call(fields);
            // now can loop and clear input fields from both des and val
            fieldsArr.forEach(function (curValue, i, arr) {
                curValue.value = ""; // clears with empty string
            });

            //reset type bar to description instead of value
            fieldsArr[0].focus();
        },

        // need to get obj data to display it (from getBudget)
        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

            //control for -1 percentage case
            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentageLabel + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '--';
            }
        },

        displayPercentages: function (percentages) { //param will b an array of all %
            const fields = document.querySelectorAll(DOMstrings.expensesPercLabel); // fields holds node list

            // make reusable for other nodes --similar to forEach for arrays but for nodelist
            const nodeListForEach = function(nodeList, callback) {
                for(let i=0; i < nodeList.length; i++) { //node list doesnt have methods but has length prop
                    callback(nodeList[i], i); //declaring this callback to have 2 future arguments. will expect to be passed 1-element and 2-index of it
                }
            };

            nodeListForEach(fields, function(current, index) { // node list and looper
                if(percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = "--"
                }
            })
        },

        formatNumber: function(num, type){
            let numSplit, int, dec, typeOfExp;
            /*
            + or - before number
            * exactly 2 decimal points
            comma separating thousands
            * */

            num = Math.abs(num);
            num = num.toFixed(2);

            numSplit = num.split('.');

            int = numSplit[0];
            if (int.length > 3) {
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
            }

            dec = numSplit[1];

            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

        },

        // pass them down to controller
        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();


// GLOBAL APP CONTROLLER ///////
const controller = (function(budgetCtrl, UICtrl) {

    const setupEventListeners = function(){
        const DOM = UICtrl.getDOMstrings();

        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

        // on enter key press do same as click event
        document.addEventListener('keypress', function (event) {
            if(event.keycode === 13) {
                ctrlAddItem();
            }
        });

        // add event to the container instead of each inc or exp element itself
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    };

    const updateBudget = function () {

        //1. calc budget
        budgetCtrl.calculateBudget();

        //2. return the budget
        const budget= budgetCtrl.getBudget();

        // 3 display budget in ui
        UICtrl.displayBudget(budget);
    };

    const updatePercentages = function () {

        // 1 calc percentages
        budgetCtrl.calculatePercentages();

        // 2 read percentages from budget controller
        const percentages = budgetCtrl.getPercentages();

        // 3 update ui with new percentages
        console.log(percentages);
        UICtrl.displayPercentages(percentages);

    };

    //event listener above to run this on click
    const ctrlAddItem = function(){
        let input, newItem;

        // 1. get input data
        input = UICtrl.getInput(); // has obj of type, description, values

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. add the new item to the UI
            UICtrl.addListItem(newItem, input.type); //obj, type

            // 4. clear the input fields
            UICtrl.clearFields();

            // 5. calc and update budget
            updateBudget();

            // 6. calc and update percentages
            updatePercentages();
        }
    };

    //event listener above to run this on click
    const ctrlDeleteItem = function (event) {
        let itemID, splitID, type, ID;

        // instead of selecting just the x to remove select the whole item to remove
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) { //if exists id 'inc-0' or 'exp-0'..
            // js can converts primitive to obj to use methods on them
            splitID = itemID.split('-'); // returns array from specified separator (ex: ['inc', '0'])
            type = splitID[0];
            ID = parseInt(splitID[1]); // convert id from string to number

            // 1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. delete item from UI
            UICtrl.deleteListItem(itemID);

            // 3. update and show new budget
            updateBudget();

            // 4. calc and update percentages
            updatePercentages();
        }
    };

    //pulic init need now bc organized data into functions and not iief
    return {
        init: function() {
            console.log('app is running');
            //  set all values to 0 at start
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init(); // only global call. w/o this nothing will start