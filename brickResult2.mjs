import uuid from "uuid-random";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function init() {
    const db = await open({filename: './brickStore.db', driver: sqlite3.Database}, { verbose: true});
    await db.migrate( { migrationsPath: "./migrations-sqlite" });
    return db;
}

// async function init() {
//     const db = await sqlite.open("./brickStore.db", { verbose: true});
//     await db.migrate( { migrationsPath: "./migrations-sqlite" });
//     return db;
// }

const dbConnection = init();

export async function listBricks() {
    const db = await dbConnection;
    // Do a order by here
    return db.all("SELECT * FROM Bricks");
}

export async function listOrders() {
    const db = await dbConnection;
    // Do a order by here
    return db.all("SELECT * FROM Orders");
}

export async function findBrick(id) {
    const db = await dbConnection;
    return db.get("SELECT * FROM Bricks WHERE id = ?", id);
}

export async function findOrder(id) {
    const db = await dbConnection;
    return db.all("SELECT * FROM Order_items WHERE order_id = ?", id);
}

export async function findOrderStatus(id) {
    const db = await dbConnection;
    return db.all("SELECT order_status FROM Orders WHERE order_id = ?", id);
}

export async function addBrick(brick) {
    const db = await dbConnection;

    const id = uuid();
    await db.run("INSERT INTO Bricks VALUES (?, ?, ?, ?, ?)", [id, brick.brickName, brick.color, brick.color, brick.quantity, brick.price]);
}

export async function updateBrickQuantity(updatedBrick) {
    const db = await dbConnection;
    const brick = findBrick(updatedBrick.id);
    const statement = await db.run("UPDATE Bricks SET quantity = ? WHERE id = ?", [updatedBrick.quantity, updatedBrick.id]);

    if (statement.changes === 0) throw new Error("Brick not found");

    return brick;
}

export async function changeOrderStatus(updatedOrder) {
    const db = await dbConnection;
    await db.run("UPDATE Orders SET order_status = ? WHERE order_id = ?", [updatedOrder.status, updatedOrder.id]);
}

export async function addOrder(order) {
    console.log(order);
    const id = uuid();
    const db = await dbConnection;
    await db.run("INSERT INTO Orders VALUES (?, ?)", [id, order.order_status]);

    addOrderItems(id, order);
}

async function addOrderItems(id, order) {
    const db = await dbConnection;

    for (const orderItem of order.items) {
        await db.run("INSERT INTO Order_items VALUES (?, ?, ?)", [id, orderItem[0], orderItem[1]]);
    }
}