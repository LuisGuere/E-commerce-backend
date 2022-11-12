const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    uploader: {
        type: mongoose.isValidObjectId,
        ref: "Product"
    }
});

mongoose.model("Product", ProductSchema, "productCollection");