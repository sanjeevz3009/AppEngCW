import { brickQuantity } from "./brickQuantity.mjs";
// import { deleteBrick } from "./deleteCartItem.mjs";

// Page elements used in the program are
// setup here for convenience
const el = {};

// Page elements used in the program are
// setup here for convenience
function prepareHandlesBricks() {
    el.buttonAdd = document.querySelectorAll("#buttonAdd");
    el.buttonMinus = document.querySelectorAll("#buttonMinus");
    el.buttonAddBasket = document.querySelectorAll("#addBasket");
}

// Connect listeners for button clicks
function addEventListeners(where) {
    for (const button of where) {
        button.addEventListener("click", brickQuantity);
    }
}

// function deleteButtonEventListener() {
//     const deleteButton = document.querySelectorAll("#deleteButton");
//     for (const button of deleteButton) {
//         button.addEventListener("click", deleteBrick);
//     }
// }

// Loads all the functions in this file
export function load() {
    prepareHandlesBricks();
    addEventListeners(el.buttonAdd);
    addEventListeners(el.buttonMinus);
    addEventListeners(el.buttonAddBasket);
    // deleteButtonEventListener();
}