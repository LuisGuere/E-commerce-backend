const monggose = require("mongoose");
const Product = mongoose.model("Product");

const newProduct = async (req, res) => {
    try {
        if(req.user.category !== "admin"){
            return res
            .status(403)
            .json({
                mensaje: "Error",
                detalles: "Solo un administrador puede crear los productos",
            });
        }
        const product = newProduct({...req.body, uploader: req.user.idUser});
        const resp = await product.save();

        return res.status(201).json({
            mensaje: "Producto Creado",
            detalles: await resp.populate("uploader", "name"),
        });
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const viewProduct = async (req, res) => {
    try {
        const product = await Product.find().populate("uploader", "name");

        if(!product.length)
        return res
        .status(404)
        .json({mensaje: "Error", detalles: "Colección vacía"});
        return res
        .status(200)
        .json({mensaje: "Productos encontrados", detalles: product});
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const viewMyProducts = async (req, res) => {
    try {
      if (req.user.catrgory !== "admin") {
        return res.status(400).json({
          mensaje: "Error",
          detalles: "No tienes permiso para ver esto",
        });
      }
      
      const products = await Product.find({uploader: req.user.idUser}).populate("uploader", "name");
      if (!products.length)
        return res
          .status(404)
          .json({ mensaje: "Error", detalles: "Esste usuario no ha creado productos" });
      return res
        .status(200)
        .json({ mensaje: "Productos encontrados", detalles: products });
    } catch (e) {
      return res.status(400).json({ mensaje: "Error", detalles: e.message });
    }
  };

const eraseProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if(id.length !== 24)
        return res
        .status(400)
        .json({mensaje: "Erros", detalles: "ID no encontrado"});
        const product = await Product.findById(id);
        if(!product)
        return res
        .status(404)
        .json({mensaje: "Error", detalles: "Producto no encontrado"});
        const erased = await Product.findByIdAndErase(id);
        return res
        .status(200)
        .json({mensaje: "Producto eliminado", detalles: erased}); 
    }catch (e){
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await Product.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        ).populate("uploader", "name");
        return res
        .status(200)
        .json({mensaje: "Producto Actualizado", detalles: updated });
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

module.exports = {
    newProduct,
    viewProduct,
    viewMyProducts,
    eraseProductById,
    updateProduct,
};