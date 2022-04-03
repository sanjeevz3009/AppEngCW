import { showBricks } from './shop.mjs';

const el = {};

export function addToCart() {
    let items = [];
    for (let i=0; i<localStorage.length; i++) {
        let tempItem = [];
        tempItem.push(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        items.push(tempItem);
        tempItem = [];
    }
    console.log(items);
}

// async function showDetail(e) {
//     const response = await fetch('messages/' + e.target.dataset.id);
//     if (response.ok) {
//       const detail = await response.json();
//       const p = document.createElement('p');
//       p.textContent = `Message received on server at ${detail.time}`;
//       removeContentFrom(el.detail);
//       el.detail.append(p);
//     }
//   }

function getItems() {
    let items = [];
    for (let i=0; i<localStorage.length; i++) {
        let tempItem = [];
        tempItem.push(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
        items.push(tempItem);
        tempItem = [];
    }
    return items;
}

async function showBricksCart() {
    let items = getItems();
    for (const item of items) {
        let response = await fetch('bricks/' + item[0]);
        if (response.ok) {
            console.log(response.json());
        } else {
            console.log("Error");
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
    console.log("Moew");
    prepareHandles();
    showBricksCart();
}

window.addEventListener('load', pageLoaded);