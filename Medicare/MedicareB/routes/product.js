const express = require("express");
const router = express.Router();
var multer  = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage })
const {
  getProductById,
  createProduct,
  getAllProduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUniqueCategories,
  getAllProductByCategory,
  getAllProductsByCategory
} = require("../controllers/product");
const category = require("../models/category");


// all of params
router.param("productId", getProductById);
router.param("categoryId", getAllProductByCategory);

// create product
router.post(
  "/product/create",
  upload.single('productImage'),
  createProduct
);


// read product
router.get(
  "/product/:productId",
  getProduct
)


// read all products
router.get(
  "/products",
  getAllProduct
);


// delete product
router.delete(
  "/product/:productId",
  deleteProduct
);


// update Product
router.put(
  "/product/:productId",
  upload.single('productImage'),
  updateProduct
);


// get all product by category
router.get(
  "/cat/:categoryId",
  getAllProductsByCategory
)

module.exports = router;

