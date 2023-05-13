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
        const data = await User.findOne({ email: mail }, 'password');

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
            return res.status(200).json({ userId: data._id });
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
})

//REGISTRAR UNA RESPUESTA
app.post('/api/respuesta', (req, res) => {
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
})











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