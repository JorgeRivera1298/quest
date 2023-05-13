import React from 'react';
import { useState } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/home.css';
import '../css/general-styles.css';
import Navbar from './Navbar';
import User from '../stuff/UserSingleton';

let flag = true

function Home() {
    if (flag) {
        flag = false;

        const userInstance = new User();
        console.log(userInstance.getMyUserId())

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

                            <input type="text" name="title" placeholder="Titulo de tu Pregunta" />
                            <textarea name="question" id="" cols="10" rows="40" placeholder="Redacta tu Pregunta"></textarea>
                            <input type="image" src={require('../Images/checked.png')} on alt="submit" />
                        </div>
                    </div>
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
                    </div>

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