const express = require('express')

const router = express.Router();

const {createCategory} = require("../controllers/category");

const {getAllCategory} = require("../controllers/category");

const {getCategoryById} = require("../controllers/category");

const {getCategory} = require("../controllers/category");

const {updateCategory} = require("../controllers/category");

const {removeCategory} = require("../controllers/category");


// this use to return id to required functions
router.param("categoryId",getCategoryById);


// create category 
router.post(
  "/category/create/",
  createCategory
);


// get all categories
router.get(
  "/categories",
  getAllCategory
);


// get category by id
router.get(
  "/category/:categoryId",getCategory
);


// update category
router.put(
  "/category/:categoryId", updateCategory
);


// delete category
router.delete(
  "/category/:categoryId", removeCategory
)

module.exports = router;