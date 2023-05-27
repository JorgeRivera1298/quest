const mongoose = require('mongoose');

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/PW2db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
    .then(() => console.log('Conexión exitosa a la base de datos '))
    .catch(err => console.error(err));

module.exports = mongoose;

// Definición del esquema de pregunta
const preguntaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    contestada: { type: Boolean, default: false},
    fechaPublicacion: { type: Date, default: Date.now },
    usuarioId: { type: String, required: true },
    categoriaId: { type: String, required: true },
});

// Definición del esquema de respuestas
const respuestaSchema = new mongoose.Schema({
    usuarioId: { type: String, required: true },             //El usuario que respondio
    preguntaId: { type: String, required: true },         //El id de la pregunta a la que se respondio
    respuesta: { type: String, required: true },
    aceptada: { type: Boolean, default: false},
    fechaPublicacion: { type: Date, default: Date.now },
    // id_pregunta: { type: mongoose.Schema.Types.ObjectId, ref: preguntaSchema }//lo que dbí hacer
});

// Definición del esquema de categorias
const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
});

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

const dislikeSchema = new mongoose.Schema({
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

const favoritaSchema = new mongoose.Schema({
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


//const User = mongoose.model('user', userSchema);
const Pregunta = mongoose.model('pregunta', preguntaSchema);
const Respuesta = mongoose.model('respuesta', respuestaSchema);
const Categoria = mongoose.model('categoria', categoriaSchema);
const Like = mongoose.model('like', likeSchema);
const Dislike = mongoose.model('dislike', dislikeSchema);
const Favorita = mongoose.model('favorita', favoritaSchema);

module.exports = {
    //User: User,
    Pregunta: Pregunta,
    Respuesta: Respuesta,
    Categoria: Categoria,
    Like: Like,
    Dislike: Dislike,
    Favorita: Favorita
};