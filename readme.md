# OLX Clone Api
this repository manages Olx Clone API, made for educational purpose only, includes user's basic features and advertises features, to Read full Swagger Documentation copy [swagger.yaml](https://gitlab.com/iakash/olx-api/blob/77f6781dbb1281a865353ef585abbff061c334af/api/swagger/swagger.yaml)'s content and paste it in [Swagger Editor](https://editor.swagger.io/).

## Prerequisites:

1. Node.js >= 8.9.x/NPM
2. postgresql >= 9.5 version

## Setup
clone this repository

```
$ git clone https://gitlab.com/iakash/olx-database-exercise.git
```

### Setup Without Using Docker:

* Run below command to install required packages.

```
npm install
```
* make .env file for Configrations using example.env Or Rename example.env to .env

```
example.env -> .env
```

### Setup Using Docker:
***Note: For this Setup Docker is Required.***

* Edit enviroment variables in ``` setup.sh ```


* give permission to shell script, using below command:


```
$ sudo chmod +x setup.sh
```

## Schema Migration
***Note: this is the first step to begin with this Project after Setup.***

give executable permission to ```migrate.sh``` file:

```
$ sudo chmod +x migrate.sh
```
Run Schema Migrations by following command:

```
npm run migration
```
it will ask for database access information, simple enter all information and it will do schema migration.

## Seed Database
***Note: Before seeding database make sure you have run schema migration.***

OR

***Note: Do not run this if you want to ```npm test``` first.***

there are total 7 csv data which will seed into database tables, before that make sure you have properly setup your .env file.

Now to run seeding process, use below command:

```
$ npm run seeder
```
this will import every csv to corresponding database table.

## Run

### Run Without Using Docker:

* start api server using below command:

```
npm start
```

### Run Using Docker:
***Note: For this Setup Docker is Required.***

* Run below command to start API server in docker.

```
./setup.sh
```

## Test:

Run Test using following command:

```
$ npm test
```
