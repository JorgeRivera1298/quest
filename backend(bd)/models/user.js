const mongoose = require('mongoose');
const {Schema} =mongoose;

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    nickname: { type: String, required: true },
    name: { type: String },
    lastName: { type: String },
    creationDate: { type: Date, default: Date.now }
});

module.exports= mongoose.model('User', userSchema);