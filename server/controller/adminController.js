const productModel = require("../model/productModel");

const createProductController = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      photos,
      description,
      realprice,
      subheading,
    } = req.body;
    const newProduct = new productModel({
      name,
      price,
      category,
      photos,
      description,
      realprice,
      subheading,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsController = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProductController, getProductsController };
