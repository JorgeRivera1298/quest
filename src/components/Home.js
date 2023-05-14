import React from 'react';
import { useState } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/home.css';
import '../css/general-styles.css';
import Navbar from './Navbar';

let flag = true
let userId = 0;
let arrPerguntasContestadas = []
let arrPerguntasNoContestadas = []

function Home() {

    const registrarPregunta = () => {
        let data1 = document.querySelector("#preguntaTitulo").value;
        let data2 = document.querySelector("#preguntaTexto").value;

        if (data1 && data2) {

            var newQuestion = {
                titulo: data1,
                descripcion: data2,
                usuarioId: userId,
                categoriaId: "EjemploCategoria",
            }

            axios.post(`api/pregunta`, newQuestion)
                .then((res) => {
                    alert('Pregunta creado correctamente');
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

        //TRAER TODAS LAS PREGUNTAS
        axios.get(`api/preguntas`)
            .then((res) => {
                //console.log(res.data);
                let data = res.data
                for (let i = 0; i < data.length; i++) {
                    if (res.data[i].contestada == false) {
                        arrPerguntasNoContestadas.push(res.data[i])
                        console.log("PREGUNTA NO CONTESTADA");
                        console.log(res.data[i].contestada);
                    }
                    else {
                        arrPerguntasContestadas.push(res.data[i])
                        console.log("PREGUNTA CONTESTADA");
                        console.log(res.data[i].contestada);
                    }
                }
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
                    <ul className="izq_ul">
                        <li>entretenimiento</li>
                        <li>ciencia</li>
                        <li>cine</li>
                        <li>arte</li>
                        <li>matematicas</li>
                        <li>animales</li>
                    </ul>
                </div>


                <div className="der">
                    <div className="crear">
                        <div action="" className="cuadro">
                            <input type="text" id="preguntaTitulo" name="title" placeholder="Titulo de tu Pregunta" />
                            <textarea id="preguntaTexto" name="question" cols="10" rows="40" placeholder="Redacta tu Pregunta"></textarea>
                            <input type="image" src={require('../Images/checked.png')} alt="submit" onClick={registrarPregunta} />
                        </div>
                    </div>


                    {/*  
                    <div className="cards">
                        <p className="title">Preguntas Contestadas</p>
                        <div className="card">
                            <p className="c_title">Titulo de la pregnta</p>
                            <p className="c_accions"
                            ><img src={require('../Images/saved.png')} alt="" />
                                <img src={require('../Images/liked.png')} alt="" />
                                <img src={require('../Images/dislike.png')} alt="" />

                            </p>
                            <p className="c_data">10/noviembre/2020 - Naturaleza, Animales</p>
                            <p className="c_question">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit cupiditate alias aperiam beatae nisi. Repudiandae nemo commodi suscipit. Repudiandae maiores perspiciatis culpa et distinctio eius amet ullam nobis ipsum odit.</p>
                            <p className="c_answer">Respuesta: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit cupiditate alias aperiam beatae nisi. Repudiandae nemo commodi suscipit. Repudiandae maiores perspiciatis culpa et distinctio eius amet ullam nobis ipsum odit.</p>
                        </div>
                    </div>*/}

                    <div class="cards">
                        <p class="title">Preguntas Sin Contestar</p>
                        <div class="card">
                            <p class="c_title">Titulo de la pregnta</p>
                            <p class="c_data">10/noviembre/2020 - Naturaleza, Animales</p>
                            <p class="c_question">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit cupiditate alias aperiam beatae nisi. Repudiandae nemo commodi suscipit. Repudiandae maiores perspiciatis culpa et distinctio eius amet ullam nobis ipsum odit.</p>
                            <form action="" class="f_answer">
                                <textarea name="question" id="" cols="10" rows="40" placeholder="redacta tu respuesta"></textarea>
                                <input type="image" src={require('../Images/checked.png')} on alt="submit" />
                            </form>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Home;