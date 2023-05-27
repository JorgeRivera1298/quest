const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const { mongoose } = require('./backend(bd)/MongoConfig');
const { Pregunta, Categoria, Respuesta, Like, Dislike, Favorita } = require('./backend(bd)/MongoConfig.js');
const User = require('./backend(bd)/models/user');

//Configuración del servidor
app.set('port', process.env.PORT || 3001);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Corriendo el servidor.

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});


// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.get('/', async (req, res) => {

    // const users = await User.find();
    //     res.json(users);
    res.json('API ON')
})

//PARA REGISTRARSE
app.post('/api/register', async (req, res) => {

    const body = req.body;

    const myUser = new User({
        email: body.email,
        password: body.password,
        name: body.name,
        nickname: body.nickname,
        lastName: body.lastName
    });
    console.log(myUser);

    await myUser.save().then(() => {
        res.status(201).json({
            message: 'Usuario creado exitosamente'
        });
    })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
        });
});

//PARA LOGUEARSE
app.get('/api/login/:mail/:pass', async (req, res) => {
    const mail = req.params.mail;
    const pass = req.params.pass;

    try {
        //Traigo la contra  dado un correo
        const data = await User.findOne({ email: mail });

        //No me trae nada 
        if (!data) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //Contraseña equivocada
        if (pass !== data.password) {
            return res.status(401).json({ message: 'Verificar datos' });
        }

        //Todo bien
        else {
            return res.status(200).json({ data: data });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

//REGISTRAR CATEGORIAS
app.post('/api/categoria', (req, res) => {
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
})

//TRAER TODAS LAS CATEGORIAS
app.get('/api/getCategorias', async (req, res) => {

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
});

//REGISTRAR UNA PREGUNTA
app.post('/api/pregunta', (req, res) => {
    const body = req.body;

    const myPregunta = new Pregunta({
        titulo: body.titulo,
        descripcion: body.descripcion,
        usuarioId: body.usuarioId,
        categoriaId: body.categoriaId,
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
})

//REGISTRAR UNA RESPUESTA
app.post('/api/respuesta', async (req, res) => {
    const body = req.body;

    const myRespuesta = new Respuesta({
        usuarioId: body.usuarioId,
        preguntaId: body.preguntaId,
        respuesta: body.respuesta
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

    
})

//TRAER TODAS LAS PREGUNTAS
app.get('/api/preguntas', async (req, res) => {

    try {
        const preguntass = await Pregunta.find();
        return res.status(200).json({preguntas: preguntass});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});


//TRAER TODAS LAS PREGUNTAS SiN CONTESTAR
app.get('/api/preguntasno', async (req, res) => {

    try {
        const preguntass = await Pregunta.find({contestada: false});
        return res.status(200).json({preguntas: preguntass});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});


//EDITAR RESPUESTA
app.put('/api/editarRespuesta', async (req, res) => {
    try {
        const respuestaId = req.body.respuestaId;
        const updatedFields = {
            respuesta: req.body.respuesta,
            aceptada: req.body.aceptada,
        };

        const updatedRespuesta = await Respuesta.findByIdAndUpdate(respuestaId, updatedFields, { new: true });

        if (!updatedRespuesta) {
            return res.status(404).json({ message: 'respuesta not found' });
        }

        return res.status(200).json({ message: 'respuesta updated successfully', respuesta: updatedRespuesta });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

//EDITAR PREGUNTA
app.put('/api/editarPregunta', async (req, res) => {
    try {
        const preguntaId = req.body.preguntaId;
        const updatedFields = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            contestada: req.body.contestada,
            categoriaId: req.body.categoriaId,
        };

        const updatedPregunta = await Pregunta.findByIdAndUpdate(preguntaId, updatedFields, { new: true });

        if (!updatedPregunta) {
            return res.status(404).json({ message: 'Pregunta not found' });
        }

        return res.status(200).json({ message: 'Pregunta updated successfully', pregunta: updatedPregunta });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

//TRAE 1 RESPUES DE 1 PREGUNTA
app.get('/api/preguntaRespuesta/:preguntaId', async (req, res) => {

    const preguntaId = req.params.preguntaId;

    try {
        const data = await Respuesta.findOne({ preguntaId: preguntaId });
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});


//TRAE EL NOMBRE DE LA CATEGORIA PARA UNA PREGUNNTA
app.get('/api/categoriaPregunta/:categoriaId', async (req, res) => {

    const categoriaId = req.params.categoriaId;

    try {
        const data = await Categoria.findOne({ _id: categoriaId },'nombre');
        return res.status(200).json({categorias:data});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

//TRAE TODAS LAS RESPUESTAS DE 1 PREGUNTA
app.get('/api/preguntaRespuestas/:preguntaId', async (req, res) => {

    const preguntaId = req.params.preguntaId;

    try {
        const data = await Respuesta.find({ preguntaId: preguntaId });
        return res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

//traer las preguntas de un usuario
app.get('/api/preguntasUsuario/:usuarioId', async (req, res) => {

    const usuarioId = req.params.usuarioId;
    

    try {
        const data = await Pregunta.find({ usuarioId: usuarioId });
        //mapear data y dentro del map por cada elemento del arreglo voy a traerme las respuestas
        const datacompleta= data.map(async(item)=>{
            const data = await Respuesta.find({ preguntaId: item._id  });
            item.respuestas = data;
            return item;

        })
        return res.status(200).json({preguntas:datacompleta});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});
















/*
//TRAE TODOS MIS USUARIOS
app.get('/api/users', (req, res) => {
    res.send(usuariosregistrados);
})

//Obtener la data de mi Usuario             Supongo que es para la sesion xd
app.get('/api/mails/:mail', (req, res) => {
    const mail = req.params.mail;
    const resultado = usuariosregistrados.user.filter(user => user.mail === mail);
    if (resultado.length === 0) {
        return res.status(404).send(`El correo  ${mail} aún no ha sido registrado`);
    }
    else res.send(resultado);
})
*/


//app.listen(port, () => console.log(`Servidor corriendo en el puerto  ${port}`));