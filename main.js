require("dotenv").config();
//require("./models");

const express =require("express");
const mongoose = require("mongoose");
const cors = require("cors");
//const routes = require("./routes")

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/V1", routes);


app.use((req, res)=>{
    res.send('<a href="/v1">Regresa a la API V1.2</a>')
});

/*
app.get("/", (req, res)=>{
    res.json({mensaje: 'Versón 1.0'})
});

//CREATE 
app.post("/user", (req, res)=>{
    const { type, age, name, lastname, mail, phone } = req.body;
    users.push({ type, age, name, lastname, mail, phone});
    res.json({mensaje: "Usuario Registrado", data: users})
});
//READ
app.get("/user", (req, res)=>{

});
//UPDATE
app.put("/user/:name", (req, res)=>{
    const indice = users.findIndex(
        (user) => user.name === req.params.name
    );
    if(indice === -1) {
        res.json({error: "No se encont´ro al usuario"});
        return;
    }
    const {
        type = users.[indice].type,
        age = users.[indice].age,
        name = users.[indice].name,
        lastname = users.[indice].lastname,
        mail = users.[indice].mail,
        phone = users.[indice].phone,
    } = req.body;

    users[indice] = {
        type,
        age,
        name,
        lastname,
        mail,
        phone,
    };

    res.json({userEdited: users[indice], allUsers: users });
});
//DELETE
app.delete("/users/:indice", function(req, res){

});

app.get("/mensaje/:nombre/:apellido", (req, res)=>{
    console.log(req.params);
    res.send();
});


app.post("/producto", (req, res)=>{
    producto.push(req.body);
    res.json({mensaje: "Producto Registrado", data: producto})
});

app.delete("/", (req, res)=>{
    const eliminados = productos.splice(req.body.index, 1);
    if(eliminados.length === 0) {
        res.send("No se eliminó ningún elemento")
    }
    res.send(productos)
});

*/

app.listen(process.env.PORT, ()=>{
    console.log('La aplicación está corriendo en el puerto: '+ process.env.PORT) 
});