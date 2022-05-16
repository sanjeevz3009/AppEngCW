DROP TABLE Orders;

CREATE TABLE Orders (
    order_id VARCHAR(255) PRIMARY KEY NOT NULL,
    total_price VARCHAR(5) NOT NULL,
    order_status VARCHAR(15) NOT NULL
);

CREATE TABLE Order_items (
    brick_id VARCHAR(255),
    order_id VARCHAR(255),
    quantity INT NOT NULL,
    FOREIGN KEY(brick_id) REFERENCES Bricks(id),
    FOREIGN KEY(order_id) REFERENCES Orders(order_id)
);