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
