import express from "express";
import * as br from "./bricksResult.mjs";

const app = express();
app.use(express.static("client"));

// Gets the bricks data
function getBricks(req, res) {
    res.json(br.listBricks());
}

// app.get("/bricks", (req, res) => {
//     res.json(bricks);
// });

// Gets the bricks data by id for validation
function getBrick(req, res) {
    const result = br.findBrick(req.params.id);
    if (!result) {
        res.status(404).send("No match for that ID!");
        return;
    }
    res.json(result);
}

// app.get("/bricks/:id", (req, res) => {
//     for (const brick of bricks) {
//         if (brick.id === req.params.id) {
//             res.json(brick);
//             return;
//         }
//     }
//     res.status(404).send("No matching brick for that ID.");
// });

// app.listen(8080);

function putBrick(req, res) {
    const brick = br.updateBrickQuantity(req.body);
    res.json(brick);
}

app.get("/bricks", getBricks);
app.get("/bricks/:id", getBrick);
app.put("/bricks/:id", express.json(), putBrick);

app.listen(8080);