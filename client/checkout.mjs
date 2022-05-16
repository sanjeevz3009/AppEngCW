import { getItems } from "./localStorage.mjs";
// import { generateOrderId } from "../svr.js";

// // Brick quantity calculator 
// async function brickQuantityCalculator() {
//     const items = getItems();
//     for (const item of items) {
//         const response = await fetch("bricks/" + item[0]);
//         if (response.ok) {
//             const data = await response.json();
//             console.log(data);
//             const newQuantity = data.quantity - item[1];
//             console.log(newQuantity);
//             updateStockLevels(item[0], newQuantity, item[1]);
//         }
//     }
// }

// Brick quantity calculator 
// async function getItemsId() {
//     const items = getItems();
//     for (const item of items) {
//         const response = await fetch("bricks/" + item[0]);
//         if (response.ok) {
//             continue;
//         }
//     }
//     console.log(items);
// }

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

// // Decreases the brick quantity levels
// async function updateStockLevels(id, newQuantity, quantityBought) {
//     // const orderId = generateOrderId();
//     let payload = { id, quantity: newQuantity, quantityBought};
//     let response = await fetch(`bricks/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//     });

//     if (response.ok) {
//         console.log("Brick stock levels updated!");
//         localStorage.clear();
//         sendConfirmation(orderId);
//     } else {
//         console.log("Brick stock levels failed to update!", response);
//     }
// }

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