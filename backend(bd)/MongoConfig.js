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

const User = mongoose.model('user', userSchema);

module.exports = { User };