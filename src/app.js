import express from 'express';
import cartsRoutes from './routes/carts.routes.js'
import productsRoutes from './routes/products.routes.js'

const server = express();
const PORT = 8080;

server.use(express.json());
server.use(express.urlencoded({extended:true}));

server.use("/api/products", productsRoutes);
server.use("/api/carts", cartsRoutes);


server.listen(PORT, ()=>{
    console.log("Escuchando el puerto " + PORT)
});