DROP TABLE Orders;

CREATE TABLE Orders (
    order_id VARCHAR(255) PRIMARY KEY NOT NULL,
    order_status VARCHAR(15) NOT NULL
);