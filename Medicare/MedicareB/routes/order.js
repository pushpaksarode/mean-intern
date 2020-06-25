const express = require("express");
const router = express.Router();

const {
  getOrderById,
  createOrder,
  removeOrder,
  getOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus
} = require("../controllers/order");


// params
router.param("orderId",getOrderById);

// create order
router.post(
    "/order/create",
    createOrder
);


// get order by id
router.get(
    "/order/:orderId",
    getOrder
);


// get all orders
router.get(
    "/orders",
    getAllOrders
)


// update order
router.put(
    "/order/:orderId",
    updateStatus
);


// delete order
router.delete(
    "/order/:orderId",
    removeOrder
);


module.exports = router;