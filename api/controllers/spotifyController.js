const axios = require("axios");
const Spotify = require("../models/SpotifyToken");
const qs = require("qs");
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
        show_dialog: true,
      })
  );
};

const callback = async (req, res) => {
  let code = req.query.code || null;

  let authOptions = {
    method: "POST",
    url: "https://accounts.spotify.com/api/token",
    headers: headers,
    body: `code=${code}&redirect_uri=${process.env.REDIRECT_URI}&grant_type=authorization_code`,
    json: true,
  };

  fetch("https://accounts.spotify.com/api/token", authOptions)
    .then((response) => {
      if (response.status === 200) {
        response.json().then((data) => {
          let access_token = data.access_token;
          let refresh_token = data.refresh_token;
          let expires_in = data.expires_in;
          res.redirect(
            "http://localhost:3000/" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
                expires_in: expires_in,
              })
          );
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

//   axios
//     .post(authOptions.url, qs.stringify(authOptions.form))
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((err) => {
//       res.redirect("http://localhost:3000");
//       console.log(err);
//     });
// };

module.exports = { auth, callback };

// const axios = require("axios");
// const Spotify = require("../models/SpotifyToken");

// // Spotify authorization endpoint
// const auth = async (req, res) => {
//   try {
//     console.log("hitting api");
//     // Make a request to Spotify API to get authorization code
//     // const response = await axios.get("https://accounts.spotify.com/authorize", {
//     //   params: {
//     //     client_id: process.env.CLIENT_ID,
//     //     response_type: "code",
//     //     redirect_uri: process.env.REDIRECT_URI,
//     //     scope: "user-read-private user-read-email",
//     //   },
//     // });

//     const scopes = encodeURIComponent("user-read-private user-read-email");

//     // Redirect the user to the Spotify authorization page
//     res.redirect(
//       `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&scope=${scopes}&redirect_uri=${process.env.REDIRECT_URI}`
//     );
//   } catch (error) {
//     console.error("Error authorizing with Spotify:", error);
//     res.status(500).json({ error: "Failed to authorize with Spotify" });
//   }
// };

// // Spotify callback endpoint
// const callback = async (req, res) => {
//   try {
//     const { code } = req.query;

//     // Exchange authorization code for access and refresh tokens
//     const response = await axios.post(
//       "https://accounts.spotify.com/api/token",
//       {
//         grant_type: "authorization_code",
//         code,
//         redirect_uri: process.env.REDIRECT_URI,
//         headers: {
//           "content-type": "application/x-www-form-urlencoded",
//           Authorization:
//             "Basic " +
//             new Buffer(
//               process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
//             ).toString("base64"),
//         },
//       }
//     );

//     const { access_token, refresh_token, expires_in } = response.data;

//     // Save the tokens to the MongoDB database using the Spotify model
//     const spotify = new Spotify({
//       access_token,
//       refresh_token,
//       expires_in,
//     });
//     await spotify.save();

//     res.status(200).json({ message: "Tokens saved successfully" });
//   } catch (error) {
//     console.error("Error saving tokens:", error);
//     res.status(500).json({ error: "Failed to save tokens" });
//   } finally {
//     res.redirect("http://localhost:3000");
//   }
// };

// module.exports = { auth, callback };
