const {
  createProductController,
  getProductsController,
  getSpecificProductController,
  addProductCartController,
  getProductCartController,
  deleteProductCartController,
  createOrderInDatabase,
} = require("../controller/adminController");
const multer = require("multer");
const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const memoryStorage = require("multer");
const billingDetail = require("../model/billingDetail");

// Ensure the uploads directory exists
// Configure multer to handle file uploads
const storage = memoryStorage();
const upload = multer({ storage: storage });
router.post("/createProduct", createProductController);

router.get("/getProducts", getProductsController);
router.get("/getSpecificProduct/:productId", getSpecificProductController);
router.post("/addtoCart", addProductCartController);
router.get("/displayCartProduct", getProductCartController);
router.delete("/deleteCartProduct", deleteProductCartController);

router.get("/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

router.post("/pay", async (req, res) => {
  const { orderId, userId, amount, items, billingDetails } = req.body;
  console.log("req body", req.body);
  try {
    // Process the payment and create the order in your database
    // Assuming you have a function to create an order
    const order = await createOrderInDatabase({
      orderId,
      userId,
      amount,
      items,
    });

    res.json({ message: "Payment successful", order });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ message: "Error processing payment" });
  }
});

router.post("/submitBillingDetails", async (req, res) => {
  const { userId, billingDetails } = req.body;
  try {
    const BillingData = new billingDetail({
      userId: userId,
      fname: billingDetails.fname,
      lname: billingDetails.lname,
      address: billingDetails.address,
      city: billingDetails.city,
      zipcode: billingDetails.zipcode,
      phnumber: billingDetails.phnumber,
      email: billingDetails.email,
      country: billingDetails.country,
      state: billingDetails.state,
    });
    await BillingData.save();
    res.status(200).send({ msg: "data saved successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
