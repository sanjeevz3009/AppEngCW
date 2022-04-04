import { showBricks } from './displayBricks.mjs';

const el = {};

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

async function showBricksCart() {
    const items = getItems();
    for (const item of items) {
        const response = await fetch('bricks/' + item[0]);
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
    el.cartList = document.querySelector('#cartList2');
}

function pageLoaded() {
    console.log("Cart page loaded");
    prepareHandles();
    showBricksCart();
}

window.addEventListener('load', pageLoaded);