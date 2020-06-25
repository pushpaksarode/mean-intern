const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })

// create product
exports.createProduct = 
(req, res) => {
  const product = new Product(req.body);
  product.productImagePath = req.file.path;
  if (!req.file) return res.send('Please upload a file');
  product.save((err, product) => {
    if (err) {
      if(err.code === 11000 || err.code === 11001){
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique",
        });
      }
      else{
        return res.status(400).json({
          error: "Not able to create Product",
          messgae : err
        });
      }
      }
    res.json({ product });
  });
};


// read all product
exports.getAllProduct =
   (req, res) => {
    Product.find().exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "No Product found"
        });
      }
      res.json(product);
    });
};


// read product by id
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
      .populate("category")
      .exec((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "Product not found"
          });
        }
        req.product = product;
        next();
      });
};


// read product
exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};


// delete product
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the product"
        });
      }
      res.json({
        message: "Product : "+req.product.name+" Has Deleted",
        deletedProduct
      });
    });
};


// update product
exports.updateProduct=(req,res)=>{
    const product = req.product;
    product.name=req.body.name;
    product.info=req.body.info;
    product.description=req.body.description;
    product.mrp=req.body.mrp;
    product.price=req.body.price;
    product.category=req.body.category;
    product.stock=req.body.stock;
    product.productImagePath = req.file.path;
    product.save((err,updatedProduct)=>{
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedProduct);
    });
};