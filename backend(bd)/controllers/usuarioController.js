const User = require('./backend(bd)/models/user');

exports.usuario_create = async (req, res) => {

    //console.log("JAPANESE GIRLS");

    const body = req.body;

    const myUser = new User({
        email: body.email,
        password: body.password,
        name: body.name,
        nickname: body.nickname
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
};

exports.usuario_login = async (req, res) => {
    const mail = req.params.mail;
    const pass = req.params.pass;
    let userId = 0;

    console.log(mail);
    console.log(pass);

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
            //Seteamos el id del usuario
            userId = data._id
            return res.status(200).json(data);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};