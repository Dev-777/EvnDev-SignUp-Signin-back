const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const PORT = process.env.PORT || 4000;
// const cors = require("cors");
// app.use(cors());

dotenv.config();
mongoose.connect(
  process.env.DATABASE_ACCES,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("database connected!!!")
);

app.use(express.json());
app.use("/app", routesUrls);

// app.listen(PORT, () => console.log("server is up"));

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

const cors_proxy = require("cors-anywhere");
cors_proxy
  .createServer({
    originWhitelist: [],
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
  })
  .listen(port, host, () => {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
