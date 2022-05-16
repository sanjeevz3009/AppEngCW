import { getItems } from "./localStorage.mjs";

// Creates the order
async function createAnOrder() {
    const items = getItems();
    console.log(items);
    let payload = { items, order_status: false };
    let response = await fetch(`bricks/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        console.log("Order created!");
        localStorage.clear();
    } else {
        console.log("Order not created!", response);
    }
}

// In development to display the user of the orderId
function sendConfirmation(orderId) {
    const div = document.querySelector("#checkout");
    console.log(orderId, div);
}

// Loads all the functions necessaray for the page
function pageLoaded() {
    console.log("Checkout page loaded!")
    createAnOrder();
}

window.addEventListener("load", pageLoaded);