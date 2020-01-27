// module pattern returns an obj containing all the functions that we want to be public
// if try to log budgetController.x in the console it will be undefined bc it is private scoped
// BUDGET CONTROLLER ///////
const budgetController = (function () {
    // this data is private

    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    // a closure -has access to outer functions and variables
    return {
        // this data will be public
        addItem: function (type, des, val) { // type determines inc or exp
            console.log(data)
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
        expensesContainer: '.expenses__list'
    };

    return {
        getInput: function () {
            return {
                // will be exp or inc
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        addListItem: function(obj, type) {
            let html, newHtml, element;
            // create html string w placeholder text (important to use single quotes)
            if(type === 'inc') {
                element = DOMstrings.incomeContainer;

                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;

                html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
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
        })
    };

    const ctrlAddItem = function(){
        let input, newItem;

        // 1. get input data
        input = UICtrl.getInput(); // has obj of type, description, values

        // 2. add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. add the new item to the UI
        UICtrl.addListItem(newItem, input.type); //obj, type

        // 4. calculate the budget

        // 5. display the budget on UI
    };

    //pulic init need now bc organized data into functions and not iief
    return {
        init: function() {
            console.log('app is running');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init(); // only global call. w/o this nothing will start