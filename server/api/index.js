const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../database/db.js");
const cors = require("cors");
const app = express();
const path = require("path");
const authRoute = require("../routes/authRoute.js");
const productRoute = require("../routes/productRoute.js");
const bodyParser = require("body-parser");
dotenv.config();
app.use(
  cors({
    origin: "https://furnowebsite.vercel.app", // Replace with your frontend origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// Middleware to handle large payloads
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/product", productRoute);
const port = process.env.PORT || 5000;
connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to my Furno backend");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
