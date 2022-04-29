import { load } from "./eventHandler.mjs";

// Gets the quantity of a brick added by the user
// to the basket, saved using localStorage API
function getBrickQuantity(id) {
    const quantity = localStorage.getItem(id);
    return quantity;
}

// Try see if el object work for creation of elements

// Sets the brick attributes
function setBrickAttributes(brick, where) {
    const li = document.createElement("li");
    where.append(li);
    
    const divID = document.createElement("div");
    divID.dataset.id = brick.id;
    li.append(divID);

    const divName = document.createElement("div");
    divName.textContent = brick.brick_name;
    divID.append(divName);

    const divPrice = document.createElement("div");
    divPrice.textContent = `£${brick.price}`;
    divID.append(divPrice);

    const divColor = document.createElement("div");
    divColor.textContent = brick.color;
    divID.append(divColor);

    const quantity = getBrickQuantity(brick.id);
    createBrickElements(divID, quantity);
}

// Creates the add, minus and checkout elements
// for each of the brick on the page
function createBrickElements(where, quantity) {
    const div = document.createElement("div");
    where.append(div);
    
    const buttonMinus = document.createElement("button");
    buttonMinus.id = "buttonMinus";
    buttonMinus.textContent = "-";

    div.append(buttonMinus);

    const inputQuantity = document.createElement("input");
    inputQuantity.id = "input";

    if (quantity) {
        inputQuantity.value = quantity;
    } else {
        inputQuantity.value = "0";
    }
    
    inputQuantity.type = "number";

    div.append(inputQuantity);

    const buttonAdd = document.createElement("button");
    buttonAdd.id = "buttonAdd";
    buttonAdd.textContent = "+";
    
    div.append(buttonAdd);

    const buttonAddBasket = document.createElement("button");
    buttonAddBasket.id = "addBasket";
    buttonAddBasket.textContent = "Add To Basket";

    where.append(buttonAddBasket);

    // Executes the functions necessary from
    // the eventHandler module
    // to attach the buttons elements to each brick
    load();
}

// Creates the total price element and checkout button
// on the cart page
export function checkoutElements(totalPrice) {
    const cartList2 = document.querySelector("#cartList2");
    const divID = document.createElement("div");
    divID.id = "checkoutBox";
    cartList2.append(divID);

    const div = document.createElement("div");
    div.id = "totalPrice";
    div.textContent = `Total price: £${totalPrice}`;
    divID.append(div);

    const button = document.createElement("button");
    button.id = "buttonCheckout";
    button.textContent = "Checkout";
    divID.append(button);
}

// Add an array of bricks to the shop page
// With brick name, price and colour
export function showBricks(bricks, where) {
    if (bricks.length > 1) {
        for (const brick of bricks) {
            setBrickAttributes(brick, where);
        }
    } else {
        setBrickAttributes(bricks, where);
    }
}