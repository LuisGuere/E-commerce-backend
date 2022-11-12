const {
    register,
    login, 
    viewUsers,
    viewUser, 
    filterUsers, 
    eraseUserById, 
    eraseUserByFilter, 
    updateUser, 
    viewUserInfo
} = require("./User.controller");

const {
    newProduct,
    viewProduct,
    viewMyProducts,
    eraseProductById,
    updateProduct,
} = require("./Product.controller");

const {
    newSale,
    viewSales
} = require("./Sale.controller");

module.exports = {
    register,
    login, 
    viewUsers,
    viewUser, 
    filterUsers, 
    eraseUserById, 
    eraseUserByFilter, 
    updateUser, 
    viewUserInfo,
    newProduct,
    viewProduct,
    viewMyProducts,
    eraseProductById,
    updateProduct,
    newSale,
    viewSales
};