import React from 'react';
import { useState, useContext } from 'react';
import { axiosBase as axios } from "../servicies/config";
import '../css/home.css';
import '../css/general-styles.css';
import AuthContext  from '../context/AuthContext';
import { Link } from 'react-router-dom';



function Navbar() {
	const example = useContext(AuthContext);
	
	console.log(example)


	return (
		
		<div className="navbar">
			<div className="search">
					<Link to="/home" >
					<div>
						<a><p className="logo">Quest</p></a>

					</div>

					</Link>
				
			</div>
			<div className="account">
				<ul className="account_ul">
					<a href="/" > <li>Cerrar Sesion</li></a>
					<Link to="/profile" >
					<div><li>{example.data.data.data.nickname}</li></div>

					</Link>
					
				</ul>
			</div>
		</div>
	);
}

export default Navbar;