-- Active: 1673889688341@@127.0.0.1@3306

CREATE TABLE  users (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL
);

INSERT INTO users (id, email, password) 
VALUES ("3", "roberto@gmail.com", "1234" );

CREATE TABLE products (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT NOT NULL,
price REAL NOT NULL,
category TEXT NOT NULL
);

INSERT INTO products (id,name,price,category)
VALUES("3","HeadsetLogitech", 400, "periferico");


SELECT * FROM users;

SELECT * FROM products

WHERE "category" = "cozinha";


INSERT INTO users (id, email, password)
VALUES 
	("4", "Fulano@gmail.com", "1234");


SELECT * FROM products;


SELECT * FROM users
WHERE "id" = "4";
 
DELETE from products
WHERE "id" = "5";

DELETE from users
WHERE "id" = "4";

UPDATE users
set email = "fulano@gmail.com"
WHERE "id" = "4";

UPDATE products
set name = MouseLogitech,
set price = 2400,
set category = Periférico
WHERE "id" = "2";

SELECT * FROM users
ORDER BY email ASC;


SELECT * FROM products
ORDER BY price ASC
LIMIT 20  ;

SELECT * FROM products
ORDER BY price ASC
LIMIT 20  ;


SELECT * FROM products
WHERE "price" >= 2400 and  "price" <= 2500 ;


CREATE TABLE  purchases (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
total_price REAL UNIQUE NOT NULL,
paid INTEGER NOT NULL,
delivered_at TEXT,
buyer_id TEXT NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES users (id)
);

DROP TABLE purchases;

SELECT * FROM purchases;

INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES ("d001", "50", true, "00/00", "1"), ("d002", "10", false, "00/00", "1");


INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES ("d003", "75", true, "00/00", "2"), ("d004", "15", false, "00/00", "2");

UPDATE purchases
set delivered_at = "27/05"
WHERE "id" = "d002";

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id="1";

CREATE TABLE purchases_products (
purchase_id TEXT  NOT NULL,
product_id TEXT NOT NULL,
quantity INTEGER NOT NULL,
FOREIGN KEY (purchase_id) REFERENCES purchases (id),
FOREIGN KEY (product_id) REFERENCES products (id)
);


INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES("d001","1","5"),
("d002","2","2"),
("d003","3","3");

SELECT * FROM purchases_products;
DROP TABLE purchases_products;

SELECT

products.id AS productId,
products.name AS productName,
products.price AS productPrice,
products.category,
purchases.id AS purchaseId,
purchases.buyer_id AS buyerId,
purchases.total_price AS totalPrice,
purchases_products.quantity
FROM purchases_products


INNER JOIN products
ON purchases_products.product_id = products.id

INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id;