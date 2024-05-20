const express = require("express");
const { response } = express;
const dotenv = require("dotenv");
const connectDB = require("../database/db.js");
const cors = require("cors");
const app = express();
const authRoute = require("../routes/authRoute.js");
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
const port = process.env.PORT || 5000;
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
