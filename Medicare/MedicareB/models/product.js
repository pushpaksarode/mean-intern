const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50
    },
    info: {
        type: String,
        trim :true,
        required :true,
        maxlength: 100
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    mrp: {
        type: Number,
        required: true,
        maxlength: 32,
        trim: true
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true
    }, 
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    // photo: {
    //   data: Buffer,
    //   contentType: String
    // },
    productImagePath :{
      type:String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
