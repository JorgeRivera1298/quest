import React from 'react'
import AuthContext  from '../context/AuthContext';
import { useState, useEffect, useContext } from 'react';
import { axiosBase as axios } from "../servicies/config";

let arrPerguntasContestadas = []
let arrPerguntasNoContestadas = []
function PreguntasSinContestar({contestadas}){

    const example = useContext(AuthContext);
    const[preguntas,setPreguntas]=useState([]);
    const[nameCate,setNameCat]=useState();
    const[refresh,setRefresh]=useState(0);

    const responder = function(element){
        const data1 = document.querySelector("#respuesta_"+element._id ).value;
         console.log(element)
        if(data1) {
            var newAnswer = {
                usuarioId: example.data.data.data._id,
                preguntaId:element._id, 
                respuesta: data1,
            }
            axios.post(`/api/respuesta`, newAnswer)
            .then((res) => {
                alert('Gracias por responder, tu respuesta será aprobada por elcreador');
                
                
            })
            .catch((err) => {
                alert('Ocurrio un error');
                console.log(err);
            })
        }     
        else{console.log("No te traje nada");}

        if(data1){
            var updateQuestion = {
                preguntaId: element._id,
                titulo: element.titulo,
                descripcion: element.descripcion,
                contestada: true,
                categoriaId: element.categoriaId
            }
            axios.put(`/api/editarPregunta`, updateQuestion)
            .then((res) => {
                alert('Pregunta actualizada');
                setRefresh(refresh+1)
                
                
            })
            .catch((err) => {
                alert('Ocurrio un error al actualizar la pregunta');
                console.log(err);
            })

        }
        else{console.log("No se actualizó la pregunta");}
        
        

    } 


    useEffect(()=>{
        axios.get(`api/preguntasno`)
        .then((res) => { 
            console.log('estoy trayendo preguntas');
            setPreguntas(res.data.preguntas)
        })

    },[contestadas,refresh])

    return(
        <>
            {
                preguntas.map((elemento)=>{                   
                    return(
                        
                        <div className="card" key={elemento._id}>
                            <p className="c_title">{elemento.titulo}</p>
                            <p className="c_question">{elemento.descripcion}</p>
                            <div className="f_answer">
                                <textarea name="question" id={"respuesta_"+ elemento._id} cols="10" rows="40" placeholder="redacta tu respuesta"></textarea>
                                 <input  type="image" src={require('../Images/checked.png')}  onClick={() =>responder(elemento)}  />
                                 
                            </div>
                        </div>
                    )

                })
            }
            
        </>
    );
}

export default PreguntasSinContestar