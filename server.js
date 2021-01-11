const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routesUrls = require("./routes/routes");
const PORT = process.env.PORT || 4000;
const cors = require("cors");
app.use(cors());
//
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type,Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header(
//       "Access-Control-Allow-Methods",
//       "POST, PUT, GET, PUSH, PATCH, DELETE"
//     );
//     return res.status(200).json({});
//   }
// });

dotenv.config();
mongoose.connect(
  process.env.DATABASE_ACCES,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("database connected!!!")
);

app.use(express.json());
app.use("/app", routesUrls);

app.listen(PORT, () => console.log("server is up"));
