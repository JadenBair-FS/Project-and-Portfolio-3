const moongoose = require("mongoose");

const spotifyTokenSchema = new moongoose.Schema({
  access_token: {
    type: String,
    required: true,
  },
  expires_in: {
    type: Number,
    required: true,
  },
  refresh_token: {
    type: String,
    required: true,
  },
});

module.exports = moongoose.model("SpotifyToken", spotifyTokenSchema);
