import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.static("client"));

// Bricks data
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

// Gets the bricks data
app.get("/bricks", (req, res) => {
    res.json(bricks);
});

// Gets the bricks data by id for validation
app.get("/bricks/:id", (req, res) => {
    for (const brick of bricks) {
        if (brick.id === req.params.id) {
            res.json(brick);
            return;
        }
    }
    res.status(404).send("No matching brick for that ID.");
});

app.listen(8080);