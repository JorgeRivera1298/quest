import logo from './logo.svg';
import './index.css';
import { useState } from 'react';
import { axiosBase as axios } from "./servicios/config";

function App() {
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
        console.log(res.data[0]);
      });
  }

  return (
    <div className="container">
      <div className="login">
        <div className="left">


        </div>
        <div className="right">
          <p className="title">Quest</p>
          <p className="welcome">Bienvenido a Quest</p>
          <div className="form" action="">
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
            <button onClick={() => onSubmit()}>Entrar</button>
          </div>


        </div>


      </div>
    </div>





  );
}

export default App;
