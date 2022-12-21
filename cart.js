import fs from "fs";
import CURRENT_DIR from "./utilidades.js";
import productos from "./conteiner.js";
class Carrito{
    constructor(){
        this.direccion = CURRENT_DIR + '/archivos/cart.json'
    }
    async getAll(){
        if(fs.existsSync(this.direccion)){
            const info = await fs.promises.readFile(this.direccion, 'utf-8')
            const infoParseada = JSON.parse(info);
            return infoParseada
        }else{
            return []
        }
    }
    async createCart(){
        try {
            const info = await this.getAll()
            const cart = {
                timestamp: Date.now(),
            }
            cart.id = info.length === 0? 1 : info[info.length - 1].id + 1;
            cart.productos = [];
            info.push(cart);
            const infoJson = JSON.stringify(info, null, 2);
            await fs.promises.writeFile(this.direccion, infoJson)
            return cart.id
        } catch (error) {
            console.log(error);
        }
    }
    async deleteById(numero){
        try {
            const info = await this.getAll();
            const hayCart = info.some((cart) => numero === cart.id);
            if(hayCart){
                const carro = info.find((cart) => numero === cart.id);
                const indice = info.indexOf(carro);
                info.splice(indice, 1);
                const infoJson = JSON.stringify(info, null, 2);
                await fs.promises.writeFile(this.direccion, infoJson);
            } else {
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getProductos(numero){
        try {
            const info = await this.getAll();
            const hayCart = info.some((cart) => numero === cart.id);
            if(hayCart){
                const carro = info.find((cart) => numero === cart.id);
                return carro.productos;
            } else {
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async saveProduct(idCart, idProduct){
        try {
            const info = await this.getAll();
            const hayCart = info.some((cart) => idCart === cart.id);
            if(hayCart){
                //busca el carrito y ve si ya tiene un producto con id igual a idProduct
                const cart = info.find((cart) => idCart === cart.id);
                const hayItem = cart.productos.some((item) => idProduct === item.id)
                const prod = await productos.getById(idProduct);
                if (hayItem) {
                    console.log("ya hay una copia de este producto en el carrito");
                    return
                }
                cart.productos.push(prod);
                const infoActualizada = info.map((item) => {
                    if(item.id === idCart) {
                      return cart  
                    }else{
                        return item
                    }
                })
                const infoJson = JSON.stringify(infoActualizada, null, 2);
                await fs.promises.writeFile(this.direccion, infoJson);
            } else {
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async delProdById(idCart, idProduct) {
        try {
            const info = await this.getAll();
            const hayCart = info.some((cart) => idCart === cart.id);
            if(!hayCart){
                console.log("no existe un carrito con ese numero de id");
                return null;
            }
            const cart = info.find((cart) => idCart === cart.id);
            const hayItem = cart.productos.some((item) => idProduct === item.id);
            if(!hayItem){
             console.log("No existe un producto con ese id en este carrito");
             return   
            }
            const producto = cart.productos.find((item) => idProduct === item.id);
            const indice = cart.productos.indexOf(producto);
            cart.productos.splice(indice, 1);
            const infoActualizada = info.map((item) => {
                if(item.id === idCart) {
                  return cart  
                }else{
                    return item
                }
            })
            const infoJson = JSON.stringify(infoActualizada, null, 2);
            await fs.promises.writeFile(this.direccion, infoJson);
        } catch (error) {
            console.log(error);
        }
    }
}
export default Carrito;