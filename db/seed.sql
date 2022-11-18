DROP DATABASE IF EXISTS e_shop;
CREATE DATABASE e_shop;

\c e_shop;

CREATE TYPE status AS ENUM
(
    'pending',
    'complete',
    'deleted'
);

CREATE TABLE users
(
    id SERIAL,
    username VARCHAR(100) NOT NULL
);

CREATE TABLE products
(
    product_id SERIAL,
    product_title VARCHAR(100) NOT NULL,
    product_desc TEXT,
    seller_id INT NOT NULL,
    price INT NOT NULL,
    quantity INT,
    image_url VARCHAR(100),
    category VARCHAR(100)
);

CREATE TABLE orders
(
    order_id SERIAL,
    user_id INT NOT NULL,
    order_status status NOT NULL
);

CREATE TABLE order_products
(
    order_id INT NOT NULL,
    product_id INT,
    quantity INT
);
