const {
  createProductController,
  getProductsController,
} = require("../controller/adminController");
const multer = require("multer");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const memoryStorage = require("multer");

// Ensure the uploads directory exists
// Configure multer to handle file uploads
const storage = memoryStorage();
const upload = multer({ storage: storage });
router.post("/createProduct", createProductController);

router.get("/getProducts", getProductsController);
module.exports = router;
