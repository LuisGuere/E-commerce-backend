const express = require('express');
const auth = require("../middleware/auth");

const router = express.Router();

const {
    newProduct,
    showProduct,
    showMyProducts,
    eraseProductById,
    updateProduct,
} = require("../controllers");


router.post("/", auth, newProduct);
router.get("/getAll", auth, showProduct);
router.get("/myProducts", auth, showMyProducts);
router.delete("/:id", auth, eraseProductById);
router.put("/:id", auth, updateProduct);

module.exports = router;
