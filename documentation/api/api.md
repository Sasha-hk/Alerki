# **REST API**

Endpoints list:

- [`/auth`](./)
  - [`/register`](#Registration)
  - [`/log-in`](#Log-in)
  - [`/log-out`](./)
  - [`/refresh`](./)

- [`/appointments`](./)
  - [`/details/:slug`](./)
  - [`/client`](./)
    - [`/get-day`](./)
    - [`/from-now`](./)
    - [`/cancel/:slug`](./)
  - [`/worker`](./)
    - [`/get-day`](./)
    - [`/from-now`](./)
    - [`/cancel/:slug`](./)
    - [`/confirm/:slug`](./)
  - [`/make-appointment`](./)

- [`/profile`](./)
  - [`/find-worker`](./)
  - [`/get-schedule`](./)
  - [`/picture`](./)
  - [`/create/service`](./)
  - [`/become-worker`](./)
  - [`/worker`](./)
    - [`/set-schdule`](./)
    - [`/update`](./)
    - [`/update/weekend-days`](./)
    - [`/become-worker`](./)

- [`/services`](./)
  - [`/find`](./)
  - [`/create`](./)

## **Registration**

```http
POST /auth/register
```

**Body:**

```json
{
    "email": "email",
    "username": "username",
    "profileType": "worker",
    "password": "qwerty"
}
```

| **Parameter** | **Type** | **Requeired** | **Options** |
| :--- | :--- | :--- | :--- |
| `email` | string | true | | |
| `username` | string | true | |
| `firstName` | string | false | |
| `lastName` | string | false | |
| `profileType` | string | true | worker \ client |
| `password` | string | true | |

**Response:**

```json
{
    "id": "1",
    "email": "email",
    "clientID": 1,
    "workerID": 1,
    "accessToken": "token..."
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | |
| `email` | string | |
| `clientID` | int | client profile id |
| `workerID` | int | worker profile id |
| `accessToken` | string | access token |

**Cookies:**

- accessToken
- refreshToken

## **Log-in**

**Body:**

```json
{
    "email": "email",
    "password": "qwerty"
}
```

| **Parameter** | **Type** | **Requeired** |
| :--- | :--- | :--- |
| `email` | string | true | |
| `password` | string | true |

**Response:**

```json
{
    "id": "1",
    "email": "email",
    "clientID": 1,
    "workerID": 1,
    "accessToken": "token..."
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | user id |
| `email` | string | user email |
| `clientID` | int | client profile id |
| `workerID` | int | worker profile id |
| `accessToken` | string | access token |

**Cookies:**

- accessToken
- refreshToken
