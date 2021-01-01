const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const cors = require("cors");

dotenv.config();
mongoose.connect(process.env.DATABASE_ACCES, { useNewUrlParser: true }, () =>
  console.log("database connected!!!")
);

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);

app.listen('https://sign-up-backend.herokuapp.com/', () => console.log("server is up"));
