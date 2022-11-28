const express = require('express');
const hbs = require('express-handlebars');
const pug = require('pug');
const { productos } = require('./contenedor');
const svRoutes = require("./routes");
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({extended: true}));

svRoutes(app);
app.set('view engine', 'ejs');
app.set('views', './views/ejs');


app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).send(`Error en ${err.message}`)
})
app.listen(PORT, () => console.log(`URL del server: http://localhost:${PORT}`))