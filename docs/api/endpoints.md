# API endpoints

Endpoints list:

- /auth
  - POST /register
  - POST /log-in
  - GET /log-out
  - GET /oauth/google

- GET /user

- /profile
  - GET /[username]
  - /set
    - POST /profile
  - /master
    - POST /create-service
    - DELETE /service
    - PAtCH /service

- /services
  - GET /fine?name=[name]

- /appointment
  - GET /details/[slug]
  - GET /masters?service_id=[id]
  - GET /schedule?master_id=[id]
  - POST /make
  - /client
    - POST /cancel/[slug]
  - /master
    - POST /cancel/[slug]
    - POST /confirm/[slug]
