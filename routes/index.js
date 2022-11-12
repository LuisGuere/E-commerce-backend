const express = required("express");
const router = express.Router();
const userRouter = require("./User.route");
const productRouter = require("./Product.route");
const saleRouter = require("./Sale.route");
const { route } = require("./User.route");

router.get("/", (req, res)=>{
    res.send(`<h1>Welcome to API</h1>`);
});

route.use("/user", userRouter);
route.use("/product", productRouter);
route.use("/sale", saleRouter);

module.exports = router;