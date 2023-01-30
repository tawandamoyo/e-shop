DROP DATABASE IF EXISTS e_shop;
CREATE DATABASE e_shop;

\c e_shop;

CREATE TYPE role_type AS ENUM
(
    'buyer',
    'seller'
);

CREATE TYPE status AS ENUM
(
    'pending',
    'complete',
    'deleted'
);

CREATE TABLE users
(
    id              SERIAL,
    username        VARCHAR(100)    NOT NULL,
    email           VARCHAR(100)    NOT NULL UNIQUE,
    role            role_type       NOT NULL
);

CREATE TABLE products
(
    product_id      SERIAL,
    product_title   VARCHAR(100)    NOT NULL,
    product_desc    TEXT,
    seller_id       INT             NOT NULL,
    price           INT             NOT NULL,
    quantity        INT,
    image_url       TEXT,
    category        VARCHAR(100)
);

CREATE TABLE orders
(
    order_id        SERIAL,
    user_id         INT NOT NULL,
    order_status    status NOT NULL
);

CREATE TABLE order_products
(
    order_id        INT NOT NULL,
    product_id      INT,
    quantity        INT
);

INSERT INTO users (id, username, email, role)
VALUES (1000001, 'admin', 'admin@eshop.com', 'seller');

INSERT INTO products (product_title, product_desc, seller_id, price, quantity, image_url, category)
VALUES 
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('kindle paperwhite', 'An excellent iphone', 1000001, 10000, 40, 'https://unsplash.com/photos/VEoUWF2iQlQ', 'electronics'),
    ('Dell Monitor', 'Lovely 27 inch screen', 1000001, 25000, 50, 'https://unsplash.com/photos/UzbvepPfb14', 'electronics'),
    ('Nokia 3310', 'An excellent phone, blast from the past', 1000001, 2000, 50, 'https://en.wikipedia.org/wiki/File:Nokia_3310_Blue_R7309170_(retouch).png#/media/File:Nokia_3310_Blue_R7309170_(retouch).png', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://unsplash.com/photos/kFDVRCZWwlA', 'electronics')
