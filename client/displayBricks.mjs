import { load } from "./eventHandler.mjs";

// Add an array of bricks to the shop page
// With brick name, price and colour

// Refactor this function
export function showBricks(bricks, where) {
    if (bricks.length > 1) {
        for (const brick of bricks) {
            const li = document.createElement("li");
            where.append(li);
            const div = document.createElement("div");
            div.textContent = brick.brickName;
            li.append(div);

            const spanPrice = document.createElement("span");
            spanPrice.textContent = `£${brick.price}`;
            div.append(spanPrice);

            const spanColor = document.createElement("span");
            spanColor.textContent = brick.color;
            div.append(spanColor);

            div.dataset.id = brick.id;
    
            createBrickElements(div);
        }
    } else {
        const li = document.createElement("li");
        where.append(li);
        const div = document.createElement("div");
        div.textContent = bricks.brickName;
        li.append(div);
        div.dataset.id = bricks.id;

        createBrickElements(div);
    }
}

// Creates the add, minus and checkout elements
// for each of the brick on the page

// Refactor this function
function createBrickElements(where) {
    const buttonMinus = document.createElement("button");
    buttonMinus.id = "buttonMinus";
    buttonMinus.textContent = "-";

    where.append(buttonMinus);

    const inputQuantity = document.createElement("input");
    inputQuantity.id = "input";
    inputQuantity.value = "0";
    inputQuantity.type = "number";

    where.append(inputQuantity);

    const buttonAdd = document.createElement("button");
    buttonAdd.id = "buttonAdd";
    buttonAdd.textContent = "+";
    
    where.append(buttonAdd);

    const buttonAddBasket = document.createElement("button");
    buttonAddBasket.id = "addBasket";
    buttonAddBasket.textContent = "Add To Basket";

    where.append(buttonAddBasket);

    // Executes the functions necessaray from
    // the eventHandler module
    // to attach the buttons elements to each brick
    load();
}