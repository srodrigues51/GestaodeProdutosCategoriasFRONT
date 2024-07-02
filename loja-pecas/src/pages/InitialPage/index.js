import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link se ainda não o fez

function Home() {
  return (
    <div className='nav-bar-fixed'>
      <nav className='nav-container'>
        <div className='nav-wrapper blue'>
          <a id="brand-logo" href="/" className='brand-logo center'>Gestão de Categorias</a>
        </div>
      </nav>
      <div className='container'>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='container center'>
          <br />
          <div className='row'>
            <Link to="/Home" className="waves-effect waves-light btn-large">Acessar Sistema</Link>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
}

export default Home;
