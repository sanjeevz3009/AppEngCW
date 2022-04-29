-- Up

CREATE TABLE Bricks (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    brick_name VARCHAR(25) NOT NULL,
    color VARCHAR(20) NOT NULL,
    quantity INT NOT NULL,
    price VARCHAR(3) NOT NULL
);

INSERT INTO Bricks (id, brick_name, color, quantity, price) VALUES (
"xnshfdsafasd", "Brick 1", "Sand Green", 10, "0.10"),
("dskjdshkjhsd", "Brick 2", "Pink", 20, "0.20"),
("vcxbxcvfggzv", "Brick 3", "Blue", 50, "0.11"),
("sdgfdfgdgdfg", "Brick 4", "Purple", 12, "0.17"),
("dfkgdjjkdkdkdd", "Brick 5", "Red", 7, "0.30");

-- Down