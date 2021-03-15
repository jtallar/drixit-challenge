var express = require("express");
var bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");

var app = express();

// Create application/json parser
var jsonParser = bodyParser.json();

BASE_URL_ENV = "CHALLENGE_API_URL";
app.set(BASE_URL_ENV, process.env.CHALLENGE_API_URL || "/api/v0");

// Setup MongoDB connection
const uri = "mongodb://localhost:27017";
const mClient = new MongoClient(uri, { useUnifiedTopology: true });
mClient.connect();

// MongoDB find function
async function getUserByEmail(email) {
    const database = mClient.db('challenge');
    const collection = database.collection('users');
    return await collection.findOne({ email: email});
}

// Generate access token secret for JWT if not exists
TOKEN_ENV = "TOKEN_SECRET";
app.set(TOKEN_ENV, process.env.TOKEN_SECRET || require('crypto').randomBytes(64).toString('hex'));

// JWT authentication function
// Based on https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401); // if there isn't any token

    jwt.verify(token, app.get(TOKEN_ENV), (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next(); // pass the execution off to whatever request the client intended
    })
}

// Generate JWT access token from email. Expires in 15 minutes
function generateAccessToken(email) {
    return jwt.sign({data: email}, app.get(TOKEN_ENV), { expiresIn: '1h' });
}

app.listen(8080, () => {
    console.log("Server running on port 8080");
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
    res.send({
        "jwt": generateAccessToken(body.email)
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
app.get(app.get(BASE_URL_ENV) + "/users/me", authenticateToken, async (req, res, next) => {
    // If token valid, return user info
    user = await getUserByEmail(req.user.data);
    if (!user) {
        res.status(404).send();
        return;
    }
    if (user.password) {
        delete user.password;
    }
    res.send(user);
});