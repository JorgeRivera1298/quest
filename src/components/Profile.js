import React from 'react';
import {useContext } from 'react';

import Navbar from './Navbar';
import AuthContext  from '../context/AuthContext';
import PreguntasAprobar from './PreguntasAprobar';
import '../css/home.css';
import '../css/general-styles.css';


function Profile () {
    const example = useContext(AuthContext);
    return (
        <div>
        <Navbar />
        <h1 className='p_title'>{example.data.data.data.name}</h1>
        {console.log(example.data)   }
            <div className='profile'>
               <div className='d-form'>
                <label for="nombre">nombre: </label>
               <input type='text' name='nombre' value= {example.data.data.data.name} ></input>
                <br></br>
                 <label for="nickname">nickname: </label>
                <input type='text' name='nickname' value= {example.data.data.data.nickname} ></input>
                <br></br>
                <label for="contraseña">contraseña: </label>
                <input type='text' name='contraseña' value= {example.data.data.data.password} ></input>

                <input type='submit' value={'Guardar'}></input>
               </div>



            </div>
            <div>
                <h2>Tus preguntas</h2>
                <PreguntasAprobar></PreguntasAprobar>
            </div>
            
        </div>

   
    );
   
    
   


}

export default Profile;