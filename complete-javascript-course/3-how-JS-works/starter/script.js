





///////////////////////////////////////
// Lecture: Hoisting


//can call function declarations before declaring them in code
calculateAge(1994);  // calling before the function declaration below

function calculateAge(year) { // hoisting only works for function declarations
    console.log(2020 - year);
}

// retirementYearsLeft(1994); -> doesnt work for function expressions

// function expression
let retirementYearsLeft = function (year) {
    console.log(65 - (2020 - year));
};


// hoisting also works for variables //

// console.log(age); // get undefined bc js knows there is an age variable
let age = 25;
console.log(age);

function foo() {
    let age = 65;
    console.log(age);
}
foo(); // age = 65 bc function (or execution) context
console.log(age); // age = 25 bc global context

///////////////////////////////////////
// Lecture: Scoping

// scope chain only goes upwards

// First scoping example


var a = 'Hello!'; //global
first();

function first() {
    // any variables here are not visible to parent scope (or global)
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c); // lexical scope - has access to scope of parent function
        // js engine wont find b here in current scope so it goes up to find it in the first() function
        // example of scope chain going up
    }
}

// each  execution context obj [global, first(), second()] will get exact scope chain which is all the variable objs that the execution context has access to




// Example to show the differece between execution stack and scope chain

// Execution stack is the ORDER in which the functions are CALLED
// Scope chain is the ORDER in which the functions are WRITTEN in the code



/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d); // doesnt have access to b or c variables
}
*/



///////////////////////////////////////
// Lecture: The this keyword









