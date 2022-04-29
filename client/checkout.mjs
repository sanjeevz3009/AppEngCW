import { getItems } from "./localStorage.mjs";

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
            updateStockLevels(item[0], newQuantity);
        }
    }
}

// Decreases the brick quantity levels
async function updateStockLevels(id, newQuantity) {
    let payload = { id, quantity: newQuantity };
    let response = await fetch(`bricks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        console.log("Brick stock levels updated!");
        localStorage.clear();
    } else {
        console.log("Brick stock levels failed to update!", response);
    }
}


// Loads all the functions necessaray for the page
function pageLoaded() {
    console.log("Checkout page loaded!")
    brickQuantityCalculator();
}

window.addEventListener("load", pageLoaded);