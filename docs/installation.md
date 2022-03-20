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

## Install packages

Install linter and husky, run it in root of the project:

```sh
yarn install && yarn prepare
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

We develop in two environments:

- Docker
- native environment

### Docker

See soon...

### Native environment

You need to install [PostgreSQL](https://www.postgresql.org/ "PostgreSQL official website").

### PostgresSQL installation

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

### Create database

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

Now you have user:

- username: root
- password: 1234

## Create .env files

In root of the project run:

```sh
cd docker
touch .env.dev
touch .env.test
touch .env.prod
```

According to the previously created user, and .env.template create .env.dev and .env.prod files:

```sh
DB_MODE_USER=root
DB_MODE_PASSWORD=1234
DB_MODE_DATABASE=appointment_mode
DB_MODE_HOST=localhost
DB_MODE_DIALECT=postgres
```

In result you need to get something like this for dev mode:

```sh
DB_DEV_USERNAME=root
DB_DEV_PASSWORD=1234
DB_DEV_DATABASE=appointment_dev
DB_DEV_HOST=localhost
DB_DEV_DIALECT=postgres
```
