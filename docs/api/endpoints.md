# Endpoints

Endpoints list:

- /auth
  - POST /register
  - POST /log-in
  - GET /log-out
  - GET /oauth/google

- GET /user
  - /master
    - POST /service
    - DELETE /service
    - PAtCH /service
  - PATCH /profile
  - /become
    - PATCH /master
    - PATCH /client

- /profile
  - GET /[username]
  - GET /services/[master_id]
  - GET /picture/[id]
  - /client
    - GET /appointments?for=[date]
  - /master
    - GET /appointment?for=[date]

- /services
  - GET /fine?name=[name]

- /appointment
  - GET /details/[slug]
  - /steps
    - GET /masters?service_id=[id]
    - GET /schedule?master_id=[id]&for=[date]
    - POST /make
  - /client
    - POST /cancel/[slug]
  - /master
    - POST /cancel/[slug]
    - POST /confirm/[slug]
