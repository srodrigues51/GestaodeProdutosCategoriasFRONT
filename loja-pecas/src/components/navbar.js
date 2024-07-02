import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from "materialize-css";

function Navbar() {

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className='nav-bar-fixed blue autoclose'>
      <nav>
        <div className='nav-wrapper blue autoclose'>
          <span id="brand-logo" className='brand-logo center'>Gestão de Categorias e Produtos</span>
          <a href="#!" className='sidenav-trigger show-on-large' data-target='sidebar'><i className='material-icons white-text'>menu</i></a>
          <ul id="navbar-items" className="right hide-on-med-and-down">
            <li><a href='#!' className='dropdown-trigger' data-target='dropdown1'><i className="material-icons">account_circle</i></a></li>
            <ul id='dropdown1' className='dropdown-content container'>
              <li className="divider" tabIndex="-1"></li>
              <li><Link to="/">Sair</Link></li>
            </ul>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
