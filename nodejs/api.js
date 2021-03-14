var express = require("express");
var bodyParser = require('body-parser');

var app = express();

// Create application/json parser
var jsonParser = bodyParser.json()

BASE_URL_ENV = "CHALLENGE_API_URL"
app.set(BASE_URL_ENV, process.env.CHALLENGE_API_URL || "/api/v0");

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
app.post(app.get(BASE_URL_ENV) + "/authenticate", jsonParser, (req, res, next) => {
    // If email and password are valid, this endpoint returns a valid token
    const user = req.body;
    if (!user.email || !user.password) {
        res.status(401).send();
    }
    // TODO: Access BD to check
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
app.get(app.get(BASE_URL_ENV) + "/users/me", (req, res, next) => {
    // Fetch user info for token jwt-token
    console.log(req);
});