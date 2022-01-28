# **REST API**

Endpoints list:

- [`/auth`](#Authentication)
  - [`/register`](#Registration)
  - [`/log-in`](#Log-in)
  - [`/log-out`](#Log-out)
  - [`/refresh`](#Refresh)

- [`/appointments`](#Appointments)
  - [`/details/:slug`](#Appointment-details)
  - `/client`
    - [`/get-day`](#Client-appointments-for)
    - [`/from-now`](#Client-appointments-from-not)
    - [`/cancel/:slug`](#Client-cancel-appointment)
  - `/worker`
    - [`/get-day`](#Worker-appointments-for)
    - [`/from-now`](#Worker-appointments-from-now)
    - [`/cancel/:slug`](#Worker-cancel-appointment)
    - [`/confirm/:slug`](#Worker-confirm-appointment)
  - [`/make-appointment`](#Make-appointment)

- [`/profile`](#Profile)
  - [`/find-worker`](#Find-worker)
  - [`/get-schedule`](#Get-worker-schedule)
  - [`/picture`](#Picture)
  - [`/create/service`](#Create-worker-service)
  - [`/become-worker`](#Become-worker)
  - `/worker`
    - [`/set-schdule`](#Set-worker-schedule)
    - [`/update`](#Update-worker-profile)
    - [`/update/weekend-days`](#Update-weekend-days)

- [`/services`](#Services)
  - [`/find`](#Find-service)
  - [`/create`](#Create-service)

## **Authentication**

### **Registration**

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

---

### **Log-in**

```http
POST /auth/log-in
```

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

---

### **Log-out**

```http
GET /auth/log-out
```

**Requirements:**

User need to be authenticated

**Response:**

```http
200 OK
```

**Cookies:**

- remove - accessToken
- remove - refreshToken

### **Refresh**

```http
GET /auth/refresh
```

**Requirements:**

User need to be authenticated

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

## **Services**

### **Find service**

```http
GET /services/find
```

**Querys:**

- name
- limit
- page

| **Query** | **Requeired** | **Default** |
| :--- | :--- | :--- |
| `name` | true | |
| `limit` | false | 20 |
| `page` | false | 0 |

**Response:**

```json
[ 
    { 
        "id": 1, 
        "name": "heircut" 
    }
]
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | service id |
| `name` | string | service name |

---

### **Create service**

```http
POST /services/create
```

**Body:**

```json
{
    "name": "name"
}
```

| **Parameter** | **Type** | **Requeired** | **Description** |
| :--- | :--- | :--- | :--- |
| `name` | string | true | new service name |

**Response:**

```json
{
    "id": 1,
    "name": "heircut",
    "updatedAt": "2022-01-26T22:49:53.391Z",
    "createdAt": "2022-01-26T22:49:53.391Z"
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | |
| `name` | string | new service name |
| `updatedAt` | string | creation time |
| `createdAt` | string | updation time |

## **Profile**

### **Find worker**

```http
GET /profile/find-worker
```

**Querys:**

- service_id
- limit
- page

| **Query** | **Type** | **Requeired** | **Description** |
| :--- | :--- | :--- | :--- |
| `service_id` | int | true | service id |
| `limit` | int | false | |
| `page` | int | false | |

**Response:**

```json
[
    {
        "id": 1,
        "workerID": 1,
        "username": "Alan",
        "firstName": null,
        "lastName": null,
        "pictureID": null,
        "service": {
            "id": 1,
            "currency": "UAN",
            "price": "100",
            "location": null,
            "duration": 1200000,
            "serviceID": 1
        }
    }
]
```

In response, we receive an array of users with the specified service in the request

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | |
| `workerID` | int | worker profile id |
| `username` | string | username |
| `firstName` | string | user first name |
| `lastName` | string | user last name |
| `pictureID` | int | user picture id |
| `service` | object | service |
| `service.id` | int | id |
| `service.currency` | string | service currency |
| `service.price` | string | service price |
| `service.location` | string | service location |
| `service.duration` | int | service duration |
| `service.serviceID` | int | service id it specefied in request |

---

### **Get worker schedule**

```http
GET /profile/get-schedule
```

**Querys:**

- year
- month
- worker_id

| **Query** | **Type** | **Requeired** | **Description** |
| :--- | :--- | :--- | :--- |
| `year` | int | true | schedule for year |
| `month` | int | true | schedule for month |
| `worker_id` | int | true | schedule for worker |

**Response:**

```json
{
    "weekendDays": {
        "monday": null,
        "tuesday": null,
        "wednesday": null,
        "thursday": null,
        "friday": true,
        "saturday": null,
        "sunday": null
    },
    "workingStartTime": 32400000,
    "workingEndTime": 57600000,
    "schedule": [
        {
            "id":  1,
            "workerID":  1,
            "workingStartTime":  null,
            "workingEndTime":  null,
            "weekendDay":  true,
            "date":  "2022-02-12",
            "createdAt":  "2022-01-28T10:00:25.543Z",
            "updatedAt":  "2022-01-28T10:00:25.543Z"
        },
        {
            "id": 2,
            "workerID": 1,
            "workingStartTime": 21600000,
            "workingEndTime": 68400000,
            "weekendDay": null,
            "date": "2022-02-07",
            "createdAt": "2022-01-28T10:00:25.552Z",
            "updatedAt": "2022-01-28T10:00:25.552Z"
        }
    ]
}
```

In response, we receive an array of users with the specified service in the request

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `weekendDays` | int | |
| `weekendDays.monday ... sunday` | bool | weekend day |
| `workingStartTime` | int | general start working time in milliseconds |
| `workingEndTime` | int | general end working time in milliseconds |
| `schedule` | object | schedule |
| `schedule.id` | int | schedule id |
| `schedule.workerID` | object | workerID |
| `schedule.workingStartTime` | string | start working time in milliseconds for date belowe |
| `scheudle.workingEndTime` | string | end working time in milliseconds for date belowe |
| `schedule.weekendDay` | bool | service location |
| `schedule.date` | string | service duration |

---

### **Picture**

```http
GET /profile/picture/:id
```

**Response:**

Image

---

### **Create worker service**

```http
POST /profile/create/service
```

**Body:**

```json
{
    "name": "haircut",
    "currency": "USD",
    "price": "20",
    "location": "San Francisco",
    "duration": 1200000,
}
```

| **Parameter** | **Type** | **Requeired** | **Description** |
| :--- | :--- | :--- | :--- |
| `name` | string | true | service name |
| `currency` | string | true | service currency |
| `price` | string | true | service price |
| `location` | string | true | service location |
| `duration` | int | true | service duration |

**Response:**

```json
{
    "id": 1,
    "currency": "UAN",
    "price": "100",
    "location": null,
    "duration": 1200000,
    "workerID": 1,
    "serviceID": 1
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | worker service id |
| `currency` | string | service currency |
| `price` | string | service price |
| `location` | string | service location |
| `duration` | int | service duration |
| `workerID` | int | worker id |
| `serviceID` | int | service id |

**Requirements:**

You need to be authenticated

---

### **Become worker**

```http
PATCH /profile/become-worker
```

**Response:**

```json
{ 
    "workerID": 2
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `workerID` | int | worker id |

**Requirements:**

You need to be authenticated

---

### **Set worker schedule**

```http
POST /profile/set-schedule
```

**Body:**

```json
{
    "workingStartTime": null,
    "workingEndTime": null,
    "weekendDay": true,
    "date": "2022-01-28T10:55:09.601Z",
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `workingStartTime` | string | service price |
| `workingEndTime` | string | service location |
| `weekendDay` | int | service duration |
| `date` | int | worker id |

**Response:**

```json
{
    "id": 1,
    "workerID": 1,
    "workingStartTime": null,
    "workingEndTime": null,
    "weekendDay": true,
    "date": "2022-02-12",
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | worker service id |
| `workerID` | string | service currency |
| `workingStartTime` | string | service price |
| `workingEndTime` | string | service location |
| `weekendDay` | int | service duration |
| `date` | int | worker id |

---

### **Update worker profile**

```http
PATCH /profile/worker/update
```

**Body:**

```json
{
    "workingStartTime": null,
    "workingEndTime": null,
    "weekendDay": true,
    "date": "2022-01-28T10:55:09.601Z",
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `workingStartTime` | string | service price |
| `workingEndTime` | string | service location |
| `weekendDay` | int | service duration |
| `date` | int | worker id |

**Response:**

```json
{
    "id": 1,
    "workerID": 1,
    "workingStartTime": null,
    "workingEndTime": null,
    "weekendDay": true,
    "date": "2022-02-12",
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | worker service id |
| `workerID` | string | service currency |
| `workingStartTime` | string | service price |
| `workingEndTime` | string | service location |
| `weekendDay` | int | service duration |
| `date` | int | worker id |

---

### **Update weekend days**

```http
PATCH /profile/worker/update/weekend-days
```

**Body:**

```json
{
    "weekendDays": {
        "friday": true
    }
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `weekendDays` | object | weekend days object |
| `weekendDays.monday ... sunday` | bool | weekend day |

**Response:**

```json
{
    "monday": null,
    "tuesday": null,
    "wednesday": null,
    "thursday": null,
    "friday": true,
    "saturday": null,
    "sunday": null,
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `moonday ... sunday` | bool | weekend day |
