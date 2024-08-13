import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import '../hojas-de-estilo/Navbar.css';
import Logo from '../imagenes/logo-navbar.png';

const Navbar = () => {
 return (
   <header className="header">
     <nav className="nav_container">
      <div className="logo_navbar">
        <img src={Logo} alt = "logo" />
      </div>

       <NavLink to="/" className="nav_logo">
         Automotores Reiga
       </NavLink>

       <div
         className={"nav__menu"}
         id="nav-menu"
       >
         <ul className="nav__list">
           <li className="nav__item">
             <NavLink to="/" className="nav__link">
               Inicio
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink to="/empresa" className="nav__link">
               Empresa
             </NavLink>
           </li>
           {/* <li className="nav__item"> */}
             <NavLink
               to="/vehiculos"
               className="nav__link"
             >
               Vehiculos
             </NavLink>
           {/* </li> */}
           <li className="nav__item">
             <NavLink
               to="/servicios"
               className="nav__link"
             >
               Servicios
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink
               to="/blog"
               className="nav__link"
             >
               Blog
             </NavLink>
           </li>
           <li className="nav__item">
             <NavLink to="/get-started" className="nav__link nav__cta">
               Registrase
             </NavLink>
           </li>
         </ul>
         <div className="nav__close" id="nav-close">
           <IoClose />
         </div>
       </div>

       <div className="nav__toggle" id="nav-toggle">
         <IoMenu />
       </div>
     </nav>
   </header>
 );
};

export default Navbar;