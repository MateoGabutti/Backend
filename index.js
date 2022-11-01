class Usuario{
    constructor(nombre = "", apellido = ""){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName(){
        return `El nombre completo es ${this.nombre} ${this.apellido}`
    }
    addMascota(mascotaNombre){
        this.mascotas.push(mascotaNombre)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor})
    }
    getBookNames(){
        return this.libros.map((objeto) => objeto.nombre)
    }
}
const usuario1 = new Usuario("Mateo", "Gabutti");


