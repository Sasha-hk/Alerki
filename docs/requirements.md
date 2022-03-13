# Requirements

Vision of the project concept.

Content:

- [Requirements](#requirements)
  - [1. System description](#1-system-description)
  - [2. Registration](#2-registration)
  - [3. User types](#3-user-types)
    - [Client](#client)
    - [Master](#master)
  - [4. Entities](#4-entities)
    - [Master service](#master-service)
    - [Appointment](#appointment)
  - [5. Tech stack](#5-tech-stack)
    - [API](#api)
    - [Frontend](#frontend)

## 1. System description

The system give ability for clients to make easy an appointments. Masters can easy manage and plan their work.

The systemd consists of such blocks:

- Registration, authentication, and authorization
- Functionality for master
- Functionality for client
- Notifications

Ths website should be multilingual, support languages:

- English
- Ukrainian
- Russian

Tech stack see [below](#4-tech-stack)

## 2. Registration

We need to support registration / authentication with popular authentication providers, such as:

- Google - first priority
- Apple - second priority
- Facebook - second priority

Also we need have our own authentication system, the system should base on [JWT](https://jwt.io/ "JWT official website")

To register on the website user need provide such data:

- email - required
- username - required
- phone number - required
- profile type (master / client) - required

Whe user sign-in with Google for example, we take such data:

- first name - required
- last name - required
- email - required
- picture - if exists
- phone number - if exists

## 3. User types

The system has such user types:

- Client
- Master

### Client

Client functionality:

- make an appointment
- edit his profile

Profile information:

- full name
- picture
- phone number
- username

### Master

Master functionality:

- make an appointment to other masters
- edit his profile

Profile information:

- full name
- picture
- phone number
- username
- master services
- biography

## 4. Entities

Description of:

- appointment
- master service

### Master service

Master service consists of:

- service name
- duration
- currency
- price
- location

### Appointment

Appointment consists of:

- master id
- client id
- master service id
- duration
- start date
- end date

## 5. Tech stack

Production environment: [Docker](https://www.docker.com/ "Docker official website")

Database: [PostgreSQL](https://www.postgresql.org/ "PostgreSQL official website")

Programming language: [TypeScript](https://www.typescriptlang.org/ "TypeScript official website")

Platform: [Node.js](https://nodejs.org/en/ "Official website Node.js")

Package manager: [Yarn](https://yarnpkg.com/ "Yarn official website")

The project consists of two parts:

- [API](#api)
- [frontend](#frontend)

### API

Frameworks:

- [Express.js](https://expressjs.com/ "Express.js official website")
- [Sequelize](https://sequelize.org/ "Sequelize official website")

### Frontend

Frameworks:

- [React.js](https://reactjs.org/ "React.js official website")
- [Next.js](https://nextjs.org/ "Next.js official website")
- [Redux](https://redux.js.org/ "Redux official website")
