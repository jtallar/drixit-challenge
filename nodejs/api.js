var express = require("express");
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");

var app = express();

// Create application/json parser
var jsonParser = bodyParser.json()

BASE_URL_ENV = "CHALLENGE_API_URL"
app.set(BASE_URL_ENV, process.env.CHALLENGE_API_URL || "/api/v0");

// Setup MongoDB connection
const uri = "mongodb://localhost:27017";
const mClient = new MongoClient(uri, { useUnifiedTopology: true });
mClient.connect();

async function getUserByEmail(email) {
    const database = mClient.db('challenge');
    const collection = database.collection('users');
    return await collection.findOne({ email: email});
}

app.listen(8080, () => {
    console.log("Server running on port 8080");
});

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

// Endpoint: AUTHENTICATE
/* 
POST /api/v0/authenticate
{
	"email": "it@drixit.com",
	"password": "some-password",

} => Promise<{ "jwt": "jwt-token" }> 
*/
app.post(app.get(BASE_URL_ENV) + "/authenticate", jsonParser, async (req, res, next) => {
    // If email and password are valid, this endpoint returns a valid token
    const body = req.body;
    if (!body.email || !body.password) {
        res.status(401).send();
        return;
    }
    user = await getUserByEmail(body.email);
    if (!user) {
        res.status(404).send();
        return;
    }
    if (user.password !== body.password) {
        res.status(401).send();
        return;
    }
    // TODO: Create JWT Token with email in details
    res.send({
        "jwt": "jwt-token"
    });
});

// Endpoint: USER INFO
/* 
GET /api/v0/users/me 
{ 
    "token": "jwt-token" 
} => Promise<UserClient> 
*/

// TODO: Asumo que el token viaja en un Authorization Bearer
app.get(app.get(BASE_URL_ENV) + "/users/me", async (req, res, next) => {
    // Fetch user info for token jwt-token
    if (!req.headers.authorization) {
        res.status(401).send();
        return;
    }

    const tokenArray = req.headers.authorization.split(" ");
    if (tokenArray.length != 2 || tokenArray[0] !== 'Bearer') {
        res.status(401).send();
        return;
    }
    const token = tokenArray[1];
    // console.log(Jwt.decode(token));
    console.log(token);

    // TODO: Extract email from JWT Token if valid
    user = await getUserByEmail("it@drixit.com");
    if (!user) {
        res.status(404).send();
        return;
    }
    if (user.password) {
        delete user.password;
    }
    res.send(user);
});