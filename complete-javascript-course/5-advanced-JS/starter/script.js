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

// function retirement(retirementAge) {
//     const a = ' years left until retirement';
//
//     return function(yearOfBirth) { // running inner anonymus function that is already executed and returned -- yet using param and var below
//         let age = 2020 - yearOfBirth;
//         console.log((retirementAge - age) + a) // using a param and variable above
//     }
// }
//
// const retirementUS = retirement(66);
// retirementUS(1990);
//
// retirement(66)(1990); //argument of first function then argument of 2nd


// another closure
// function interviewQuestion(job) {
//     let q1 = ', can you please explain what UX design is?';
//     let q2 = 'What subject do you teach, ';
//     let q3 = ', what do you do?';
//
//     return function(name) {
//         if (job === 'designer') {
//             console.log(name + q1);
//
//         } else if (job === 'teacher') {
//             console.log( q2 + name + '?');
//
//         } else {
//             console.log('Hello ' + name + q3);
//         }
//     }
// }

// const abc = interviewQuestion('designer')('your name ');


// BIND, CALL, APPLY /////////////////
/*
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
// the call method allows you to set the 'this' variable do it in the first argument
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

*/

/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.

*/


(function(){
    // keep q's coming and exit
    const Question = function (question, answers, correct) {
        this.question = question;
        this.answers = answers;
        this.correct = correct;
        this.score = 0;
        this.promtQ = function () {
            console.log(this.question);

            for(let i=0; i < this.answers.length; i++) {
                console.log(this.answers[i]);
            }
        };
        this.isCorrect = function (response, answer) {
            if(response === answer) {
                this.score++;
                console.log("correct :D You have " + this.score + ' points!')
            } else {
                console.log("wrong D:")
            }
        }
    };

    const q1 = new Question('what is up?', ['0: sky', '1: floor'], 0);
    const q2 = new Question('what color is the sky?', ['0; blue', '1: pink'], 0);
    const q3 = new Question('who is the best?', ['0: romchick', '1: me'], 0);
    const questions = [q1, q2, q3];
    const rando =  Math.floor(Math.random() * questions.length);

    questions[rando].promtQ(); // promts question and possible answers
    const response = prompt('your answer'); // promts popup and answer comes back as string
    questions[rando].isCorrect(parseInt(response), questions[rando].correct); // check and log if correct response


    // while(response !== 'exit') {
    //     questions[rando].promtQ();
    //     const response = prompt('your answer');
    //     questions[rando].isCorrect(parseInt(response), questions[rando].correct);
    // }
    // if(response === 'exit') {
    //     console.log('okie bye')
    // }

}());







