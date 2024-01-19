const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");

router.get("/login", spotifyController.auth);
router.get("/callback", spotifyController.callback);
// router.get("/search", spotifyController.search);
// router.get("/token", spotifyController.status);
// router.get("/status", spotifyController.status);

module.exports = router;
