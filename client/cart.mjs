import { showBricks } from "./displayBricks.mjs";
import { checkoutElements } from "./displayBricks.mjs";
import { getItems } from "./localStorage.mjs";

// Move event listeners to another module

const el = {};

// Removes all contents from a given element
function removeContentFrom(what) {
    console.log(what);
    what.textContent = "";
}

// Displays the items on the cart page
export async function showBricksCart() {
    removeContentFrom(el.cartList);
    const items = getItems();
    const itemPrices = [];
    console.log(items);
    for (const item of items) {
        const response = await fetch("bricks/" + item[0]);
        if (response.ok) {
            const data = await response.json();
            itemPrices.push(data.price);
            console.log(data);
            showBricks(data, el.cartList);
            createDeleteButton(item[0]);
        }
    }
    updateAddBasketName();
    deleteButtonEventListener();
    totalCartPrice(itemPrices);
}

// Calculates the total price of items on the cart page
function totalCartPrice(itemPrices) {
    console.log(itemPrices);
    let totalPrice = 0;
    for (const price of itemPrices) {
        totalPrice += Number(price);
    }
    totalPrice = totalPrice.toFixed(2);
    checkoutElements(totalPrice);
    checkoutButtonEventListener();
}

// Changes the from cart page to checkout page
function changePage() {
    window.location.href = "/checkout.html";
}

// Listener for the checkout button on cart page
function checkoutButtonEventListener() {
    const buttonCheckout = document.querySelector("#buttonCheckout");
    buttonCheckout.addEventListener("click", changePage);
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

// Deletes the brick off LocalStorage and updates the cart page
function deleteBrick(e) {
    let el = e.target.parentElement;
    localStorage.removeItem(el.dataset.id);
    showBricksCart();
}

// Listeners for delete buttons on the cart page
function deleteButtonEventListener() {
    const deleteButton = document.querySelectorAll("#deleteButton");
    for (const button of deleteButton) {
        button.addEventListener("click", deleteBrick);
    }
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