const mongoose = require('mongoose');
const {Schema} =mongoose;


// Definición del esquema de categorias
const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true }
});

module.exports= mongoose.model('categoria', categoriaSchema);