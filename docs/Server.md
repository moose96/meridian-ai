# Server

Zadaniem tego modułu jest pośredniczenie między bazą danych przechowującą dźwięki i dane użytkowników a aplikacją w przeglądarce.

## Wymagania
* RESTful
* Obsługa zapytań o dźwięki oraz o dane użytkownika

## Endpoints

### [GET, POST] /v1/sounds/

* GET:
  * 200 OK
  ```ts
  Array<SoundFX>
  ```
  * 404 NotFound
  ```
  {}
  ```
  * 403 Forbidden
  ```
  {}
  ```
* POST:
  * 201 Created
  * 422 Unprocessable Entity
  * 404 Not found
### [GET, POST, PATCH, DELETE] /v1/sounds/:id
### [GET] /v1/sounds?filters
### [GET] /v1/sounds/:id/assets/:id (lub /v1/assets/:id) (lub /v1/static/assets/:id)
### [POST] /v1/users
### [GET, PATCH, DELETE] /v1/users/:id
### [GET] /v1/users/:id/snapshots
### [GET, PATCH, DELETE] /v1/users/:id/snapshots/:id