const { Order, ProductCart } = require("../models/order");


// create order
exports.createOrder = (req, res) => {
    const order = new Order(req.body);
 // const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Create Order"
      });
    }
    res.json(order);
  });
};


// get order
exports.getOrder = (req, res) => {
    return res.json(req.order);
};


// get all orders
exports.getAllOrders = (req, res) => {
    Order.find().exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "NO orders found"
        });
      }
      res.json(orders);
    });
};


// update status
exports.updateStatus = (req, res) => {
    const order=req.order;
    order.status=req.body.status;
    order.save((err,updatedStatus)=>{
      if(err){
        return res.status(400).json({
          error: "Failed to update Status of Order"
        });
      }
      res.json(updatedStatus);
    });
};


// delete order
exports.removeOrder = (req,res) => {
    const order = req.order;
    order.remove((err,order) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this order"
        });
      }
      res.json({
        message: "Successfull Deleted"
      });
    });
};


// get order by id
exports.getOrderById = (req, res, next, id) => {
    Order.findById(id)
      .populate("products.product", "name price")
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "NO order found in DB"
          });
        } 
        req.order = order;
        next();
      });
};