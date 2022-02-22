// Removes all contents from a given element
function removeContentFrom(what) {
    what.textContent = '';
}

// Add an array of bricks to the shop page
function showBricks(bricks, where) {
    for (const brick of bricks) {
        const div = document.createElement('div');
        div.textContent = brick;
        where.append(div);
    }
}

async function loadBricks() {
    const response = await fetch('bricks');
    let bricks;
    if (response.ok) {
        bricks = await response.json();
    } else {
        bricks = ['Failed to load the bricks!'];
    }

    const bricksList = document.querySelector('#bricksList');
    // removeContentFrom(bricksList);
    // showBricks(bricks, bricksList);
}

function pageLoaded() {
    loadBricks();
}

window.addEventListener('load', pageLoaded);

