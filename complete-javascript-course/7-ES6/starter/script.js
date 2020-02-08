/*
* var is function scoped
* ES5 can use a variable b4 it's declared. will just be undefined
*
* ES6 will get error if try to use a variable b4 its's defined
*
* let and const are block scoped
* block is anything inside brackets
* you cant define a constant in a block then use it outside of that block
*
*
*
* EX (if used var would b the same variable)
let i = 23; //completely different variable

for (let i = 0; i < 5; i++) { //bc i here is block scoped
    console.log(i);
}

*
* EX
* ES5 iief
* (function() {
*
* })();
*
* ES6 iief
* { }
*
*
*
* EX TEMPLATE LITERALS for making easier long strings
* ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');

 ES6
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(yearOfBirth)} years old.`);
*
*
*
* METHOD function attached to an object
* ES5
* only in a method call does 'this' refer to OBJ
* in regular function call 'this' refers to GLOBAL OBJ
* can work around by storing 'this' in a variable (var this = this;)
*
* ES6
* preserves value of 'this'
*
* implicit binding -> person.sayName()
* explicit binding -> let self = this;
* new binding -> const roma = ('roma', 'cat')
*
*
*
* const box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {//  shares lexical 'this' keyword of surroundingsin this case is global context
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
*
*
* Person.prototype.myFriends5 = function(friends) {

    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el;
    }.bind(this)); //create a copy  of function with manually defined this keyword as arg

    console.log(arr);
}
* var friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends5(friends);
* */

