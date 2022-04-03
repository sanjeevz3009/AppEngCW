import { load } from "./eventHandler.mjs";
import { addToCart } from "./cart.mjs";

const el = {};

// Removes all contents from a given element
function removeContentFrom(what) {
    what.textContent = '';
}

// Add an array of bricks to the shop page
export function showBricks(bricks, where) {
    for (const brick of bricks) {
        const li = document.createElement('li');
        where.append(li);
        const div = document.createElement('div');
        div.textContent = brick.brickName;
        li.append(div);
        div.dataset.id = brick.id;

        createBrickElements(div);
    }
}

// Creates the add, minus and checkout elements
// for each of the brick on the page
function createBrickElements(where) {
    const buttonMinus = document.createElement('button');
    buttonMinus.id = "buttonMinus";
    buttonMinus.textContent = "-";

    where.append(buttonMinus);

    const inputQuantity = document.createElement('input');
    inputQuantity.id = "input";
    inputQuantity.value = "0";
    inputQuantity.type = "number";

    where.append(inputQuantity);

    const buttonAdd = document.createElement('button');
    buttonAdd.id = "buttonAdd";
    buttonAdd.textContent = "+";
    
    where.append(buttonAdd);

    const buttonAddBasket = document.createElement('button');
    buttonAddBasket.id = "addBasket";
    buttonAddBasket.textContent = "Add To Basket";

    where.append(buttonAddBasket);

    // Executes the functions necessaray from
    // the eventHandler module
    // to attach the buttons elements to each brick
    load();
}

async function loadBricks() {
    const response = await fetch('bricks');
    let bricks;
    if (response.ok) {
        bricks = await response.json();
    } else {
        bricks = ['Failed to load the bricks!'];
    }

    removeContentFrom(el.bricksList);
    showBricks(bricks, el.bricksList);
}

// Page elements used in the program are
// setup here for convenience
function prepareHandles() {
    el.bricksList = document.querySelector('#bricksList2');
}

// Increases and decreases bricks quantity input box
export function brickQuantity(e) {
    let el = e.target.parentElement;
    let input = el.querySelector('input');

    let num = parseInt(input.value);

    if (e.target.id === 'buttonAdd') {
        num += 1;
        input.value = num;
    } else if (e.target.id === 'buttonMinus' && num !== 0) {
        num -= 1;
        input.value = num;
    } else if (num !== 0) {
        addToLocalStorage(el.dataset.id, num);
        input.value = 0;
        addToCart();
    }
}

function addToLocalStorage(what, quantity) {
    localStorage.setItem(what, quantity);
}

function pageLoaded() {
    prepareHandles();
    loadBricks();
}

window.addEventListener('load', pageLoaded);