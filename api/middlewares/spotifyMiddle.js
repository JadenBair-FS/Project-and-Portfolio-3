const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");

router.get("/login", spotifyController.login);
router.get("/auth", spotifyController.jwt, spotifyController.auth);
router.get("/callback", spotifyController.jwt, spotifyController.callback);
router.get("/status", spotifyController.jwt, spotifyController.status);

module.exports = router;
