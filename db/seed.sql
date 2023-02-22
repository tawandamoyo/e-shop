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
    'cart',
    'complete'
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
    product_id      INT,
    order_status    status NOT NULL
);

INSERT INTO users (id, username, email, role)
VALUES (1000001, 'admin', 'admin@eshop.com', 'seller');

INSERT INTO products (product_title, product_desc, seller_id, price, quantity, image_url, category)
VALUES 
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('kindle paperwhite', 'An excellent iphone', 1000001, 10000, 40, 'https://media.wired.com/photos/6154b830a28af156d45214e2/master/w_2580,c_limit/Gear-Amazon-Kindle-Paperwhite.jpg', 'electronics'),
    ('Dell Monitor', 'Lovely 27 inch screen', 1000001, 25000, 50, 'https://m.media-amazon.com/images/I/81Nl5+gTuuL.jpg', 'electronics'),
    ('Nokia 3310', 'An excellent phone, blast from the past', 1000001, 2000, 50, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQNOAVqrNS9bz4bwCeYBI1-optfHRT9Ny2lA&usqp=CAU', 'electronics'),
    ('iphone 14', 'An excellent iphone', 1000001, 100000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics'),
    ('iphone 10', 'An excellent iphone', 1000001, 80000, 50, 'https://media.wired.com/photos/5bcf71b1dc9f582b9e25a8d8/1:1/w_1200,h_1200,c_limit/iphone2_featured.jpg', 'electronics')
