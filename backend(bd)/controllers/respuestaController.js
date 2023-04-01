const Respuesta = require('../models/respuesta');

exports.respuesta_create = async (req, res) => {
    const body = req.body;

    const myRespuesta = new Respuesta({
        usuarioId: body.usuarioId,
        preguntaId: body.preguntaId,
        respuesta: body.respuesta,
        fechaPublicacion: new Date()
    });

    myRespuesta.save().then(() => {
        res.status(201).json({
            message: 'Respuesta creada exitosamente'
        });
    })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
        });
}