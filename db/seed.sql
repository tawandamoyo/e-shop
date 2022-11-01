/*
   Db definitions:

-- table pizza_toppings [note: "many to many"] {
--   pizza_id integer [not null]
--   topping_name VARCHAR(100) NOT NULL null]
--   topping_quantity integer [not null, default: 1]
-- }

-- table pizzas [note: "many to many"] {
--   id integer [unique, pk, not null]
--   size pizza_sizes [not null]
--   order_id integer [not null]
--   quantity integer [not null, default: 1]
-- }

-- enum order_status {
--   pending 
--   complete
--   cancelled
-- }

-- enum pizza_sizes {
--   small
--   medium
--   large
-- }

-- ref {
--   orders.id < pizzas.order_id
-- }

-- ref {
--   pizzas.id - pizza_toppings.pizza_id
-- }

*/

-- ref {
--   pizza_toppings.topping_name VARCHAR(100) NOT NULLd
-- }

-- ref {
--   pizzas.size > pizza_prices.size
-- }

-- ref {
--   toppings.id > topping_prices.toppiVARCHAR(100) NOT NULL


DROP DATABASE IF EXISTS pizzaorders;

CREATE DATABASE pizzaorders;

\c pizzaorders;

CREATE TYPE order_status AS ENUM
(
    'pending',
    'complete',
    'cancelled'
);

CREATE TYPE pizza_sizes AS ENUM
(
    'small',
    'medium',
    'large'
);

CREATE TYPE pizza_base AS ENUM
(
    'traditional',
    'pan'
);

CREATE TABLE toppings
(
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY(name)
);

CREATE TABLE pizza_prices
(
    size VARCHAR(100) NOT NULL,
    price INT
);

CREATE TABLE topping_prices
(
    topping_name VARCHAR(100) NOT NULL,
    size VARCHAR(100) NOT NULL,
    price INT
);

CREATE TABLE orders
(
    id SERIAL,
    status order_status NOT NULL,
    delivery_address TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE pizza_toppings
(
    pizza_id INT NOT NULL,
    topping_name VARCHAR(100) NOT NULL,
    topping_quantity INT NOT NULL DEFAULT 1
);

CREATE TABLE pizzas
(
    id SERIAL,
    size pizza_sizes NOT NULL,
    base pizza_base NOT NULL,
    order_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY(id)
);

INSERT INTO toppings ( name )
VALUES 
    ('bacon'),
    ('anchovy'),
    ('chicken'),
    ('calamari'),
    ('ham'),
    ('avocado'),
    ('green chilli'),
    ('pineapple'),
    ('mozzarella cheese'),
    ('chedar cheese'),
    ('feta cheese')
;

INSERT INTO pizza_prices (size, price)
VALUES
    ('small', 500),
    ('medium', 700),
    ('large', 1000)
;

INSERT INTO topping_prices (topping_name, size, price)
VALUES
    ('bacon', 'small', 50),
    ('bacon', 'medium', 75),
    ('bacon', 'large', 100),

    ('anchovy', 'small', 50),
    ('anchovy', 'medium', 75),
    ('anchovy', 'large', 100),

    ('chicken', 'small', 50),
    ('chicken', 'medium', 75),
    ('chicken', 'large', 100),

    ('calamari', 'small', 50),
    ('calamari', 'medium', 75),
    ('calamari', 'large', 100),

    ('ham', 'small', 50),
    ('ham', 'medium', 75),
    ('ham', 'large', 100),

    ('avocado', 'small', 50),
    ('avocado', 'medium', 75),
    ('avocado', 'large', 100),

    ('green chilli', 'small', 50),
    ('green chilli', 'medium', 75),
    ('green chilli', 'large', 100),

    ('pineapple', 'small', 50),
    ('pineapple', 'medium', 75),
    ('pineapple', 'large', 100),

    ('mozzarella cheese', 'small', 50),
    ('mozzarella cheese', 'medium', 75),
    ('mozzarella cheese', 'large', 100),

    ('chedar cheese', 'small', 50),
    ('chedar cheese', 'medium', 75),
    ('chedar cheese', 'large', 100),

    ('feta cheese', 'small', 50),
    ('feta cheese', 'medium', 75),
    ('feta cheese', 'large', 100)

;
