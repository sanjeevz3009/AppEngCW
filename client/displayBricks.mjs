import { load } from "./eventHandler.mjs";

// Sets the brick attributes
function setBrickAttributes(brick, where) {
    const li = document.createElement("li");
    where.append(li);
    
    const divID = document.createElement("div");
    divID.dataset.id = brick.id;
    li.append(divID);

    const divName = document.createElement("div");
    divName.textContent = brick.brickName;
    divID.append(divName);

    const divPrice = document.createElement("div");
    divPrice.textContent = `£${brick.price}`;
    divID.append(divPrice);

    const divColor = document.createElement("div");
    divColor.textContent = brick.color;
    divID.append(divColor);

    createBrickElements(divID);
}

// Add an array of bricks to the shop page
// With brick name, price and colour

export function showBricks(bricks, where) {
    if (bricks.length > 1) {
        for (const brick of bricks) {
            setBrickAttributes(brick, where);
        }
    } else {
        setBrickAttributes(brick, where);
    }
}

// Creates the add, minus and checkout elements
// for each of the brick on the page

// Refactor this function
function createBrickElements(where) {
    const div = document.createElement("div");
    where.append(div);
    
    const buttonMinus = document.createElement("button");
    buttonMinus.id = "buttonMinus";
    buttonMinus.textContent = "-";

    div.append(buttonMinus);

    const inputQuantity = document.createElement("input");
    inputQuantity.id = "input";
    inputQuantity.value = "0";
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

    // Executes the functions necessaray from
    // the eventHandler module
    // to attach the buttons elements to each brick
    load();
}