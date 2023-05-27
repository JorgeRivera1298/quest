import React from 'react'
import AuthContext  from '../context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/home.css';

function MostrarCategorias({opcion,handlerChange=undefined}){
    //const example = useContext(AuthContext);
    const[categorias,setCategorias]=useState([]);

    useEffect(()=>{
        axios.get(`api/getCategorias`)
        .then((res) => { 
            setCategorias(res.data.categorias)
        })

    },[])

    const clickCategoria= function(id, nombre){
        alert ('El nombre de la categoría es:' + nombre +' y de id: ' +id )
    }

    const[idSelected,setIdSelected]= useState();
    const handlerMostrarid = function(e){
        const opcion=e.target.value;
        setIdSelected(opcion);
        handlerChange && handlerChange(opcion);
    }

    return(
        <>
          
        {
            opcion==1?
            categorias.map((elemento)=>{
                return(
                    <ul className='izq_ul'>
                        
                        <li  key={elemento._id}>{elemento.nombre}</li>
                        
                    </ul>
                    
                )
            })
            :
                <select onChange={handlerMostrarid} >
                    <option>Seleccione una categoría</option>
                        {categorias.map((elemento)=>{
                            return(
                                <option key={elemento._id} value={elemento._id}>{
                                elemento.nombre}
                                </option>
                                )})}
                </select>
            
        }

        </>




    );
}


export default MostrarCategorias;