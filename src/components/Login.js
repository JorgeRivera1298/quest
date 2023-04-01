import React from 'react';
import { useState } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/login.css';
import '../css/general-styles.css';

function Login(){
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const onChange = (e) => {
    switch (e.target.name) {
      case 'email':
        setUser(e.target.value);
        break;

      case 'pass':
        setPass(e.target.value);
        break;
    }
  }

  const onSubmit = () => {

    axios.get(`api/login/${user}/${pass}`)
      .then((res) => {
        alert('Bienvenido');
        console.log(res.data);
      })
      .catch((err) => {
        alert('Usuario no existe');
        console.log(err);
      })
      
      
  }
    return(
      
      <div className="container">
        <div className="login">
          <div className="left">
            <img className='imagee' src={ require('../Images/design-person.png') } />
          </div>
          <div className="rightt">
            <p className="titlee">Quest</p>
            <p className="welcomee">Bienvenido a Quest</p>
            <div className="formm" action="">
              <label>correo:</label>
              <input
                type="text"
                name="email"
                value={user}
                onChange={(e) => onChange(e)}
              />
              <label>contraseña:</label>
              <input
                type="password"
                name="pass"
                value={pass}
                onChange={(e) => onChange(e)}
              />
              <br></br>
              <input type="submit" value="Entrar" onClick={() => onSubmit()}></input>
              <a href="/registrarse" className="registerr">Registrarse</a>
              <a href="/home" className="registerr">Entrar como invitado</a>
              {/* <button type="submit" onClick={() => onSubmit()}>Entrar</button> */}
            </div>
          </div>


        </div>
        </div>
    );
       

    
}

export default Login;