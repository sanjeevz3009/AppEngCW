// Gets the items in the basket from
// local storage
export function getItems() {
    const items = [];
    for (let i=0; i<localStorage.length; i++) {
        let tempItem = [];
        tempItem.push(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        items.push(tempItem);
        tempItem = [];
    }
    return items;
}