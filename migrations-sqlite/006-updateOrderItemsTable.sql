DROP TABLE Order_items;

CREATE TABLE Order_items (
    order_id VARCHAR(255),
    brick_id VARCHAR(255),
    quantity INT NOT NULL,
    FOREIGN KEY(order_id) REFERENCES Orders(order_id),
    FOREIGN KEY(brick_id) REFERENCES Bricks(id)
);