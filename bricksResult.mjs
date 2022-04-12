import { v4 as uuidv4 } from "uuid";

// Bricks data
// Why can't we have this as a nested object?
// With outer key being id in this case?
let bricks = [
    {
        id: "xnshfdsafasd",
        brickName: "Brick 1",
        color: "Sand Green",
        quantity: "10",
        price: "0.10",
    },

    {
        id: "dskjdshkjhsd",
        brickName: "Brick 2",
        color: "Pink",
        quantity: "20", 
        price: "0.20",
    },

    {
        id: "vcxbxcvfggzv",
        brickName: "Brick 3",
        color: "Blue",
        quantity: "15",
        price: "0.11",
    },

    {
        id: "sdgfdfgdgdfg",
        brickName: "Brick 4",
        color: "Purple",
        quantity: "12",
        price: "0.17",
    },

    {
        id: "dfkgdjjkdkdkdd",
        brickName: "Brick 5",
        color: "Red",
        quantity: "7",
        price: "0.30",
    },

    {
        id: "mdfkdfkdfkfff",
        brickName: "Brick 6",
        color: "Orange",
        quantity: "8",
        price: "0.50",
    },
];

export function listBricks() {
    return bricks;
}

export function findBrick(id) {
    for (const brick of bricks) {
        if (brick.id === id) {
            return brick;
        }
    }
    return null;
}

export function updateBrickQuantity(updatedBrick) {
    const brick = findBrick(updatedBrick.id);
    if (brick == null) throw new Error("Brick not found!");

    brick.quantity = updatedBrick.quantity;
    console.log(brick);
    return brick;
}