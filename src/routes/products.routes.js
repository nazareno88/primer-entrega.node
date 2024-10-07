import { Router } from "express";
import ProductManager from "../services/productManager.js"; 

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || undefined;
        const products = await productManager.getAllProducts(limit);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error" });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const idProduct = parseInt(req.params.pid);
        const product = await productManager.getIdProduct(idProduct);
        
        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error interno del servidor" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnails } = req.body;

        if (!title || !description || !price || !stock || !category) {
            return res.status(403).send({ message: "Por favor cumplir con los campos requeridos", error: "Producto inválido!" });
        }
        
        const createProduct = await productManager.addProduct({ title, description, code, price, stock, category, thumbnails });
        res.status(201).json(createProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error " });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const idProduct = parseInt(req.params.pid);
        const updatedProduct = await productManager.updateProduct(idProduct, req.body);
        
        if (updatedProduct) {
            res.json({ message: "Producto modificado con éxito", product: updatedProduct });
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error" });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const idProduct = parseInt(req.params.pid);
        const deletedProduct = await productManager.deleteProduct(idProduct);
        
        if (deletedProduct) {
            res.json(deletedProduct);
        } else {
            res.status(404).json({ message: "Producto no encontrado!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error" });
    }
});

export default router;