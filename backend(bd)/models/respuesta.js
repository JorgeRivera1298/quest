const mongoose = require('mongoose');
const {Schema} =mongoose;


// Definición del esquema de respuestas
const respuestaSchema = new mongoose.Schema({
    usuarioId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },             //El usuario que respondio
    preguntaId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "pregunta"
    },         //El id de la pregunta a la que se respondio
    respuesta: { type: String, required: true },
    aceptada: {
        type: Boolean,
        required: true,
    },
    fechaPublicacion: { type: Date, required: true }
});


module.exports= mongoose.model('respuesta', respuestaSchema);