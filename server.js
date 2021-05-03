const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const PORT = process.env.PORT || 4000;
const cors = require("cors");

const app = express();
app.use(cors());


dotenv.config();
mongoose.connect(
  process.env.DATABASE_ACCES,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("database connected!!!")
);

app.use(express.json());
app.use("/app", routesUrls);

app.listen(PORT, () => console.log("server is up"));
