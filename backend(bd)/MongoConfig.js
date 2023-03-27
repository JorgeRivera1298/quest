const mongoose = require('mongoose');

// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/PW2db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexión exitosa a la base de datos'))
    .catch(err => console.error(err));

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    nickname: { type: String }
});

// Definición del esquema de pregunta
const preguntaSchema = new mongoose.Schema({
    usuarioId: { type: String, required: true },
    titulo: { type: String, required: true },
    contestada: { type: Boolean, required: true },
    fechaPublicacion: { type: String, required: true },
    categorias: { type: Array, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    favorita: { type: Boolean, required: true },
});

// Definición del esquema de respuestas
const respuestaSchema = new mongoose.Schema({
    usuarioId: { type: Number, required: true },             //El usuario que respondio
    preguntaId: { type: Number, required: true },         //El id de la pregunta a la que se respondio
    respuesta: { type: String, required: true },
    fechaPublicacion: { type: String, required: true }
});

// Definición del esquema de categorias
const categoriaSchema = new mongoose.Schema({
    nombre: { type: String, required: true }
});

const User = mongoose.model('user', userSchema);
const Pregunta = mongoose.model('pregunta', preguntaSchema);
const Respuesta = mongoose.model('respuesta', respuestaSchema);
const Categoria = mongoose.model('categoria', categoriaSchema);

module.exports = {
    User: User,
    Pregunta: Pregunta,
    Respuesta: Respuesta,
    Categoria: Categoria
};