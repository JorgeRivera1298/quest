import React from 'react';
import {useContext,useEffect,useState } from 'react';
import AuthContext  from '../context/AuthContext';
import { axiosBase as axios } from "../servicies/config";
import '../css/home.css';
import '../css/general-styles.css';

function PreguntasAprobar(){
    
    const example = useContext(AuthContext);
    const[preguntas,setPreguntas]=useState([]);

    useEffect(()=>{
        axios.get(`/api/preguntasUsuario/${example.data.data.data._id}`)
        .then((res) => {

            
            console.log(res.data.preguntas)
            setPreguntas(res.data.preguntas)
        })


    },[])

    const  elementosmap = preguntas.map((item)=>{

        return(
            <div key={item._id} className='rojo'>
                <p>{item.titulo}</p>


            </div>
        );
    })

    return(
        <>
        <h1>por aprobar</h1>
        {
            preguntas.map((elemento)=>{
                if(elemento.contestada){
                    return(
                    
                        <div className="card" key={elemento._id}>
                        <p className="c_title">{elemento.titulo}</p>
                        <p className="c_question">{elemento.descripcion}</p>
                        {
                            elementosmap
                        }
                        {/* <div className="f_answer">
                            <textarea name="question" id={"respuesta_"+ elemento._id} cols="10" rows="40" placeholder="redacta tu respuesta"></textarea>
                             <input  type="image" src={require('../Images/checked.png')}  onClick={() =>responder(elemento)}  />
                             
                        </div> */}
                         </div>
                    )
                }
              
            })
        }


</>
        
    );
}

export default PreguntasAprobar;