import React from 'react';
import { useState } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/register.css';
import '../css/general-styles.css';

function Registrar(){
      //Hooks
      const [name, setName] = useState('');
      const [nickname, setNickname] = useState('');
      const [email, setEmail] = useState('');
      const [pass, setPass] = useState('');


      const onChange = (e) => {
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;   
            case 'nickname':
                setNickname(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'pass':
                setPass(e.target.value);
                break;
        }
      }

    function agregarUsuario(){

        var usuario ={
            name: name,
            nickname: nickname,
            email: email,
            password:pass
        }
        axios.post(`api/register`, usuario)
        .then((res) => {
            alert('Usuario creado correctamente');
          console.log(res.data);
        })
        .then(err =>{console.log(err)});

    }
    
    return(
        <div className="container">
            <div className="register">
                <div className="izquierda">
                    <p className="titulo">Quest</p>
                    <p className="crear">Crear una cuenta</p>
                    <div className="formulario" action="">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => onChange(e)}
                        />
                        <label>Nickname:</label>
                        <input
                            type="text"
                            name="nickname"
                            value={nickname}
                            onChange={(e) => onChange(e)}
                        />
                            <label>Correo:</label>
                        <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={(e) => onChange(e)}
                        />
                            <label>Contraseña:</label>
                        <input
                            type="password"
                            name="pass"
                            value={pass}
                            onChange={(e) => onChange(e)}
                        />
                                    
                        <input type="submit" value="Registrarse"  onClick={agregarUsuario}></input>
                        <a href="/" className="iniciar">Iniciar Sesion</a>
                        {/* <button type="submit" onClick={() => onSubmit()}>Entrar</button> */}
                    </div>
                </div>
                <div className="derecha">
                    <img className='imagen' src={ require('../Images/design-person2.png') } />  
                </div>


            </div>
         </div>
    );
       

    
}

export default Registrar;