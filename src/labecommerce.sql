-- Active: 1673889688341@@127.0.0.1@3306

CREATE TABLE  users (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT UNIQUE NOT NULL,
email TEXT UNIQUE NOT NULL,
password TEXT NOT NULL,
createdAt TEXT DEFAULT (DATETIME()) NOT NULL,
status INTEGER DEFAULT (0) NOT NULL
);

DROP TABLE users;

INSERT INTO users (id, name, email, password) 
VALUES ("1", "joão", "joão@gmail.com", "1234"),("2", "josé", "josé@gmail.com", "1234"),("3", "joas", "joas@gmail.com", "1234");

CREATE TABLE products (
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT NOT NULL,
price REAL NOT NULL,
description TEXT NOT NULL,
imageUrl TEXT
);

DROP TABLE products;

INSERT INTO products (id,name,price,description,imageUrl)
VALUES("1","HeadsetGamer", 400, "Melhor headset para jogos","https://th.bing.com/th/id/OIP.RnzfmvWDRQ9GitrTp12yRgHaHa?pid=ImgDet&rs=1"),
("2","MouseGamer", 300, "mouse preciso para games","https://th.bing.com/th/id/OIP.1wnQhbAx1l4PsraOdp4gtwHaGS?pid=ImgDet&rs=1"),
("3","MonitorGamer", 1600, "Monitor de 144hz para jogos","https://th.bing.com/th/id/OIP.KO_rSdcpvQZVM_8MZurcSwHaHJ?pid=ImgDet&rs=1");


SELECT * FROM users;

SELECT * FROM products

WHERE "category" = "cozinha";


INSERT INTO users (id, email, password)
VALUES 
	("4", "Fulano@gmail.com", "1234");


SELECT * FROM products;


SELECT * FROM users
WHERE "id" = "1";
 
DELETE from products
WHERE "id" = "5";

DELETE from purchases_products
WHERE "product_id" = "2";

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
buyer TEXT NOT NULL,
buyer_id TEXT NOT NULL,
totalPrice REAL NOT NULL,
createdAt TEXT DEFAULT (DATETIME()) NOT NULL,
paid INTEGER NOT NULL,
FOREIGN KEY (buyer_id) REFERENCES users (id)
FOREIGN KEY (buyer) REFERENCES users (name)
);

INSERT INTO purchases(id,buyer,buyer_id,totalPrice,paid)
VALUES("d001","joão","1","50","false");

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
quantity TEXT ,
FOREIGN KEY (purchase_id) REFERENCES purchases (id),
FOREIGN KEY (product_id) REFERENCES products (id)
);


INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES("d001","1","5"),
("d001","2","2"),
("d001","3","3");

SELECT * FROM purchases_products;
DROP TABLE purchases_products;

SELECT

products.id AS productId,
products.name AS productName,
products.price AS productPrice,
products.description,
products.imageUrl,
purchases.id_compra AS purchaseId,
purchases.buyer_id AS buyerId,
purchases.buyer,
users.email,
purchases.totalPrice AS totalPrice,
purchases_products.quantity

FROM purchases_products

INNER JOIN users
ON purchases.buyer_id = users.id

INNER JOIN products
ON purchases_products.product_id = products.id

INNER JOIN purchases
ON purchases_products.purchase_id = purchases.id_compra;