import fs from "fs/promises"; 
import path from "path"; 


const productosFilePath = path.resolve("data", "productos.json");

export default class ProductManager {
    constructor() {
        this.products = []; 
        this.init(); 
    }

    
    async init() {
        try {
            const data = await fs.readFile(productosFilePath, "utf-8");
            this.products = JSON.parse(data); 
        } catch (error) {
            this.products = [];
        }
    }

    
    async saveToFile() {
        await fs.writeFile(productosFilePath, JSON.stringify(this.products, null, 2)); 
    }

    
    getAllProducts(limit) {
        if (limit) {
            return this.products.slice(0, limit); 
        }
        return this.products;
    }

  
    getIdProduct(idProduct) {
        return this.products.find(p => p.id === idProduct);
    }

  
    async addProduct(createProduct) {
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            status: true,
            ...createProduct 
        };
        this.products.push(newProduct); 
        await this.saveToFile(); 
        return newProduct; 
    }

    
    async updateProduct(idProduct, updatedFields) {
        const positionProduct = this.products.findIndex(p => p.id === idProduct); 
        if (positionProduct === -1) {
            return null;
        }
        const updatedProduct = {
            ...this.products[positionProduct],
            ...updatedFields,
            id: this.products[positionProduct].id 
        };
        this.products[positionProduct] = updatedProduct; 
        await this.saveToFile(); 
        return updatedProduct; 
    }


    async deleteProduct(idProduct) {
        const positionProduct = this.products.findIndex(p => p.id === idProduct);
        if (positionProduct === -1) {
            return null; 
        }
        const deletedProduct = this.products.splice(positionProduct, 1); 
        await this.saveToFile(); 
        return deletedProduct[0]; 
    }
}