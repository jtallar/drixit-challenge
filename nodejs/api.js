var express = require("express");
var app = express();

BASE_URL_ENV = "CHALLENGE_API_URL"
app.set(BASE_URL_ENV, process.env.CHALLENGE_API_URL || "/api/v0");

app.listen(3000, () => {
    console.log("Server running on port 3000");
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
app.post(app.get(BASE_URL_ENV) + "/authenticate", (req, res, next) => {
    // If email and password are valid, this endpoint returns a valid token
    console.log(req);
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