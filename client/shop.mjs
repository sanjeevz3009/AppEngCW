import { showBricks } from "./displayBricks.mjs";

const el = {};

// Removes all contents from a given element
function removeContentFrom(what) {
    console.log(what);
    what.textContent = "";
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

    removeContentFrom(el.bricksList);
    showBricks(bricks, el.bricksList);
}

// Page elements used in the program are
// setup here for convenience
function prepareHandles() {
    el.bricksList = document.querySelector("#bricksList2");
}

// Loads all the functions necessaray for the page
function pageLoaded() {
    console.log("Shop page loaded");
    prepareHandles();
    loadBricks();
}

window.addEventListener("load", pageLoaded);