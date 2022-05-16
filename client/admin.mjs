import { loadAuth } from "./auth0.mjs";

// Brick quantity calculator 
// async function brickQuantityCalculator(id, quantity) {
//     const response = await fetch("bricks/" + id);
//     if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         const newQuantity = data.quantity - item[1];
//         console.log(newQuantity);
//         updateStockLevels(item[0], newQuantity, item[1]);
//     }
// }

async function updateOrderStatus(id) {
    console.log(id);
    let payload = { id, status: true};
    let response = await fetch("orders/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        console.log("Order status updated.");
        // localStorage.clear();
        // sendConfirmation(orderId);
    } else {
        console.log("Order status not updated", response);
    }
}

async function getOrderStatusDispatch(e) {
    const el = e.target.parentElement;
    const response = await fetch("orders/status/" + el.dataset.id);
    let status;
    if (response.ok) {
        status = await response.json();
    }
    console.log(status[0].order_status);
    if (status[0].order_status == 0) {
        const response = await fetch("orders/" + el.dataset.id);
        if (response.ok) {
            const orders = await response.json();
            console.log(orders);
            getBrickDetailForOrder(orders);
            updateOrderStatus(el.dataset.id);
        }
    } else {
        console.log("Order already dispatched");
    }
}

// Dispatches the order
// async function dispatchOrder(e) {
//     const el = e.target.parentElement;
//     const orderStatus = getOrderStatusDispatch(el.dataset.id);
//     console.log(orderStatus);
//     console.log(el);
//     const response = await fetch("orders/" + el.dataset.id);
//     if (response.ok) {
//         const orders = await response.json();
//         console.log(orders);
//         getBrickDetailForOrder(orders);
//     }
// }

// Gets the bricks details
async function getBrickDetailForOrder(orders) {
    console.log(orders);
    for (const order of orders) {
        const response = await fetch("bricks/" + order.brick_id );
        if (response.ok) {
            const brickData = await response.json();
            console.log(brickData.id, order.quantity);
            updateStockLevels(brickData, order.quantity);
        }
    }    
}

function getOrderStatus(status) {
    if (status == 1) {
        return "Dispatched";
    } else {
        return "Not Dispatched"
    }
}

// loads the customer orders
// gets the order ID and order status
async function loadCustomerOrders() {
    const response = await fetch("orders");
    let orders;
    if (response.ok) {
        orders = await response.json();
    } else {
        console.log("Failed to load orders!");
    }
    console.log(orders);
    showCustomerOrders(orders);
    loadOrderDetail(orders);
}

// Loads the details of specific order
// such as order Id, Brick_id and quantity
async function loadOrderDetail(orders) {
    console.log(orders);
    for (const order of orders) {
        const response = await fetch("orders/" + order.order_id);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const dataId = document.querySelector(`[data-id='${order.order_id}']`);
            const detailList = document.createElement("div");
            detailList.id = "detailList";
            dataId.append(detailList);
            getBrickDetail(data);
        }
    } 
}

// Gets the bricks details
async function getBrickDetail(data) {
    console.log(data);
    for (const order of data) {
        const response = await fetch("bricks/" + order.brick_id );
        if (response.ok) {
            const brickData = await response.json();
            console.log(order, brickData);
            showOrderDetail(order, brickData);
        }
    } 
}

// Loads the bricks from the back-end
// This is used to display the available bricks
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

// Creates the elements for customer orders
function showCustomerOrders(orders) {
    for (const order of orders) {

        const dashboard = document.querySelector("#dashboard");

        const div = document.createElement("div");
        div.id = "orders";
        div.dataset.id = order.order_id;

        dashboard.append(div);

        const p = document.createElement("p");
        p.textContent = `Order ID: ${order.order_id}`;

        div.append(p);

        const pOrderStatus = document.createElement("p");
        pOrderStatus.textContent = `Order Status: ${getOrderStatus(order.order_status)}`

        div.append(pOrderStatus);

        const buttonDispatch = document.createElement("button");
        buttonDispatch.id = "dispatch";
        buttonDispatch.textContent = "Dispatch";

        div.append(buttonDispatch);
        dispatchOrderEventListener();
    }
}

// Event listener for dispatch button
function dispatchOrderEventListener() {
    const dispatchButtons = document.querySelectorAll("#dispatch");
    for (const button of dispatchButtons) {
        button.addEventListener("click", getOrderStatusDispatch);
    }
}

// When the Show Detail button is clicked
// this function will create the elements to display
// the order details
function showOrderDetail(order, brickData) {
    console.log(order, brickData);
    // for (const order of orders) {
    console.log(order.order_id);
    const dataId = document.querySelector(`[data-id='${order.order_id}']`);
    const detailList = dataId.childNodes[3];
    console.log(detailList);
    
    const div = document.createElement("div");
    div.id = "detail";

    detailList.append(div);

    const divBrick = document.createElement("div");
    divBrick.id = brickData.id;

    div.append(divBrick);

    const pBrickID = document.createElement("p");
    pBrickID.textContent = `Brick ID: ${brickData.id}`;

    divBrick.append(pBrickID);

    const pBrickName = document.createElement("p");
    pBrickName.textContent = `Brick Name: ${brickData.brick_name}`;

    divBrick.append(pBrickName);

    const pBrickColor = document.createElement("p");
    pBrickColor.textContent = `Brick Color: ${brickData.color}`;

    divBrick.append(pBrickColor);

    const pQuantity = document.createElement("p");
    pQuantity.textContent = `Order Quantity: ${order.quantity}`;

    divBrick.append(pQuantity);
}

function calculateNewBrickQuantity(oldQuantity, newQuantity) {
    console.log(oldQuantity, newQuantity);
    return oldQuantity - newQuantity;
}

// Decreases the brick quantity levels
async function updateStockLevels(brick, quantity) {
    console.log(brick, quantity);
    const newQuantity = calculateNewBrickQuantity(brick.quantity, quantity);
    // const orderId = generateOrderId();
    let payload = { id: brick.id, quantity: newQuantity};
    let response = await fetch(`bricks/${brick.id}`, {
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

// Loads thw admin page
function pageLoaded() {
    console.log("Admin page loaded");
    // loadAuth();
    loadCustomerOrders();
    // loadOrderDetail();
    // loadBricks();
}
window.addEventListener("load", pageLoaded);