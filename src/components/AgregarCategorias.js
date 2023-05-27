import React from 'react'
import { useState, useEffect, useContext } from 'react';
import AuthContext  from '../context/AuthContext';
import '../css/home.css';
import '../css/general-styles.css';
import { axiosBase as axios } from "../servicies/config";
import MostrarCategorias from './MostrarCategorias';

function AddCategory(){
    const exapmle = useContext(AuthContext);
    let categorias = MostrarCategorias
    console.log(categorias);
    

    const registrarCategoria = () => {
        let data1 = document.querySelector("#preguntaTextocat").value;
        console.log(("#preguntaTextocat").value);

        if (data1) {

            var newCategory = {
                nombre: data1,
            }
            axios.post(`/api/categoria`, newCategory)
                .then((res) => {
                    alert('Categoría creada correctamente');
                    //setPreguntas(traerpreguntas)
                    
                    
                })
                .catch((err) => {
                    alert('Ocurrio un error');
                    console.log(err);
                })
        } else {
            console.log("Elements not found");
        }
    };


    return (
        <div>
            <h1>Hola {exapmle.data.data.data.nickname}</h1>
            <h2>Registra una categoría</h2>
            <div className="crear">
                        <div action="" className="cuadro">
                            <h1>Nombre de la categoría</h1>
                            <textarea id="preguntaTextocat" name="question" cols="10" rows="40" placeholder="Escribe el nombre de la categoría"></textarea>
                            <input  type="image" src={require('../Images/checked.png')}  alt="submit" onClick={registrarCategoria}  />
                        </div>
            </div>
        </div>
        
        
        
    );
}

export default AddCategory;