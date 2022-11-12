const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const {
    newSale,
    viewSales,
} = require('../controllers');

router.post("/", auth, newSale);
router.get("/getAll", auth, viewSales);

module.exports = router;
