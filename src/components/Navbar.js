import React from 'react';
import { useState } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/home.css';
import '../css/general-styles.css';


function Navbar(){
    return(
    <div className="navbar">
		<div className="search">
            <p className="logo">Quest</p>
		</div>
		<div className="account">
			<ul className="account_ul">
				<a href="/" > <li>Cerrar Sesion</li></a>
				<li>Perfil</li>
                <li>
                <img src={ require('../Images/design-person.png') } />
                    {/* <img src="/Images/design-person.png" alt=""> */}

                </li>
			</ul>
		</div>
	</div>
    );
}

export default Navbar;