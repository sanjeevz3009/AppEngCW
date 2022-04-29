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

export async function findBrick(id) {
    const db = await dbConnection;
    return db.get("SELECT * FROM Bricks WHERE id = ?", id);
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