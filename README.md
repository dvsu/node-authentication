# Node Authentication

This repo explores basic authentication that is commonly implemented on backend.

2 main libraries used in this demo

1. `joi` for request data validation
2. `bcrypt` for password hashing

## Diagram

```none
Incoming request -> Express router -> Controller -> Request data validation -> Backend service -> Response
```

## Simulation

To simulate real database, the data is stored temporarily (non-persistent) in `mock_storage.js`. Every service which is expected to interact with database, is given time delay to make the interaction realistic.

## Demo

Make sure all dependencies have been installed.

```none
npm install
```

To start the server

```none
npm start
```
