# Requirements

Vision of the project concept.

Table of contents:

- [Requirements](#requirements)
  - [1. System description](#1-system-description)
  - [2. Target audience](#2-target-audience)
  - [3. Registration](#3-registration)
  - [4. User types](#4-user-types)
    - [Client](#client)
    - [Master](#master)
  - [5. Entity](#5-entity)
    - [Master service](#master-service)
    - [Appointment](#appointment)
  - [6. Tech stack](#6-tech-stack)
    - [API](#api)
    - [Frontend](#frontend)

## 1. System description

The system give ability for clients to find master and make an appointments. Masters can easy manage and plan their work.

Navigation has the following pages:

- home
- notification
- profile

If user is client, on home page his can make an appointment and see planned appointments. If user is master, on home page his can see schedule and master appointments.

On notification page client and master can see their notification, for example for master: you received request to make an appointment.

On profile page user can see his profile, also he can go to settings page where can edit profile information.

If use is not authenticated, we show for the user home page where he can make an appointment, he goes through the steps to make an appointment, but where he tap on confirm button he need authorize, we modal window where he can make it. After authentication he can complete appointment.

To make an appointment user need to select: service, master, date, and time, after that all he can confirm appointment.

Read more about client and master functionality [below](#3-user-types)

The system consists of such blocks:

- Registration, authentication, and authorization
- Functionality for master
- Functionality for client
- Notifications

The website should be multilingual, support languages:

- English
- Ukrainian
- Russian

Tech stack see [below](#4-tech-stack)

## 2. Target audience

The system will be useful for people who are often make an appointment, and master who work a lot. So the website need nice design.

## 3. Registration

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

## 4. User types

The system has such user types:

- Client
- Master

### Client

Client functionality:

- make an appointment
- cancel appointment
- edit his profile

Profile information:

- full name
- picture
- phone number
- username

### Master

Master functionality:

- make an appointment to other masters
- confirm incoming appointment
- cancel incoming appointment
- cancel confirmed appointment
- edit his profile

Profile information:

- full name
- picture
- phone number
- username
- master services
- biography

## 5. Entity

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

## 6. Tech stack

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

- [Nest.js](https://nestjs.com/ "Nest.js official website")
- [Prisma](https://www.prisma.io/ "Prisma official website")

### Frontend

Frameworks:

- [React.js](https://reactjs.org/ "React.js official website")
- [Next.js](https://nextjs.org/ "Next.js official website")
- [Redux](https://redux.js.org/ "Redux official website")
