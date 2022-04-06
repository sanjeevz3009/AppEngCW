// Increases and decreases bricks quantity input box
export function brickQuantity(e) {
    let el = e.target.parentElement;
    let input = el.querySelector("input");

    let num = parseInt(input.value);

    if (e.target.id === "buttonAdd") {
        num += 1;
        input.value = num;
    } else if (e.target.id === "buttonMinus" && num !== 0) {
        num -= 1;
        input.value = num;
    } else if (num !== 0) {
        addToLocalStorage(el.dataset.id, num);
        input.value = 0;
    }
}

// Adds the quantity of bricks to local storage
function addToLocalStorage(what, quantity) {
    localStorage.setItem(what, quantity);
}