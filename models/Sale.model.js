const mongoose = require("mongoose");
const SaleSchema = new mongoose.Schema(
    {
        total: {
            type: Number,
            require: true,
        },
        buyer: {
            type: mongoose.ObjectId,
            ref: "User"
        },
        products: {
            type: [
                {
                    type: mongoose.ObjectId,
                    ref: "Product",
                }
            ]
        },
        timestamps: true
    }
);

mongoose.model("Sale", SaleSchema, "saleCollection");