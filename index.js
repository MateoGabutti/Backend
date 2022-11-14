const {productos} = require('./conteiner.js');
const EXPRESS = require('express');
const APP = EXPRESS();
const PORT =  process.env.PORT || 8080;
APP.listen(PORT, () => console.log(`URL del server: http://localhost:${PORT}`));
APP.get("/", (req, res) => {
    res.send("<h1>Las rutas disponibles son /productos y /productoRandom</h1>")
})
APP.get("/productos", async(req, res) => {
    try{
        const todos = await productos.getAll() 
        res.send(todos)
    } catch(error) {
        res.send(error)
    }
});
APP.get("/productoRandom", async (req, res) => {
    const idGenerado = Math.round(Math.random() * 3)
    try{
        const productoAzar = await productos.getById(idGenerado)
        res.send(productoAzar)
    } catch(error) {
        res.send(error)
    }
});