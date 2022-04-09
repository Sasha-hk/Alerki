# Alerki API

Table of contents:

- [Alerki API](#alerki-api)
  - [Conventions](#conventions)
  - [General response types](#general-response-types)
    - [Private user data](#private-user-data)
  - [Authentication](#authentication)
    - [Registration](#registration)
    - [Log-in](#log-in)
    - [Log-out](#log-out)
    - [OAuth2.0 with Google](#oauth20-with-google)
    - [Get devices](#get-devices)
    - [Delete device](#delete-device)
    - [Refresh tokens](#refresh-tokens)
  - [Services](#services)
    - [Get services](#get-services)
  - [**Endpoints list**](#endpoints-list)

## Conventions

The base URL to send all API requests is <https://api.alerki.com>. HTTPS is required for all API requests.

The Alerki API follows RESTful conventions when possible, with most operations performed via GET, POST, PATCH, and DELETE requests.

## General response types

### Private user data

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "username": "guess",
  "firstName": "first",
  "lastName": "last",
  "email": "example@example.com",
  "phoneNumber": "+100 000 000 000",
  "pictureID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "profileType": "client",
  "clientID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "masterID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "banned": false,
}
```

## Authentication

### Registration

```http
POST /auth/register
```

**Body:**

```json
{
  "email": "email",
  "username": "username",
  "profileType": "master",
  "password": "qwerty"
}
```

**Params:**

| **Param** | **Type** | **Required** |
| :--- | :--- | :--- |
| `email` | string | true |
| `username` | string | true |
| `profileType` | client \| master | true |
| `password` | string | true |

**Response:**

[General user type response](#private-user-data)

### Log-in

```http
POST /auth/log-in
```

**Body:**

```json
{
  "username": "username",
  "password": "qwerty"
}
```

**Params:**

| **Param** | **Type** | **Required** |
| :--- | :--- | :--- |
| `email` \| `username` | string | true |
| `password` | string | true |

**Response:**

[General user type response](#private-user-data)

### Log-out

```http
GET /auth/log-out
```

### OAuth2.0 with Google

```http
GET /auth/oauth/google?code=...
```

**Query:**

| **Param** | **Type** | **Required** |
| :--- | :--- | :--- |
| `code` | string | true |

**Response:**

[General user type response](#private-user-data)

### Get devices

```http
GET /auth/devices
```

**Response:**

```json
[
  {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "userID": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "deviceName": "IPhone 8",
    "createdAt": "1970-01-01T01:00:00.000Z",
    "updatedAt": "1970-01-01T01:00:00.000Z",
  }
]
```

### Delete device

```http
DELETE /auth/:id
```

**URL part:**

| **Param** | **Type** | **Required** |
| :--- | :--- | :--- |
| `id` | string | true |

### Refresh tokens

```http
GET /auth/refresh
```

**Requirements:**

- user need to be authenticated

**Response:**

[General user type response](#private-user-data)

## Services

### Get services

```http
GET /services?name=...
```

**Query:**

| **Param** | **Type** | **Required** | **Description** |
| :--- | :--- | :--- | :--- |
| `name` | string | true | Service name to find |

**Response:**

```json
[
  {
    "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    "name": "haircut",
    "available": true,
    "createdAt": "1970-01-01T01:00:00.000Z",
    "updatedAt": "1970-01-01T01:00:00.000Z",
  }
]
```

## **Endpoints list**

<<<<<<< HEAD
<!-- no toc -->
- [`/auth`](#authentication)
  - [`POST /register`](#registration)
  - [`POST /log-in`](#log-in)
  - [`GET /log-out`](#log-out)
  - [`GET /callback/google`](#oauth20-with-google)
  - [`GET /devices`](#get-devices)
  - [`DELETE /device`](#delete-device)
  - [`GET /refresh`](#refresh-tokens)

- [`/services GET`](#services)

- /user
  - /client
    - [`GET /appointments?for=[date]`](# "under development")
  - /master
    - [`GET /appointments?for=[date]`](# "under development")
    - [`POST /service`](# "under development")
    - [`DELETE /service`](# "under development")
    - [`PAtCH /service`](# "under development")
  - [`PATCH /profile`](# "under development")
  - /become
    - [`PATCH /master`](# "under development")
    - [`PATCH /client`](# "under development")

- /profile
  - [`GET /[username]`](# "under development")
  - [`GET /services/[master_id]`](# "under development")
  - [`GET /picture/[id]`](# "under development")
  - [`PATCH /profile`](# "under development")
  - /master
    - [`POST /service`](# "under development")
    - [`DELETE /service`](# "under development")
    - [`PAtCH /service`](# "under development")
  - /become
    - [`PATCH /master`](# "under development")
    - [`PATCH /client`](# "under development")

- /appointment
  - [`GET /details/[slug]`](# "under development")
  - /steps
    - [`GET /masters?service_id=[id]`](# "under development")
    - [`GET /schedule?master_id=[id]&for=[date]`](# "under development")
    - [`POST /make`](# "under development")
  - /client
    - [`POST /cancel/[slug]`](# "under development")
  - /master
    - [`POST /cancel/[slug]`](# "under development")
    - [`POST /confirm/[slug]`](# "under development")
