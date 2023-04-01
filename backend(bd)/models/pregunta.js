const mongoose = require('mongoose');
const {Schema} =mongoose;


const preguntaSchema = new mongoose.Schema({
    usuarioId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    titulo: { type: String, required: true },
    contestada: { type: Boolean,required: true },
    fechaPublicacion: { type: Date, required: true },
    categoria: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "categoria"
    },
    likes: { type: Number, },
    dislikes: { type: Number, },
    favorita: { type: Number, },
});

module.exports= mongoose.model('pregunta', preguntaSchema);