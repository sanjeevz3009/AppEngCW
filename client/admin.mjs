import { loadAuth } from "./auth0.mjs";

async function brickQuantityCalculator() {
    const items = getItems();
    for (const item of items) {
        const response = await fetch("bricks/" + item[0]);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const newQuantity = data.quantity - item[1];
            console.log(newQuantity);
            updateStockLevels(item[0], newQuantity, item[1]);
        }
    }
}

async function loadCustomerOrders() {
    const response = await fetch("orders");
    let orders;
    if (response.ok) {
        orders = await response.json();
    } else {
        console.log("Failed to load orders!");
    }
    console.log(orders);
}

async function loadOrderDetail() {
    const id = "88ec1628-ceb4-4a20-a02d-c3807f63cc61";
    const response = await fetch("orders/" + id);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
}

// Loads the bricks from the back-end
async function loadBricks() {
    const response = await fetch("bricks");
    let bricks;
    if (response.ok) {
        bricks = await response.json();
        console.log(bricks);
    } else {
        bricks = ["Failed to load the bricks!"];
    }
}

function showCustomerOrders() {

}

function showOrderDetail() {
    
}

// Brick quantity calculator 
async function brickQuantityCalculator() {
    const items = getItems();
    for (const item of items) {
        const response = await fetch("bricks/" + item[0]);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const newQuantity = data.quantity - item[1];
            console.log(newQuantity);
            updateStockLevels(item[0], newQuantity, item[1]);
        }
    }
}

// Decreases the brick quantity levels
async function updateStockLevels(id, newQuantity, quantityBought) {
    // const orderId = generateOrderId();
    let payload = { id, quantity: newQuantity, quantityBought};
    let response = await fetch(`bricks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        console.log("Brick stock levels updated!");
        // localStorage.clear();
        // sendConfirmation(orderId);
    } else {
        console.log("Brick stock levels failed to update!", response);
    }
}

function pageLoaded() {
    console.log("Admin page loaded");
    // loadAuth();
    // loadCustomerOrders();
    // loadOrderDetail();
    // loadBricks();
}
window.addEventListener("load", pageLoaded);