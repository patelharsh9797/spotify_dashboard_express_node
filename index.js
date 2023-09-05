require("dotenv").config();
const querystring = require("node:querystring");
const express = require("express");
const axios = require("axios");

const app = express();
const port = 8888;
const client_port = 5173;

const frontend_uri = process.env.FRONTEND_URI;
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;
const stateKey = "spotify_auth_state";

//--------------------------------
// TODO Utils Functions
//--------------------------------
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

//--------------------------------
// TODO Routes && Methods
//--------------------------------
app.get("/", (req, res) => {
  const data = {
    name: "Harsh",
    isAwesome: true,
  };

  res.json(data);
});

app.get("/login", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = ["user-read-private", "user-read-email", "user-top-read"].join(
    " ",
  );

  const queryParams = querystring.stringify({
    response_type: "code",
    client_id,
    redirect_uri,
    state,
    scope,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code,
      redirect_uri,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${client_id}:${client_secret}`,
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        });

        res.redirect(`${frontend_uri}/?${queryParams}`);
      } else {
        res.redirect(`/?${querystring.stringify({ error: "invalid_token" })}`);
      }
    })
    .catch((error) => res.send(error));
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${client_id}:${client_secret}`,
      ).toString("base64")}`,
    },
  })
    .then((response) => res.send(response.data))
    .catch((error) => res.send(error));
});

//--------------------------------
// TODO Port listening
//--------------------------------
app.listen(port, () => {
  console.log(`Express running at : http://localhost:${port}`);
});
