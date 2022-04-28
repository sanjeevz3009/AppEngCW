import express from "express";
import * as br from "./bricksResult.mjs";
import path from "path";
import url from "url";

import authConfig from "./auth_config.js";
import auth0Helpers from './auth0_helpers.js';

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

// serve the auth config publicly
app.get('/auth_config', (req, res) => {
  res.json(authConfig);
});

const auth0 = auth0Helpers(authConfig);

// protect /api from unauthenticated users
app.use('/api', auth0.checkJwt);

app.get('/api/hello', async (req, res) => {
  const userId = auth0.getUserID(req);

  // load the user information, in production this would need caching or storing in a database
  const profile = await auth0.getProfile(req);

  res.send(`Hello user ${userId}, here's your profile:\n${JSON.stringify(profile, null, 2)}`);

  console.log('successful authenticated request by ' + userId);
});

// this will serve the files present in static/ inside this stage
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../static')));


app.get("/bricks", getBricks);
app.get("/bricks/:id", getBrick);
app.put("/bricks/:id", express.json(), putBrick);

app.listen(8080);