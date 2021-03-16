# Drixit Challenge
To use this app, you should be running three things: MongoDB, Rest API and React JS app.

## Database
MongoDB should be running at `localhost:27017`.

### Create Database challenge
In your MongoDB Terminal

    mongo challenge

### Insert elements into collection
In your MongoDB Terminal

    db.users.insert({ _id: "it-drixit-1", avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png", email: "it@drixit.com", password: "some-password", name: "IT", surname: "Drixit", age: 25, role: "admin" })

    db.users.insert({ _id: "info-drixit-2", avatar: "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png", email: "info@drixit.com", password: "other-password", name: "Info", surname: "Drixit", age: 30, role: "user" })

## Back-End
NodeJS application using Express. All files related can be found in `/nodejs`. To run the Rest API:
1. `cd nodejs`
2. `npm install`
3. `node api.js`

Rest API will be running at `localhost:8080` and its base URL will be `/api/v0`.

## Front-End
React JS application. All files related can be found in `/react`. To run the app:
1. `cd react`
2. `npm install`
3. `npm start`

React JS application will be running at `localhost:3000`.

## Decision Log
All decisions made can be found in `decisionLog.md`
