const Spotify = require("../models/SpotifyToken");
const querystring = require("querystring");

const basicAuth =
  "Basic " +
  new Buffer.from(
    process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
  ).toString("base64");

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: basicAuth,
};

const auth = async (req, res) => {
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
      })
  );
};

const jwt = async (req, res, next) => {
  req.token = await Spotify.findOne();
  if (!req.token && !req.query.code) {
    return next();
  }
  if (!req.token && req.query.code) {
    const authOptions = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: headers,
      body: `code=${req.query.code}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`,
      json: true,
    };
    fetch("https://accounts.spotify.com/api/token", authOptions)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            const expires_in = new Date().getTime() + data.expires_in;
            const spotify = new Spotify({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              expires_in: expires_in,
            });
            spotify.save();
            req.token = spotify;
            next();
          });
        } else {
          res.redirect(
            "http://localhost:3000/" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      })
      .catch((err) => {
        res.redirect("http://localhost:3000");
        console.log(err);
      });
  } else if (new Date().getTime() > req.token.expires_in) {
    const authOptions = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: headers,
      body: `grant_type=refresh_token&refresh_token=${req.token.refresh_token}`,
      json: true,
    };
    fetch("https://accounts.spotify.com/api/token", authOptions)
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            const expires_in = new Date().getTime() + data.expires_in;
            const spotify = Spotify.findOne();
            spotify.access_token = data.access_token;
            spotify.refresh_token = data.refresh_token;
            spotify.expires_in = expires_in;

            spotify.updateOne();
            req.token = spotify;
            next();
          });
        } else {
          res.redirect(
            "http://localhost:3000/" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      })
      .catch((err) => {
        res.redirect("http://localhost:3000");
        console.log(err);
      });
  } else {
    next();
  }
};

const callback = async (req, res) => {
  if (!req.token) {
    res.redirect("http://localhost:3000");
  } else {
    res.redirect(
      "http://localhost:3000/" +
        querystring.stringify({
          access_token: req.token.access_token,
          refresh_token: req.token.refresh_token,
          expires_in: req.token.expires_in,
        })
    );
  }
};

const search = async (req, res) => {
  const searchOptions = {
    method: "GET",
    url: `https://api.spotify.com/v1/search?q=${req.query.q}&type=album,artist,playlist,track&limit=3`,
    headers: {
      Authorization: "Bearer " + req.token.access_token,
    },
    json: true,
  };
  fetch(searchOptions.url, searchOptions)
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          res.json(data);
        });
      } else {
        res.redirect(
          "http://localhost:3000/" +
            querystring.stringify({
              error: "invalid_token",
            })
        );
      }
    })
    .catch((err) => {
      res.redirect("http://localhost:3000");
      console.log(err);
    });
};

module.exports = { auth, callback, jwt, search };
