const Pregunta = require('../models/pregunta');

exports.pregunta_create = async (req, res) => {
    const body = req.body;

    const myPregunta = new Pregunta({
        usuarioId: body.usuarioId,
        titulo: body.titulo,
        contestada: body.contestada,
        fechaPublicacion: new Date(),
        categorias: body.categorias,
        likes: body.likes,
        dislikes: body.dislikes,
        favorita: body.favorita
    });

    myPregunta.save().then(() => {
        res.status(201).json({
            message: 'Pregunta creada exitosamente'
        });
    })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
        });
}