require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const app = express();

connectDB();

const port = process.env.PORT || 3001;

app.listen(port, console.log(`Server running on port ${port}`));
