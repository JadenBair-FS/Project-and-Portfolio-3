require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const app = express();
const middlewares = require("./middlewares/spotifyMiddle");

connectDB();

const port = process.env.PORT || 3001;

app.use(cors());
app.use("/spotify", middlewares);

app.listen(port, console.log(`Server running on port ${port}`));
