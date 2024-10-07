import { Router } from 'express';
import CartManager from '../services/cartsManager.js';
import ProductManager from '../services/productManager.js';

const router = Router();
const cartManager = new CartManager();
const productManager = new ProductManager();


router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.addCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al crear el carrito' });
    }
});


router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const products = cartManager.getProductsFromCart(cartId);
        
        if (products !== null) {
            res.status(200).json(products); 
        } else {
            res.status(404).json({ message: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al obtener productos del carrito' });
    }
});


router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        
        const cart = cartManager.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const product = productManager.getIdProduct(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const updatedCart = await cartManager.addProductToCart(cartId, productId);
        res.status(200).json(updatedCart); 
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al agregar producto al carrito' });
    }
});

export default router;