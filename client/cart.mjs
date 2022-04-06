import { showBricks } from "./displayBricks.mjs";

const el = {};

// Gets the items in the basket from
// local storage
function getItems() {
    const items = [];
    for (let i=0; i<localStorage.length; i++) {
        let tempItem = [];
        tempItem.push(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        items.push(tempItem);
        tempItem = [];
    }
    return items;
}

// Displays the cart on the cart page
async function showBricksCart() {
    const items = getItems();
    console.log(items);
    for (const item of items) {
        const response = await fetch("bricks/" + item[0]);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            showBricks(data, el.cartList);
        }
    }
    // showBricks(, el.cartList);
}

// Page elements used in the program are
// setup here for convenience
function prepareHandles() {
    el.cartList = document.querySelector("#cartList2");
}

// Loads the page by executing the necessaray functions
function pageLoaded() {
    console.log("Cart page loaded");
    prepareHandles();
    showBricksCart();
}

window.addEventListener("load", pageLoaded);