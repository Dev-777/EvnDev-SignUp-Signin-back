const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const PORT = process.env.PORT || 4000;
// const cors = require("cors");
// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

dotenv.config();
mongoose.connect(
  process.env.DATABASE_ACCES,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("database connected!!!")
);

app.use(express.json());
app.use("/app", routesUrls);

app.listen(PORT, () => console.log("server is up"));
