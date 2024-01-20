const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = process.env;
const SpotifyToken = require("../models/SpotifyToken");
const axios = require("axios");

const login = async (req, res) => {
  const token = await SpotifyToken.findOne({ __v: 0 });
  console.log("token:", token);
  if (token) {
    console.log("Token exists, redirecting...")
    res.redirect("http://localhost:3000/");
  } else {
    res.redirect("http://localhost:3001/spotify/auth");
  }
};

const auth = async (req, res) => {
  console.log("Getting authorization code...");
  res.redirect(
    `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true`
  );
};

const jwt = async (req, res, next) => {
  console.log("Getting JWT...");
  req.token = await SpotifyToken.findOne({ __v: 0 });
  if (!req.token && !req.query.code) {
    console.log("No token and no code");
    return next();
  }
  if (!req.token && req.query.code) {
    console.log("No token but code");
    req.token = await getToken(req.query.code, "authorization_code");
    return next();
  }
  if (req.token && req.token.expires_in < new Date().getTime()) {
    console.log("Token expired");
    req.token = await getToken(req.token.refresh_token, "refresh_token");
    return next();
  }
  return next();
};

const getToken = async (code, grant_type) => {
  console.log("Getting token with grant_type: ", grant_type, "...");
  const authOptions = buildAuthOptions(code, grant_type);
  const response = await axios(authOptions);
  console.log("response:", response);
  const { access_token, refresh_token, expires_in } = response.data;
  if (grant_type === "authorization_code") {
    const newToken = new SpotifyToken({
      access_token: access_token,
      refresh_token: refresh_token,
      expires_in: new Date().getTime() + expires_in,
    });
    return newToken.save();
  } else if (grant_type === "refresh_token") {
    const token = await SpotifyToken.findOne({ __v: 0 });
    token.access_token = access_token;
    token.expires_in = new Date().getTime() + expires_in;
    return token.save();
  } else {
    res.json({ error: "Failed getting JWT" });
  }
};

const callback = async (req, res) => {
  if (req.token) {
    res.redirect("http://localhost:3000/");
  } else {
    res.redirect("http://localhost:3001/spotify/auth");
  }
};

const buildAuthOptions = (code, grant_type) => {
  const headers = {
    Authorization:
      "Basic " +
      new Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
  };

  if (grant_type === "refresh_token") {
    const authOptions = {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: headers,
      body: `grant_type=${grant_type}&refresh_token=${code}`,
      json: true,
    };
    return authOptions;
  } else if (grant_type === "authorization_code") {
    const authOptions = {
      method: "POST",
      url: `https://accounts.spotify.com/api/token?code=${code}&redirect_uri=${REDIRECT_URI}&grant_type=${grant_type}`,
      headers: headers,
      json: true,
    };
    return authOptions;
  } else {
    res.json({ error: "Invalid grant_type" });
  }
};

module.exports = { login, auth, jwt, callback };
