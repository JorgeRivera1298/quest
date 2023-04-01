const mongoose = require('mongoose');
const {Schema} =mongoose;


// Definición del esquema de categorias
const likeSchema = new mongoose.Schema({
    id_usuario: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    id_pregunta: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "pregunta"
    }
});

module.exports= mongoose.model('like', likeSchema);