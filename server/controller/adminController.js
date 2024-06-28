const cartModel = require("../model/cartModel");
const Order = require("../model/orderModel");
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
      mainphotos,
    } = req.body;
    const newProduct = new productModel({
      name,
      price,
      category,
      photos,
      description,
      realprice,
      subheading,
      mainphotos,
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
const getSpecificProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const productsDetail = await productModel.findById(productId);
    res.status(200).json(productsDetail);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetail = await Order.findOne({ orderId: orderId });
    res.status(200).json(orderDetail);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: error.message });
  }
};
const addProductCartController = async (req, res) => {
  const { products, userId } = req.body;
  console.log("req body cart", req.body);
  try {
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({ products, userId });
    } else {
      // Merge existing products with new ones
      cart.products = [...cart.products, ...products];
    }
    await cart.save();
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send(error);
  }
};
const getProductCartController = async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productsWithDetails = await Promise.all(
      cart.products.map(async (item) => {
        const product = await productModel.findById(item.productId);

        return {
          productId: item.productId,
          quantity: item.quantity,
          productDetails: product,
        };
      })
    );

    res.status(200).json({ products: productsWithDetails });
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteProductCartController = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Find the cart for the user
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );

    // Save the updated cart
    await cart.save();

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createOrderInDatabase = async ({ orderId, userId, amount, items }) => {
  const order = new Order({
    orderId,
    userId,
    amount,
    items,
  });
  await order.save();
  return order;
};

module.exports = {
  createProductController,
  getProductsController,
  getSpecificProductController,
  addProductCartController,
  getProductCartController,
  deleteProductCartController,
  createOrderInDatabase,
  getOrderDetails,
};
