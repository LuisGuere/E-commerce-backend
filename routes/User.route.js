const express = require("express");
const auth = require("../middleware/auth");

const router = express.Router();

const {
    register,
    login,
    viewUserInfo,
    viewUsers,
    filterUsera,
    viewUser,
    eraseUserById,
    eraseUserByFilter,
    updateUser,
} = require("../controllers");

router.post("/", auth, register);
router.post("/login", auth, login);
router.get("/", auth, viewUserInfo);
router.get("/getAll", auth, viewUsers);
router.get("/filter", auth, filterUsera);
router.get("/:id", auth, viewUser);
router.delete("/:id", auth, eraseUserById);
router.delete("/", auth, eraseUserByFilter);
router.put("/:id", auth, updateUser);

module.exports = router;

