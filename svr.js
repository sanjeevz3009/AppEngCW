import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.static("client"));

let bricks = [
    {
        id: 'xnshfdsafasd',
        brickName: 'Brick 1',
        color: 'Sand Green',
        quantity: 10,
        price: 0.10,
    },
    {
        id: 'dskjdshkjhsd',
        brickName: 'Brick 2',
        color: 'pink',
        quantity: 20, 
        price: 0.20,
    },
    {
        id: 'vcxbxcvfggzv',
        brickName: 'Brick 3',
        color: 'green',
        quantity: 15,
        price: 0.11,
    },

    {
        id: 'sdgfdfgdgdfg',
        brickName: 'Brick 4',
        color: 'green',
        quantity: 12,
        price: 0.17,
    },

    {
        id: 'dfkgdjjkdkdkdd',
        brickName: 'Brick 5',
        color: 'green',
        quantity: 7,
        price: 0.30,
    },

    {
        id: 'mdfkdfkdfkfff',
        brickName: 'Brick 6',
        color: 'green',
        quantity: 8,
        price: 0.50,
    },
];

app.get('/bricks', (req, res) => {
    res.json(bricks);
});


app.get('/bricks/:id', (req, res) => {
    for (const brick of bricks) {
        if (brick.id === req.params.id) {
            res.json(brick);
            return;
        }
    }
    res.status(404).send('No matching brick for that ID.');
});

app.listen(8080);