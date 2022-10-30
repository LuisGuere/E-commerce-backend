

const producto = {
    nombre: "taza",
    tipo: "basica",
    capacidad: "11 oz",
    precio: 50,
    custom: "sublimada",
    cantidad: 1
};

const express =require('express');

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    res.json({mensaje: 'Hola'})
});

app.post("/producto", (req, res)=>{
    producto.push(req.body);
    res.json({mensaje: "Producto Registrado", data: producto})
});

app.listen(3001, ()=>{
    console.log('La aplicación está corriendo en el puerto: '+ 3001) 
});