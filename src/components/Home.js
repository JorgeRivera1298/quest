import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/home.css';
import '../css/general-styles.css';
import Navbar from './Navbar';
import AuthContext  from '../context/AuthContext';
import AddCategory from './AgregarCategorias';
import MostrarCategorias from './MostrarCategorias';
import PreguntasSinContestar from './PreguntasSinContestar';

let flag = true
let userId = 0;
let arrPerguntasContestadas = []
let arrPerguntasNoContestadas = []


function Home() {
    
    const[contadorValue,contadorActualizador]=useState(0);
    const[preguntas,setPreguntas] = useState(1);
    const example = useContext(AuthContext);
    //const[categorias,setCategorias]=useState(MostrarCategorias.id);
    let idcat=null;
    
    const handlerChange = function(value){
        console.log( value)
        idcat=value;
        console.log(idcat);

    } 
    const registrarPregunta = () => {
        let data1 = document.querySelector("#preguntaTitulo").value;
        let data2 = document.querySelector("#preguntaTexto").value;
        
        
        if (data1 && data2) {

            var newQuestion = {
                titulo: data1,
                descripcion: data2,
                usuarioId: example.data.data.data._id,
                categoriaId: idcat
            }

            axios.post(`api/pregunta`, newQuestion)
                .then((res) => {
                    alert('Pregunta creado correctamente');
                    setPreguntas(preguntas+1)
                    
                    
                })
                .catch((err) => {
                    alert('Ocurrio un error');
                    console.log(err);
                })
        } else {
            console.log("Elements not found");
        }
    };

    if (flag) {
        flag = false;
        userId = localStorage.getItem("userId")
        //console.log(userId)

        //TRAER TODAS LAS CATEGORIAS
        axios.get(`api/getCategorias`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                alert('No se pudieron traer las categorias');
                console.log(err);
            })

        
    }

    return (
        
 
        <div className="nav">
            <Navbar />

            <div className="parte">

                <div className="izq">
                   <MostrarCategorias opcion={1} />
                </div>


                <div className="der">
                   
                    <div className="crear">
                        <div action="" className="cuadro">
                            <input type="text" id="preguntaTitulo" name="title" placeholder="Titulo de tu Pregunta" />
                            <textarea id="preguntaTexto" name="question" cols="10" rows="40" placeholder="Redacta tu Pregunta"></textarea>
                           
                            <MostrarCategorias opcion={2} handlerChange={handlerChange} />
                           
                            
                            
                            <input  type="image" src={require('../Images/checked.png')} alt="submit" onClick={registrarPregunta} />
                        </div>
                    </div>


                    <div className="cards">
                        <p className="title">Preguntas Sin Contestar</p>
                        <PreguntasSinContestar contestadas={preguntas} ></PreguntasSinContestar>
                        {/* <div className="card">
                            <p className="c_title">Titulo de la pregnta</p>
                            <p className="c_data">10/noviembre/2020 - Naturaleza, Animales</p>
                            <p className="c_question"></p>
                            <form action="" className="f_answer">
                                <textarea name="question" id="" cols="10" rows="40" placeholder="redacta tu respuesta"></textarea>
                                <input  type="image" src={require('../Images/checked.png')} on alt="submit" />
                            </form>
                        </div> */}
                        
                    </div>
                    {/* <div>
                        <AddCategory></AddCategory>
                    </div> */}


                </div>
            </div>
        </div>
        
    );
}

export default Home;