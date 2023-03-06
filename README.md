
## Description

This is an e-commerce site built with NodeJS, Express,  React and PostgreSQL. The specifications for this project are found at [specs](Specs.md).


## Structure


### Backend

The backend is in `backend`. 

### Frontend

This project uses React as the frontend library and Redux for state management. The user interface is built using Material UI.

### db

The database is PostgreSQL with Knex

### Testing

Tests are written with Jest and supertest.

## Installation

First install the dependencies: 

```bash
npm install
```

```bash
npm run seed
```

This will seed the database with dummy data.

Then to start the server:

```bash
npm run serve
```

then,

```bash
npm run dev
```

This will start a dev server and the app will be available on http://localhost:3000
