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
*
*
*
* // Array.from(nodeList) -> to apply array methods on selected node lists
*
* continue keyword -> continue iterateing thru loop  if condition is true
*
*
* //ES6 for loop -> 'for of loop'
* for (const i of anArray) {
    if (i.className.includes('blue')) {
        continue;
    }
    i.textContent = 'I changed to blue!';
}
*
* // find Array method -> loops over array and finds condition you set
* //  findIndex Array method -> same as find but for index number
*
* SPREAD OPERATOR ...
* gathers of iterable items
* used in a function call
* works on Arrays, strings, nodeLists..
*
* REST PARAMETERS ...
* like spread but used in function declaration to accept multiple parameters
*
*
* DEFAULT PARAMETERS
* in ES6 function constuctor can assign a default param directly to param (instead of needing if else)
*
* ~ EX ~
* function SmithPerson(firstName, yearOfBirth, lastName = 'Smith', nationality = 'american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}
*
*
* MAP key:value data structure
* use for hash maps
*
*
* classes are NOT hoisted -> need to declare first b4 using
*
*
* super -> binds 'this' of initial constructor of class
*
* super calls parent constuctor
*
*
* -----------
* CHALLANGE
* Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
* */
/*
const parks = new Map();
parks.set('Roma Park', 2015, 1033);
parks.set('Anatomy Park', 2010, 21);
parks.set('Guell Park', 1980, 82);

const streets = new Map();
streets.set('Tamrit', 2019, 'tiny');
streets.set('Parallel', 2000, 'normal');
streets.set('Diagonal', 1970, 'big');
streets.set('Gracia', 1920, 'huge');

treeDensity = () => {
    console.log(streets.size / parks.size);
};
// treeDensity();

avParkAge = () => {
    let avParkYears = 0;

    for(let values of parks.entries()){
        avParkYears += values;
    }
    console.log(avParkYears / parks.size);
};
avParkAge();

mostTrees = () =>{
    for(let values of parks.entries()){
        console.log(values);
    }
};
*/

// class Parks {
//     constructor(name, year, trees){
//         this.name = name;
//         this.year = year;
//         this.trees = trees;
//     }
//     avParkAge = () => {
//         let avParkYears = 0;
//         for(let i=0; i <= this.years.length; i++) {
//             avParkYears += this.years[i];
//         }
//     };
// }
// class Streets extends Parks {
//     constructor(name, year, size){
//         super(name, year);
//         this.name = name;
//         this.year = year;
//         this.size = size;
//     }
// }
//
// const park1 = new Park('Roma Park', 2015, 1033);
// const park2 = new Park('Anatomy Park', 2010, 21);
// const park3 = new Park('Guell Park', 1980, 82);
//
// const street1 = new Streets('Tamrit', 2019, 'tiny');
// const street2 = new Streets('Parallel', 2000, 'normal');
// const street3 = new Streets('Diagonal', 1970, 'big');
// const street4 = new Streets('Gracia', 1920, 'huge');

/*
const parks = {
    name: ['Roma Park', 'Anatomy Park', 'Guell Park'],
    years: [2015, 2010, 1980],
    trees: [1033, 21, 82],
    area: [2500, 2800, 3200],
    avParkAge() {
        let avParkYears = 0;
        for(let i=0; i <= this.years.length - 1; i++) {
            avParkYears += this.years[i];
        }
        console.log(avParkYears / this.years.length)
    },
    mostTreesPark(){
        //log if more or equal than 1000 trees
        for(let i=0; i <= this.trees.length - 1; i++) {
            if(this.trees[i] >= 1000){
                console.log(this.name[i])
            }
        }
    },
    treeDensity() {
        //tree density per park area
        for(let i=0; i <= this.trees.length - 1; i++) {

        }
    }
};
parks.avParkAge();
parks.mostTreesPark();
parks.treeDensity();

const streets = {
    name: ['Tamrit', 'Parallel', 'Diagonal', 'Gracia'],
    years: [2019, 2000, 1970, 1920],
    size: ['tiny', 'normal', 'big', 'huge'],
    length: [3800, 4200, 2100, 4500],
    avLength(){
        totalLength = 0;
        for(let i=0; i <= this.length.length - 1; i++) {
            totalLength += this.length[i];
        }
        console.log(totalLength / this.length.length);
    }
};
streets.avLength();
*/













