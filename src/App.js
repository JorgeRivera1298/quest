import logo from './logo.svg';

import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Prueba from './components/Prueba';
import Registrar from './components/Registrar';
import Navbar from './components/Navbar';
import Home from './components/Home';

function App() {

  return (
    <div className='App'>      
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Login />} exact ></Route>
            <Route path='/registrarse' element={ <Registrar />} exact ></Route>
            <Route path='/home' element={ <Home />} exact ></Route>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
