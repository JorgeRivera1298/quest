const express = require('express');
const app = express();
const { usuariosregistrados } = require('./usersregisters.js');
const { User, Pregunta, Categoria, Respuesta } = require('./backend(bd)/MongoConfig.js');

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.get('/test', (req, res) => {
    res.send('Entró en la api, mi primer servidor');
})

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

//Login
app.get('/api/login/:mail/:pass', (req, res) => {
    const mail = req.params.mail;
    const pass = req.params.pass;
    const resultado = usuariosregistrados.user.filter(user => user.mail === mail && user.password === pass);
    if (resultado.length === 0) {
        return res.status(404).send(`El correo o la contraseña son equivocados. Verifique`);
    }
    else res.send(resultado);
})

//Register a new User
app.post('/api/register', (req, res) => {
    const body = req.body;

    const myUser = new User({
        email: body.email,
        password: body.password,
        name: body.name,
        nickname: body.nickname
    });

    myUser.save().then(() => {
        res.status(201).json({
            message: 'Usuario creado exitosamente'
        });
    })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: err });
        });
})

//Register a new Question
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

//Register a new Answer
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


//Register a new Category
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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Servidor corriendo en el puerto  ${port}`));