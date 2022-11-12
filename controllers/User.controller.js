const e = require("cors");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const register = async (req, res) => {
    try {
        const { password } = req.body;

        delete req.body.password;

        const user = new User(req.body);

        user.hashPassword(password);

        await user.save();

        return res
        .status(201)
        .json({mensaje: "Usuario creado", detalles: user.onSingGenerateJWT()});
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje });
    }
};

const login = async (req, res) => {
    try {
        const { mail, password } = req.body;

        const user = new User.findOne({ mail });

        if(!user) {
            return res
            .status(404)
            .json({mensaje: "Error", detalles: "Usuario no encontrado"});
        }

        if(user.verifyPassword(password)) {
            return res
            .status(200)
            .json({mensaje: "Login correcto", detalles: user.onSingGenerateJWT()});
        }
        return res
        .status(400)
        .json({mensaje: "Error", detalles: "Verifica tus credenciales"});

    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const viewUsers = async (req, res) => {
    try {
        if(req.user.category !== "admin") {
            return res
            .status(400)
            .json({
                mensaje: "Error",
                detalles: "No tienes permiso para ver esto"
            });
        }
        const users = await User.find({},{
            name: true,
            lastname: true,
            mail: true,
            age: true,
            category: true,
            img: true
          });
          if(!users.length)
          return res
          .status(404)
          .json({mensaje: "Error", detalles: "Colección vacía"});
          return res
          .status(200)
          .json({mensaje: "Usuauarios encontrados", detalles: users });
    }catch (e) {
        return res
        .status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const viewUser = async (req, res) => {
    try {
        if(req.user.category !== "admin") {
            return res.status(400),json({
                mensaje: "Error",
                detalles: "No tienes permiso para ver esto"
            });
        }
        console.log(req.query)
        const user = await User.fondById(req.params.id);
        if(!user)
        return res
        .status(404)
        .json({mensaje: "Error", detalles: "No existe este usuario"});
        return res
        .status(200)
        .json({
            mensaje: "Usuario no encontrado",
            detalles: user
        });
    }catch(e) {
        return res.status(400),json({mensaje: "Error", details: e.mensaje});
    }
};

const filterUsers = async (req, res) => {
    try {
        const users = await User.find(req.body);
        if(!users.lenght)
        return res
        .status(404)
        .json({mensajes: "Error", detalDelawareles: "Usuarios no encontrados"});
        return res.status(200).json({mensaje: "Usuarios encontrados", detalles: "users"});
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const eraseUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if(id.lenght !== 24)
        return res
        .status(400)
        .json({mensaje: "Error", detalles: "ID no válido"});
        const user = await User.findById(id);
        if(!user)
        return res
        .status(404)
        .json({mensaje: "Error",detalles: "Usuario no encontrado"});
        const erased = await User.deleteMany(req.body);
        return res
        .status(200)
        .json({mensaje: "Usuario eliminado", detalles: erased});
    }catch (e) {
        return res
        .status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const eraseUserByFilter = async (req, res) => {
    try {
        const erased = await User.deleteMany(req.body);
        return res
        .status(200)
        .json({mensaje: "Usuarios eliminados", detalles: erased});
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje})
    }
};



const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updated = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        return res.status(200).json({mensaje: "Usuario actualizado", detalles: updated})
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

const viewUserInfo = async (req, res) => {
    try {
        const userInfo = await User.findById(req.user.idUser, {
            name: 1,
            lastname: 1,
            mail: 1,
            age: 1,
            category: 1,
            img: 1            
        });
        if(!userInfo)
        return res
        .status(404)
        .json({mensaje: "Error", detalles: "Este usuario no existe"});
        return res
        .status(200)
        .json({mensaje: "Usuario encontrado", detalles: userInfo });
    }catch (e) {
        return res.status(400).json({mensaje: "Error", detalles: e.mensaje});
    }
};

module.exports = {
    register,
    login, 
    viewUsers,
    viewUser, 
    filterUsers, 
    eraseUserById, 
    eraseUserByFilter, 
    updateUser, 
    viewUserInfo
};