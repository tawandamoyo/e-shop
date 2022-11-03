# Pizza Ordering App

## Description

This is a mock pizza ordering app. You can enter your address, select pizza size, toppings etc and place an order. The orders will be saved to a PostgreSQL database.

## Structure

The app uses React, Express and PostgreSQL.

### Backend

The backend is in `backend`. 

### Frontend

Frontend is React.


### db

The database is PostgreSQL

[database schema diagram](https://dbdiagram.io/d/62e2a215f31da965e834357f)

## Installation

run:

```bash
npm install
```

run 

```bash
npm run seed
```

This will set up the database, seed it with prices etc. The seed file is located in `db/seed.sql`.

Next run:

```bash
npm run serve
```

This will start a dev server and the app will be available on http://localhost:3000