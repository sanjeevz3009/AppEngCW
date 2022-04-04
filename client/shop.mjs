console.log("Pussy");

// import { load } from "./eventHandler.mjs";
// import { addToCart } from "./cart.mjs";
import { showBricks } from "./displayBricks.mjs";

const el = {};

// Removes all contents from a given element
function removeContentFrom(what) {
    console.log(what);
    what.textContent = '';
}

async function loadBricks() {
    const response = await fetch('bricks');
    let bricks;
    if (response.ok) {
        bricks = await response.json();
    } else {
        bricks = ['Failed to load the bricks!'];
    }

    removeContentFrom(el.bricksList);
    showBricks(bricks, el.bricksList);
}

// Page elements used in the program are
// setup here for convenience
function prepareHandles() {
    el.bricksList = document.querySelector('#bricksList2');
}

// Increases and decreases bricks quantity input box
export function brickQuantity(e) {
    let el = e.target.parentElement;
    let input = el.querySelector('input');

    let num = parseInt(input.value);

    if (e.target.id === 'buttonAdd') {
        num += 1;
        input.value = num;
    } else if (e.target.id === 'buttonMinus' && num !== 0) {
        num -= 1;
        input.value = num;
    } else if (num !== 0) {
        addToLocalStorage(el.dataset.id, num);
        input.value = 0;
        // addToCart();
    }
}

function addToLocalStorage(what, quantity) {
    localStorage.setItem(what, quantity);
}

function pageLoaded() {
    console.log("Shop page loaded");
    prepareHandles();
    loadBricks();
}

window.addEventListener('load', pageLoaded);