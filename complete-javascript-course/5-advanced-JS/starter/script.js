// function constructor

// let john = {
//     name: 'john',
//     yearOfBirth: 1990,
//     job: 'teacher'
// };
/*
const Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    // this.calculateAge = function(){
    //     console.log(2020 - this.yearOfBirth)
    // }
};

Person.prototype.calculateAge = function () {
    console.log(2020 - this.yearOfBirth)
}; // all instances of Person will have access to this function just as if it were written above

// also can add properties w .prototype
Person.prototype.lastName = 'thisIsEveryonesLastName';

// instance of Person Obj
const john = new Person('John', 1990, 'teacher');

john.calculateAge();

const jane = new Person('jane', 1980, 'designer');


const personProto = {
    calculateAge: function() {
        console.log(2016 - this.yearOfBirth);
    }
};



// OBJECTS //////////////////

// object.create builds an obj that inherits directly from the one that you pass into the first argument

const roma = Object.create(personProto);
roma.name = 'roma';
roma.yearOfBirth = 1990;
roma.job = 'teacher';

//--- while the function constructor the created object inherits from the constructors prototype property
const amy = Object.create(personProto, {
    name: { value: 'amy' },
    yearOfBirth: { value: 1969 },
    job: { value: 'designer' }
});


// primitives vs objects ////////////////
// primitives are: string, boolean, undefined, null, 0
// variables containing primitives hold that data inside the variabe itself like a box
// variables associated with objects dont contain the obj just have a reference to where the object sits. it just points to the obj

//variables //
let a = 22;
let b = a;
a = 44;
// b still equals 22

// objs //
var obj1 = {
    name: 'John',
    age: 26
};
var obj2 = obj1; // this isnt creating a new obj but just a reference that points to obj1. Its the same obj
obj1.age = 30;
//  both oj1 and obj2 both have the age of 30


// functions //
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj); // not passing the obj as the argument but a reference to it
// age is unchanged bc it is a primitive
// city is changed bc it is a reference


// a function is an instance of the obj type
// can pass a function as an argument
// can return a function from a function

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) { // anonymus function
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}
// the function above is returning something and we should store that info in a variable
var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');


// iife - immediately invoked function expressions /////////
// good for not interfering with global execution context
// anything in parenthesis is hidden from global scope
// creates private scope
// its an EXPRESSION not a declaration
(function (luck) {
    let score = Math.random() *  10;
    console.log(score >= 5 - luck);
})(3); // calling the function here at the end

*/


// CLOSURES ///////////////////////////////////////////
// is an  inner function  that has access to the variables and parameters of its outer function, even after the outer function has returned

function retirement(retirementAge) {
    const a = ' years left until retirement';

    return function(yearOfBirth) { // running inner anonymus function that is already executed and returned -- yet using param and var below
        let age = 2020 - yearOfBirth;
        console.log((retirementAge - age) + a) // using a param and variable above
    }
}
//
// const retirementUS = retirement(66);
// retirementUS(1990);
//
// retirement(66)(1990); //argument of first function then argument of 2nd


// another closure
function interviewQuestion(job) {
    let q1 = ', can you please explain what UX design is?';
    let q2 = 'What subject do you teach, ';
    let q3 = ', what do you do?';

    return function(name) {
        if (job === 'designer') {
            console.log(name + q1);

        } else if (job === 'teacher') {
            console.log( q2 + name + '?');

        } else {
            console.log('Hello ' + name + q3);
        }
    }
}

// const abc = interviewQuestion('designer')('your name ');


// BIND, CALL, APPLY /////////////////
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ", Ladies and gentlemen! I'm " +  this.name + " I'm a " + this.job + " and I'm " + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log("Hey! What's up? I'm " +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};


john.presentation('formal', 'morning');

// method borrowing
// the call method allows you to set the 'this' variable
// we used johns presentation method but it changed all the attributes of this to emily
john.presentation.call(emily, 'friendly', "afternoon");

// bind is similiar to call as in we can reset the 'this' variable explicitly
// the difference is it doesnt immediately call the function but creates a copy  of the function

// useful for having a variable with preset arguments copied from elsewhere

// first argument 'this'
const johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('afternoon');




const years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(birthYr) {
    return 2020 - birthYr;
}

function isFullAge(ageLimit, age) {
    return age >= ageLimit;
}

// calculate age first
const ages = arrayCalc(years, calculateAge);

// only takes 2 arguments, with the age calulated, create preset ageLimit for isFullAge function to define
const fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));

console.log(ages);
console.log(fullJapan);


