# **API documentation**

Endpoints:

- /auth
  - /register
  - /log-in
  - /log-out
  - /refresh
  - /callback/google

- /appointemtn
  - /client
    - /details/:slug
    - /list
    - /list/today
    - /make
    - /cancel/:slug

  - /worker
    - /details/:slug
    - /list
    - /list/today
    - /cancel/:slug
    - /confirm/:slug

- /profile
  - /find-worker
  - /get-schedule
  - /create/service

- /services
  - /find
  - /create
