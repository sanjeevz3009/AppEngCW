import { brickQuantity } from "./displayBricks.mjs";

// Page elements used in the program are
// setup here for convenience
const el = {};

function prepareHandlesBricks() {
    el.buttonAdd = document.querySelectorAll('#buttonAdd');
    el.buttonMinus = document.querySelectorAll('#buttonMinus');
    el.buttonAddBasket = document.querySelectorAll('#addBasket');
}

// Connect listeners for button clicks
function addEventListeners(where) {
    for (const button of where) {
        button.addEventListener('click', brickQuantity);
    }
}

// Loads all the functions in this file
export function load() {
    prepareHandlesBricks();
    addEventListeners(el.buttonAdd);
    addEventListeners(el.buttonMinus);
    addEventListeners(el.buttonAddBasket);
}