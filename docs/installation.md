# Installation

Table of contents:

- [Installation](#installation)
  - [Install packages](#install-packages)
  - [Database](#database)
    - [Docker](#docker)
    - [Native environment](#native-environment)
      - [PostgresSQL installation](#postgressql-installation)
      - [Create database](#create-database)
  - [Create .env files](#create-env-files)
  - [Development mode](#development-mode)
  - [Testing mode](#testing-mode)

Here you can find guide how to configure application for development and testing, but not for production mode.

## Install packages

Install linter and husky, run it in root of the project:

```sh
yarn install
```

Install API packages:

```sh
cd api
yarn install
```

Install frontend packages:

```sh
cd ..
cd frontend
yarn install
```

## Database

You can use Docker of native database, but we recommend to use Docker. See down below how to use Docker or native environment. Also you will need to create .env files, see how to make it below.

### Docker

Install Docker on your computer. You can download it [here](https://www.docker.com/ "Docker official website")

In root of the project install packages:

```sh
yarn install
```

And run the following command:

```sh
yarn start-dev-db
```

Now you started development database in Docker

To start testing database run this:

```sh
yarn start-test-db
```

### Native environment

You need to install [PostgreSQL](https://www.postgresql.org/ "PostgreSQL official website").

#### PostgresSQL installation

One of the possible options:

```sh
apt install postgresql
```

Check if postgresql service is run:

```sh
systemctl status postgresql
```

it should return something like this:

```sh
● postgresql.service - PostgreSQL RDBMS
     Loaded: loaded (/lib/systemd/system/postgresql.service; disabled; vendor preset: disabled)
     Active: active (exited) since Sun 2022-03-20 22:57:58 EET; 23min ago
   Main PID: 53645 (code=exited, status=0/SUCCESS)
        CPU: 1ms

Mar 20 22:57:58 username systemd[1]: Starting PostgreSQL RDBMS...
Mar 20 22:57:58 username systemd[1]: Finished PostgreSQL RDBMS.
```

#### Create database

Connect to postgresql:

```sh
runuser -u postgres psql
```

or

```sh
sudo -u postgres
```

Create databases:

```sh
CREATE DATABASE appointment_dev;
CREATE DATABASE appointment_test;
CREATE DATABASE appointment_prod;
```

Create user:

```sh
create user root with encrypted password '1234';
```

Grant permissions to a new user:

```sh
grant all privileges on database appointment_dev to root;
grant all privileges on database appointment_test to root;
grant all privileges on database appointment_prod to root;
```

## Create .env files

In root of the project run:

```sh
cd docker
touch .env.dev
```

Put into .env.dev file the following variables:

```sh
API_PORT=3001
FRONTEND_PORT=3000

API_URL="http://localhost:${API_PORT}"
CLIENT_HOST="http://localhost:${FRONTEND_PORT}"

DB_DEV_USER=root
DB_DEV_PASSWORD=1234
DB_DEV_DATABASE=appointment_dev
DB_DEV_HOST=localhost
DB_DEV_PORT=5552
DB_DEV_DIALECT=postgres

JWT_ACCESS_SECRET=secret
JWT_REFRESH_SECRET=secret

GOOGLE_CLIENT_ID=id
GOOGLE_CLIENT_SECRET=secret
GOOGLE_REDIRECT_URL="http://localhost:${CLIENT_HOST}/"

NODE_ENV=dev
```

> The example variables contains in [.env.template](../docker/.env.template) file.

## Development mode

To start development the API you need to start database:

```sh
yarn start-dev-db
```

Now you cat start development, run this:

```sh
cd api
yarn dev
```

Ready!

## Testing mode

To start testing you need to start database, in the root of the project run:

```sh
yarn start-test-db
```

And start tests:

```sh
cd api
yarn test
```
