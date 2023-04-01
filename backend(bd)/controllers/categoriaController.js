const Categoria = require('../models/categoria');


exports.categoria_create = async (req, res) => {
    const body = req.body;

    const myCategoria = new Categoria({
        nombre: body.nombre
    });

    myCategoria.save().then(() => {
        res.status(201).json({
            message: 'Categoria creada exitosamente'
        });
    })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
        });
}


exports.categoria_get = async (req, res) => {

    try {
        const data = await Categoria.find()

        //No me trae nada 
        if (!data) {
            return res.status(401).json({ message: 'Error en el servidor' });
        }

        //Todo bien
        else {
            return res.status(200).json({ categorias: data });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
}