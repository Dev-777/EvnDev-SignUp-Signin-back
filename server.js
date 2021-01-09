const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
// const cors = require("cors");
const PORT = process.env.PORT || 4000;

dotenv.config();
mongoose.connect(
  process.env.DATABASE_ACCES,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("database connected!!!")
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
// app.use(cors());
app.use("/app", routesUrls);

app.listen(PORT, () => console.log("server is up"));
