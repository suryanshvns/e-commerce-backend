# agile-world-technologies-NodeService

agile-world-technologies-NodeService.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Node@v12.x.x
postgres@2.18.1
```
### Environment variable used in application.

| Variable            | Description                                           | Example                                             | 
| ------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| SERVER_PORT         | Set this variable to run your app on this port        | 3002                                                |
| DB_CONNECTION_STRING| This variable is used to connect with database        | dialect://username:password@host:port/database_name |

### Installing

A step by step series that will tell you how to get a development env running

```
$ cd server
```

```
$ npm ci


Create Database:
```
$ node_modules/.bin/sequelize db:create --url 'dialect://username:password@host:port/database_name'
```
| keyword       | Example         |Description                        |
| ------------- | --------------- |---------------------------------- |
| dialect       | postgres        |Database we are using              |
| username      | root            |Username for the database          |
| password      | postgres        |Password for the database          |
| host          | localhost/IP    |Host on which database is running  |
| port          | 5432            |Port for the database              |
| database_name | sample_database |Database name for the microservice |

Create Migrations:
```
$ node_modules/.bin/sequelize migration:create --name migration_name
```

Run Migrations:
```
$ node_modules/.bin/sequelize db:migrate --url 'dialect://username:password@host:port/database_name'
```
| keyword       | Example         |Description                                     |
| ------------- | --------------- |----------------------------------------------- |
| dialect       | postgres           |Database we are using                           |
| username      | root            |Username for the database                       |
| password      | postgres           |Password for the database                       |
| host          | localhost/IP    |Host on which database is running               |
| port          | 5432            |Port for the database                           |
| database_name | sample_database |Database name from which migrations will happen |

## Run the Server

* For Development
```
$ npm run start:dev
```
* For Production
```
$ npm run start
```
## Run the test cases

```
$ npm run test
```
## For Validating Modules

```
$ npm run test-nsp
```
## For linting

```
$ npm run test-lint
```
