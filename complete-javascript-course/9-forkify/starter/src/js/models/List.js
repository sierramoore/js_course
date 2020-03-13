import uniqid from 'uniqid'

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id); //find item that matches id
        this.items.splice(index, 1) //remove item that matched

        // [2,4,5] splice(1,1) -> returns 4, original array is [2,8]
        // [2,4,5] slice(1,1) -> returns 4, original array is [2,4,8]
        // splice mutates original array (start, howManyElements)
        // slice returns new modified array  (start, endIndex)
    }

    updateCount(id, newCount) {
        // returns item itself and change the count property on it
        this.items.find(el => el.id === id).count = newCount;
    }
}