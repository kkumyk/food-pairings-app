# Food Pairings App

This app is inspired by the ["The Flavour Thesaurus"](https://www.amazon.co.uk/Flavour-Thesaurus-Niki-Segnit/dp/0747599777) book which explores pairs of food together with one or two recipes to try out. 

The idea behind this app is to merge the concept of the above book with the capabilities provided by the [Spoonacular Food API](https://spoonacular.com/food-api). As a result, the app allows to search recipes based on two ingredients provided by the user and save and store the best of them. 


## Tech Stack
- React + Typescript
- Node.js + Express.js
- PostgreSQL
- RESTful API

## Prerequisites
- Node.js and npm installed on your machine.
- PostgreSQL is set up locally on your machine. 
- [A Spoonacular API key](https://spoonacular.com/food-api) for the recipe API.

## Setting Up
1. Clone the Repository
```
git clone https://github.com/kkumyk/two-ingredients-app.git
cd two-ingredients-app
```
### Backend Setup
2. Navigate to the backend directory and install dependencies:
```
cd backend
npm install
```
3. Add .env file to the backend folder with the following content:
```
API_KEY=your-spoonacular-api-key
DATABASE_URL=connection-url
```
For the DB set-up see the ["PostgreSQL Local Setup"](#postgresql-local-setup) section below.

4. Initialize Prisma and generate the Prisma client
```
npx prisma init
npx prisma generate
```
5. Start the backend server
```
npm start
```
### Frontend Setup
1. Navigate to the frontend directory and install dependencies:
```
cd frontend
npm install
```
2. Start the frontend development server
```
npm run dev
```

## PostgreSQL Local Setup
(Ubuntu + VSCode)

1. Install PostgreSQL extension in VSCode and add a new connection by providing:
    - "host": "localhost",
    - "user": "postgres", // replace if the default user is not used
    - "port": 5432,
    - "database": "postgres", // replace if the default DB is not used
    - "password": "YOUR-PASSWORD"

2. Install PostgreSQL on Ubuntu via Synaptic Package Manager
3. Used PostgreSQL Command Line Tool - _psql_ - to create FavouriteRecipes table in the postgres db:
    - _sudo -u postgres psql_ starts interactive session
    - _\conninfo_ to check the details of your connection
    - _\l_ see the list of all DBs available
    - _\du_ see the list of all users
    - _\password postgres_ sets password for your default db
    - create a table: _CREATE TABLE "FavouriteRecipes" (id SERIAL PRIMARY KEY,"recipeId" INTEGER);_ 

4. Connect _public_ DB with the one table _FavouriteRecipes_ to the client via Prisma by adding your local connection URL to your _.env_ file:
- _DATABASE_URL=postgresql://postgres:YOUR-PASSWORD@localhost:5432/postgres_
- Sources: [Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-postgresql); [PostgreSQL](https://www.prisma.io/docs/orm/overview/databases/postgresql)


### Troubleshooting
#### Check PostgreSQL service status in Linux:
- sudo systemctl status postgresql

#### See [where does PostgreSQL stores the database](https://stackoverflow.com/questions/1137060/where-does-postgresql-store-the-database):
    - show data_directory;
    - sudo ls -l /var/lib/postgresql/15/main/

#### [Docker & Postgres: Failed to bind tcp 0.0.0.0:5432 address already in use error](https://stackoverflow.com/questions/38249434/docker-postgres-failed-to-bind-tcp-0-0-0-05432-address-already-in-use):
- sudo systemctl stop postgresql to deactivate postgres

