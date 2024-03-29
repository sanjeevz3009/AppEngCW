import express from "express";
import * as br from "./brickResult2.mjs";
import path from "path";
import url from "url";
import uuid from "uuid-random";

import authConfig from "./auth_config.js";
import auth0Helpers from './auth0_helpers.js';

const app = express();
app.use(express.static("client"));

// Generates a unique id for the customers order
export function generateOrderId() {
  const id = uuid();
  return id;
}

// Gets the bricks data
async function getBricks(req, res) {
  res.json(await br.listBricks());
}

// Gets the bricks data
async function getOrders(req, res) {
  res.json(await br.listOrders());
}

// Gets the bricks data by id for validation
async function getBrick(req, res) {
  const result = await br.findBrick(req.params.id);
  if (!result) {
    res.status(404).send("No match for that ID!");
    return;
  }
  res.json(result);
}

// Gets the order data
async function getOrder(req, res) {
  const result = await br.findOrder(req.params.id);
  if (!result) {
    res.status(404).send("No match for that ID!");
    return;
  }
  res.json(result);
}

// Gets the order status for specific orders
async function getOrderStatus(req, res) {
  const result = await br.findOrderStatus(req.params.id);
  if (!result) {
    res.status(404).send("No match for that ID!");
    return;
  }
  res.json(result);
}

// Updated the brick stock level
async function putBrick(req, res) {
  const brick = await br.updateBrickQuantity(req.body);
  res.json(brick);
}

// Adds a new order to the database
async function putOrder(req, res) {
  const order = await br.addOrder(req.body);
  res.json(order);
}

// Updates the order status
async function putOrderStatus(req, res) {
  const order = await br.changeOrderStatus(req.body);
  res.json(order);
}

// Code used and referenced from https://github.com/portsoc/auth0-example
// Serve the Auth config publicly
app.get('/auth_config', (req, res) => {
  res.json(authConfig);
});

const auth0 = auth0Helpers(authConfig);

// Protect api from unauthenticated users
app.use('/api', auth0.checkJwt);

app.get('/api/hello', async (req, res) => {
  const userId = auth0.getUserID(req);

  // Load the user information, in production this would need caching or storing in a database
  const profile = await auth0.getProfile(req);

  res.send(`Hello user ${userId}, here's your profile:\n${JSON.stringify(profile, null, 2)}`);

  console.log('successful authenticated request by ' + userId);
});

// This will serve the files present in static/ inside this stage
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), '../static')));

// Wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get("/bricks", asyncWrap(getBricks));
app.get("/bricks/:id", asyncWrap(getBrick));

app.put("/bricks/:id", express.json(), asyncWrap(putBrick));

app.post("/bricks/order", express.json(), asyncWrap(putOrder));

app.get("/orders", asyncWrap(getOrders));
app.get("/orders/:id", asyncWrap(getOrder));
app.get("/orders/status/:id", asyncWrap(getOrderStatus));

app.put("/orders/:id", express.json(), asyncWrap(putOrderStatus));

app.listen(8080);