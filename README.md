# Food Pairing App (React, Postgres, Express, Node.js, Typescript)

## PostgreSQL Local Set-Up (Ubuntu + VSCode)

1. Installed PostgreSQL extension in VSCode and add a new connection by providing:
    - "host": "localhost",
    - "user": "postgres", // replace if the default user is not used
    - "port": 5432,
    - "database": "postgres", // replace if the default DB is not used
    - "password": "YOUR-PASSWORD"

2. Installed PostgreSQL on Ubuntu via Synaptic Package Manager
3. Used PostgreSQL Command Line Tool - _psql_ - to create FavouriteRecipes table in the postgres db:
    - _sudo -u postgres psql_ starts interactive session
    - _\conninfo_ to check the details of your connection
    - _\l_ see the list of all DBs available
    - _\du_ see the list of all users
    - _\password postgres_ sets password for your default db
    - create a table: _CREATE TABLE "FavouriteRecipes" (id SERIAL PRIMARY KEY,"recipeId" INTEGER);_ 
4. Connect _public_ DB with the one table _FavouriteRecipes_ to the client via Prisma by adding your local connection URL to your _.env_ file:
_DATABASE_URL=postgresql://postgres:YOUR-PASSWORD@localhost:5432/postgres_
Sources: [Connect your database](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/connect-your-database-node-postgresql); [PostgreSQL](https://www.prisma.io/docs/orm/overview/databases/postgresql)
