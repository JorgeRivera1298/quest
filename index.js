
const express = require('express');
const app = express();


const{usuariosregistrados}=require('./usersregisters.js');
// console.log(`Hello, ${process.argv[2]}!`);

app.use(express.json());

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});



app.get('/test',(req,res)=>{
    res.send('Entró en la api, mi primer servidor');
})

app.get('/api/users',(req,res)=>{
    res.send(usuariosregistrados);
})


app.get('/api/mails/:mail',(req,res)=>{
    const mail = req.params.mail;
    const resultado= usuariosregistrados.user.filter(user => user.mail=== mail);
    if(resultado.length===0){
        return res.status(404).send(`El correo  ${mail} aún no ha sido registrado`);
    }
    else res.send(resultado);

})

app.get('/api/login/:mail/:pass',(req,res)=>{
    const mail = req.params.mail;
    const pass = req.params.pass;
    const resultado= usuariosregistrados.user.filter(user => user.mail=== mail && user.password===pass);
    if(resultado.length===0){
        return res.status(404).send(`El correo o la contraseña son equivocados. Verifique`);
    }
    else res.send(resultado);

})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Servidor corriendo en el puerto  ${port}`));







