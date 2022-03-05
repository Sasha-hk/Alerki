# **REST API**

Endpoints list:

- [`/auth`](#Authentication)
  - [`/register`](#Registration)
  - [`/log-in`](#Log-in)
  - [`/log-out`](#Log-out)
  - [`/callback/google`](#With-Google)
  - [`/refresh`](#Refresh)

- [`/appointments`](#Appointments)
  - [`/details/:slug`](#Appointment-details)
  - `/client`
    - [`/get-day`](#Get-appointments-for)
    - [`/from-now`](#Get-appointments-from-now)
    - [`/cancel/:slug`](#Cancel-appointment)
  - `/master`
    - [`/get-day`](#Get-appointments-for)
    - [`/from-now`](#Get-appointments-from-now)
    - [`/cancel/:slug`](#Cancel-appointment)
    - [`/confirm/:slug`](#Master-confirm-appointment)
  - [`/make-appointment`](#Make-appointment)

- [`/profile`](#Profile)
  - [`/:username`](#Get-profile)
  - [`/:masterID`](#Get-services)
  - [`/find-master`](#Find-master)
  - [`/get-schedule`](#Get-master-schedule)
  - [`/picture`](#Picture)
  - [`/create/service`](#Create-master-service)
  - [`/become-master`](#Become-master)
  - `/master`
    - [`/set-schdule`](#Set-master-schedule)
    - [`/update`](#Update-master-profile)
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
    "profileType": "master",
    "password": "qwerty"
}
```

| **Parameter** | **Type** | **Requeired** | **Options** |
| :--- | :--- | :--- | :--- |
| `email` | string | true | | |
| `username` | string | true | |
| `firstName` | string | false | |
| `lastName` | string | false | |
| `profileType` | string | true | master \ client |
| `password` | string | true | |

**Response:**

```json
{
    "id": "1",
    "email": "email",
    "clientID": 1,
    "masterID": 1,
    "accessToken": "token..."
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | |
| `email` | string | |
| `clientID` | int | client profile id |
| `masterID` | int | master profile id |
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
    "username": "username",
    "password": "qwerty"
}
```

| **Parameter** | **Type** | **Requeired** | **Description** |
| :--- | :--- | :--- | :--- |
| `email` | string | true | email not required if you specify an username |
| `username` | string | true | username not required if you specify an email |
| `password` | string | true | |

**Response:**

```json
{
    "id": "1",
    "email": "email",
    "clientID": 1,
    "masterID": 1,
    "accessToken": "token..."
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | user id |
| `email` | string | user email |
| `clientID` | int | client profile id |
| `masterID` | int | master profile id |
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

---

### **With Google**

```http
POST /auth/callback/google
```

**Query:**

- code

| **Query** | **Type** | **Requeired** | **Details** |
| :--- | :--- | :--- | :--- |
| `code` | string | true | Google OAuth2.0 code / read about this [`here`](https://developers.google.com/identity/protocols/oauth2/web-server#redirecting "Google OAuth2.0 documentation") |

**Response:**

```json
{
    "id": "1",
    "email": "email",
    "clientID": 1,
    "masterID": 1,
    "accessToken": "token..."
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | |
| `email` | string | |
| `clientID` | int | client profile id |
| `masterID` | int | master profile id |
| `accessToken` | string | access token |

**Cookies:**

- accessToken
- refreshToken

---

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
    "masterID": 1,
    "accessToken": "token..."
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | |
| `email` | string | |
| `clientID` | int | client profile id |
| `masterID` | int | master profile id |
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

### **Get profile**

```http
GET /profile/:username
```

**Response:**

```json
{
    "id": 1,
    "username": "username",
    "firstName": "firts name",
    "lastName": "last name",
    "clientID": 1,
    "masterID": 1,
    "pictureID": null,
    "master": {
        "shortBiography": null,
        "instagramProfile": null,
        "workingStartTime": null,
        "workingEndTime": null
    }
}
```

In response, we receive an array of users with the specified service in the request

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | user id |
| `username` | string | username |
| `firstName` | string | user first name |
| `lastName` | string | user last name |
| `clientID` | int | client profile id |
| `masterID` | int | master profile id |
| `pictureID` | int | user picture id |request |
| `master` | string | master information |
| `master.shortBiography` | string | about master |
| `master.instagramProfile` | string | link to instagram profile if exists |
| `master.masterStartTime` | string | master start time |
| `master.masterEndTime` | string | master end time |

---

### **Get services**

```http
GET /profile/services/:masterID
```

**Response:**

```json
[
  {
    "id": 1,
    "currency": "UAN",
    "price": "100",
    "location": null,
    "duration": 1200000,
    "masterID": 1,
    "serviceID": 1
  },
]
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | user id |
| `currency` | string | service currency |
| `price` | string | service price |
| `locations` | string | service lication |
| `duration` | int | service duration |
| `masterID` | int | master id |
| `serviceID` | int | service id |

---

### **Find master**

```http
GET /profile/find-master
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
        "masterID": 1,
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
| `masterID` | int | master profile id |
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

### **Get master schedule**

```http
GET /profile/get-schedule
```

**Querys:**

- year
- month
- master_id

| **Query** | **Type** | **Requeired** | **Description** |
| :--- | :--- | :--- | :--- |
| `year` | int | true | schedule for year |
| `month` | int | true | schedule for month |
| `master_id` | int | true | schedule for master |

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
            "masterID":  1,
            "workingStartTime":  null,
            "workingEndTime":  null,
            "weekendDay":  true,
            "date":  "2022-02-12",
            "createdAt":  "2022-01-28T10:00:25.543Z",
            "updatedAt":  "2022-01-28T10:00:25.543Z"
        },
        {
            "id": 2,
            "masterID": 1,
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
| `schedule.masterID` | object | masterID |
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

### **Create master service**

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
    "masterID": 1,
    "serviceID": 1
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | master service id |
| `currency` | string | service currency |
| `price` | string | service price |
| `location` | string | service location |
| `duration` | int | service duration |
| `masterID` | int | master id |
| `serviceID` | int | service id |

**Requirements:**

You need to be authenticated

---

### **Become master**

```http
PATCH /profile/become-master
```

**Response:**

```json
{ 
    "masterID": 2
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `masterID` | int | master id |

**Requirements:**

You need to be authenticated

---

### **Set master schedule**

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
| `date` | int | master id |

**Response:**

```json
{
    "id": 1,
    "masterID": 1,
    "workingStartTime": null,
    "workingEndTime": null,
    "weekendDay": true,
    "date": "2022-02-12",
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | master service id |
| `masterID` | string | service currency |
| `workingStartTime` | string | service price |
| `workingEndTime` | string | service location |
| `weekendDay` | int | service duration |
| `date` | int | master id |

---

### **Update master profile**

```http
PATCH /profile/update/master
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
| `date` | int | master id |

**Response:**

```json
{
    "id": 1,
    "masterID": 1,
    "workingStartTime": null,
    "workingEndTime": null,
    "weekendDay": true,
    "date": "2022-02-12",
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | master service id |
| `masterID` | string | service currency |
| `workingStartTime` | string | service price |
| `workingEndTime` | string | service location |
| `weekendDay` | int | service duration |
| `date` | int | master id |

---

### **Update weekend days**

```http
PATCH /profile/update/master/weekend-days
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

## **Appointments**

### **Appointment details**

```http
GET /profile/details/:slug
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `workingStartTime` | string | service price |
| `workingEndTime` | string | service location |
| `weekendDay` | int | service duration |
| `date` | int | master id |

**Response:**

```json
{
    "id": 1,
    "slug": "zs1PVskK9U2",
    "appointmentStartTime": "2022-01-28T09:17:46.678Z",
    "appointmentEndTime": "2022-01-28T09:37:46.678Z",
    "duration": 1200000,
    "clientConfirm": true,
    "masterConfirm": false,
    "clientID": 2,
    "masterID": 1,
    "masterServiceID": 1
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | appointment id |
| `slug` | string | slug |
| `appointmentStartTime` | string | start time |
| `appointmentEndTime` | string | end time |
| `duration` | int | service duration |
| `clientConfirm` | bool | client confirm |
| `masterConfirm` | bool | worekr confirm |
| `clientID` | int | client id |
| `masterID` | int | master id |
| `masterServiceID` | int | master service id |

---

### **Get appointments for**

**For client:**

```http
GET /profile/client/get-day?date=date
```

**For master:**

```http
GET /profile/master/get-day?date=date
```

**Query:**

- date

| **Query** | **Type** | **Description** |
| :--- | :--- | :--- |
| `date` | string | date |

**Response:**

```json
[
    {
        "id": 1,
        "slug": "SEXblVKcAme",
        "appointmentStartTime": "2022-01-28T09:26:39.915Z",
        "appointmentEndTime": "2022-01-28T09:46:39.915Z",
        "duration": 1200000,
        "clientConfirm": true,
        "masterConfirm": false,
        "clientID": 2,
        "masterID": 1,
        "masterServiceID": 1
    }
]
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | appointment id |
| `slug` | string | slug |
| `appointmentStartTime` | string | start time |
| `appointmentEndTime` | string | end time |
| `duration` | int | service duration |
| `clientConfirm` | bool | client confirm |
| `masterConfirm` | bool | worekr confirm |
| `clientID` | int | client id |
| `masterID` | int | master id |
| `masterServiceID` | int | master service id |

---

### **Get appointments from now**

**For client:**

```http
GET /profile/client/from-now?now=date
```

**For master:**

```http
GET /profile/master/from-now?now=date
```

**Query:**

- now

| **Query** | **Type** | **Description** |
| :--- | :--- | :--- |
| `now` | string | date |

**Response:**

```json

[
    {
        "id": 1,
        "slug": "qp9gexFaRRV",
        "appointmentStartTime": "2022-01-28T09:36:49.930Z",
        "appointmentEndTime": "2022-01-28T09:56:49.930Z",
        "duration": 1200000,
        "clientConfirm": true,
        "masterConfirm": false,
        "clientID": 2,
        "masterID": 1,
        "masterServiceID": 1
    }
]
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | appointment id |
| `slug` | string | slug |
| `appointmentStartTime` | string | start time |
| `appointmentEndTime` | string | end time |
| `duration` | int | service duration |
| `clientConfirm` | bool | client confirm |
| `masterConfirm` | bool | worekr confirm |
| `clientID` | int | client id |
| `masterID` | int | master id |
| `masterServiceID` | int | master service id |

---

### **Cancel appointment**

**For client:**

```http
PATCH /profile/client/cancel/:slug
```

**For master:**

```http
PATCH /profile/master/cancel/:slug
```

**Query:**

- slug

| **Query** | **Type** | **Description** |
| :--- | :--- | :--- |
| `slug` | string | appointment slug |

**Response:**

```json

[
    {
        "id": 1,
        "slug": "qp9gexFaRRV",
        "appointmentStartTime": "2022-01-28T09:36:49.930Z",
        "appointmentEndTime": "2022-01-28T09:56:49.930Z",
        "duration": 1200000,
        "clientConfirm": false,
        "masterConfirm": false,
        "clientID": 2,
        "masterID": 1,
        "masterServiceID": 1
    }
]
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | appointment id |
| `slug` | string | slug |
| `appointmentStartTime` | string | start time |
| `appointmentEndTime` | string | end time |
| `duration` | int | service duration |
| `clientConfirm` | bool | client confirm |
| `masterConfirm` | bool | worekr confirm |
| `clientID` | int | client id |
| `masterID` | int | master id |
| `masterServiceID` | int | master service id |

---

### **Master confirm appointment**

```http
PATCH /profile/master/confirm/:slug
```

**Query:**

- slug

| **Query** | **Type** | **Description** |
| :--- | :--- | :--- |
| `slug` | string | appointment slug |

**Response:**

```json

[
    {
        "id": 1,
        "slug": "qp9gexFaRRV",
        "appointmentStartTime": "2022-01-28T09:36:49.930Z",
        "appointmentEndTime": "2022-01-28T09:56:49.930Z",
        "duration": 1200000,
        "clientConfirm": false,
        "masterConfirm": true,
        "clientID": 2,
        "masterID": 1,
        "masterServiceID": 1
    }
]
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | appointment id |
| `slug` | string | slug |
| `appointmentStartTime` | string | start time |
| `appointmentEndTime` | string | end time |
| `duration` | int | service duration |
| `clientConfirm` | bool | client confirm |
| `masterConfirm` | bool | worekr confirm |
| `clientID` | int | client id |
| `masterID` | int | master id |
| `masterServiceID` | int | master service id |

---

### **Make appointment**

```http
POST /profile/make-appointment
```

**Body:**

```json
{
    "masterID": 1,
    "masterServiceID": 1,
    "appointmentStartTime": "2022-01-28T09:57:58.032Z"
}
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `masterID` | int | master id |
| `masterServiceID` | int | master service id |
| `appointmentStartTime` | string | appointment start time |

**Response:**

```json

[
    {
        "id": 1,
        "slug": "qp9gexFaRRV",
        "appointmentStartTime": "2022-01-28T09:36:49.930Z",
        "appointmentEndTime": "2022-01-28T09:56:49.930Z",
        "duration": 1200000,
        "clientConfirm": true,
        "masterConfirm": false,
        "clientID": 2,
        "masterID": 1,
        "masterServiceID": 1
    }
]
```

| **Parameter** | **Type** | **Description** |
| :--- | :--- | :--- |
| `id` | int | appointment id |
| `slug` | string | slug |
| `appointmentStartTime` | string | start time |
| `appointmentEndTime` | string | end time |
| `duration` | int | service duration |
| `clientConfirm` | bool | client confirm |
| `masterConfirm` | bool | worekr confirm |
| `clientID` | int | client id |
| `masterID` | int | master id |
| `masterServiceID` | int | master service id |
