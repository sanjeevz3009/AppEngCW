import { showBricks } from "./displayBricks.mjs";

const el = {};

// Removes all contents from a given element
function removeContentFrom(what) {
    console.log(what);
    what.textContent = "";
}

function deleteBrick(e) {
    let el = e.target.parentElement;
    localStorage.removeItem(el.dataset.id);
    showBricksCart();
}

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
export async function showBricksCart() {
    removeContentFrom(el.cartList);
    const items = getItems();
    console.log(items);
    for (const item of items) {
        const response = await fetch("bricks/" + item[0]);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            showBricks(data, el.cartList);
            createDeleteButton(item[0]);
        }
    }
    updateAddBasketName();
    deleteButtonEventListener();
}

// Updates all the buttons called Add To Basket to Update
// in the cart page
function updateAddBasketName() {
    const addBasket = document.querySelectorAll("#addBasket");

    for (const name of addBasket) {
        name.textContent = "Update";
    }
}

// Creates a delete button for bricks in the cart page
function createDeleteButton(id) {
    const divDataID = document.querySelector(`[data-id='${id}']`);

    const deleteButton = document.createElement("button");
    deleteButton.id = "deleteButton";
    deleteButton.textContent = "Delete";
    divDataID.append(deleteButton);
}

// Page elements used in the program are
// setup here for convenience
function prepareHandles() {
    el.cartList = document.querySelector("#cartList2");
}

function deleteButtonEventListener() {
    const deleteButton = document.querySelectorAll("#deleteButton");
    console.log(deleteButton);
    for (const button of deleteButton) {
        button.addEventListener("click", deleteBrick);
    }
}

// Loads the page by executing the necessaray functions
function pageLoaded() {
    console.log("Cart page loaded");
    prepareHandles();
    showBricksCart();
}

window.addEventListener("load", pageLoaded);