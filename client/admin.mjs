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

async function showOrderDetail() {
    const id = "88ec1628-ceb4-4a20-a02d-c3807f63cc61";
    const response = await fetch("orders/" + id);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
}

function showCustomerOrders() {

}

function pageLoaded() {
    console.log("Admin page loaded");
    // loadAuth();
    // loadCustomerOrders();
    showOrderDetail();
}
window.addEventListener("load", pageLoaded);