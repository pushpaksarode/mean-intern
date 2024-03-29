const Category = require("../models/category")


// create category  
exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to save category in DB"
      });
    }
    res.json({ category });
  });
};


// get all categories
exports.getAllCategory = (req,res) => {
  Category.find().exec((err,categories) => {
    if(err){
      return res.status(400).json({
        error : "No Category Found !"
      });
    }
    res.json (categories);
  });
};


// get category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};


// update category
exports.updateCategory = (req, res) => { 
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Update Category"
      });
    }
    res.json(updatedCategory);
  });
};


// remove category 
exports.removeCategory = (req, res) => {  
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Delete this Category"
      });
    }
    res.json({
      message: "Category Successfull Deleted"
    });
  });
};


// get category by id (comman for all)
exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found in DB"
      });
    }
    req.category = cate;
    next();
  });
};