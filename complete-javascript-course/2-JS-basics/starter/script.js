// console.log("meow!!");
// // check each num in arr
// // add tip
// // push into new array
//
// var bill = [124, 48, 268];
// var tippedBill = [];
//
// // for(let i=bill.length - 1; i >= 0;  i--){
// //     console.log(bill[i])
// // }
// // console.log(bill.length)
//
// function calcTip(amount) {
//     if (amount > 50){
//         return amount * 1.2
//     } else if(amount >= 50 && amount < 200) {
//         return amount * 1.15
//     } else {
//         return amount * 1.1
//     }
// }
//
// function addTippedBillToArr () {
//     for(let i=0; i < bill.length; i++) {
//         tippedBill.push(calcTip(bill[i]));
//     }
// }
// addTippedBillToArr();
//
// console.log(bill);
// console.log(tippedBill);

/* Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
    John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

    Implement a tip calculator using objects and loops:
    1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


    EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average

 */


// let allTips = [];
// let total = [];

const tipCalc =  {
    allTips: [],
    total: [],
    bills: [124, 48, 268, 180, 42],
    calcTips: function() {
        for(let i=0; i <= this.bills.length; i++){
            if(this.bills[i] <= 49){
                this.allTips.push(this.bills[i] * .20);
                this.total.push(this.bills[i] * 1.2);

            }else if (this.bills[i] >= 50 && this.bills[i] < 200){
                this.allTips.push(this.bills[i] * .15);
                this.total.push(this.bills[i] * 1.15);

            }else if (this.bills[i] >= 200){
                this.allTips.push(this.bills[i] * .10);
                this.total.push(this.bills[i] * 1.1);
            }
        }
    }
};

tipCalc.calcTips();
console.log(tipCalc.bills);
console.log(tipCalc.allTips);
console.log(tipCalc.total);
