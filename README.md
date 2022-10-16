# Pizza Ordering App

## Description

This is a mock pizza ordering app.

## Structure

The app uses React, Express and PostgreSQL.

### Backend

The backend is in `backend`. 

### Frontend
Frontend is React.


## db

https://dbdiagram.io/d/62e2a215f31da965e834357f



1. add toppings prices
2. calculate total price of order
    - query for relevant row -> size, toppings amount etc
3. display this on the ui
4. place order, change order status in the orders table

have a route in the server, called whenever a pizza size/toppings changes
