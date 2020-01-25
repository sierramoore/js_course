// module pattern returns an obj containing all the functions that we want to be public
// if try to log budgetController.x in the console it will be undefined bc it is private scoped
// BUDGET CONTROLLER ///////
const budgetController = (function () {
    // this data is private

    // a closure -has access to outer functions and variables
    return {
        // this data will be public

    }
})(); //iief



// UI CONTROLLER ///////
const UIController = (function() {

    const DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'
    };

    return {
        getInput: function () {
            return {
                 type: document.querySelector(DOMstrings.inputType).value, // will be expense or earn
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        // pass them down to controller
        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();


// connecting above 2 moduels
// CONNECTING UI AND BUDGET CONTROLLER ///////
const controller = (function(budgetCtrl, UICtrl) {

    const DOM = UICtrl.getDOMstrings();

    const ctrlAddItem = function(){
        // 1. get input data
        const input = UICtrl.getInput();
        console.log(input)

        // 2. add the item to the budget controller

        // 3. add the new item to the UI

        // 4. calculate the budget

        // 5. display the budget on UI
    };

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
    
    // on enter key press do same as click event
    document.addEventListener('keypress', function (event) {
        if(event.keycode === 13) {
            ctrlAddItem();
        }
    })

})(budgetController, UIController);