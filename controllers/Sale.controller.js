const mongoose = require("mongoose");
const Sale = mongoose.model("Sale");

const newSale = async (req, res) => {
    try {
        const sale = new Sale({...req.body, comprador: req.user.idUser });
        const resp = await sale.save();

        return res.status(201).json({
            mensaje: "Venta creada",
            detalles: await resp.populate("buyer", "name"),
        });
    }catch (e) {
        return res.status(400).json({ mensaje: "Error", detalles: e.mensaje});
    }
};

const viewSales = async (req, res) => {
    try {
        const sales = await Sale.find()
        .populate("comprador", "nombre")
        .populate({
            path: "products",
            select: {
                name: true,
                price: true,
                uploader: true,
            },
            populate: {
                path: "uploader",
                select: {
                    name: true
                },
            },
        });
        if (!sales.length)
        return res
        .status(404)
        .json({mensaje: "Error", detalles: sales});
    }catch(e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

module.exports = {
    newSale,
    viewSales
}