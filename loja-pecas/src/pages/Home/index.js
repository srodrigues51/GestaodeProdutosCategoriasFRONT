import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import axios from 'axios';

function Home() {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/product-categories'); 
      setProductCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos e categorias", error);
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='container'>
        <h4>Lista de Produtos e Categorias</h4>
        <div className='row'>
          <div className='col s12'>
            <Link to="/Product_register" className='btn waves-effect waves-light'>
              Cadastro de Produtos
            </Link>
          </div>
          <div className='col s12' style={{ marginTop: '20px' }}>
            <Link to="/Category_register" className='btn waves-effect waves-light'>
              Cadastro de Categorias
            </Link>
          </div>
        </div>

        <div className='row'>
          <div className='col s12'>
            <table className='striped'>
              <thead>
                <tr>
                  <th>Nome do Produto</th>
                  <th>Descrição do Produto</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody>
                {productCategories.map(item => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>{item.productDescription}</td>
                    <td>{item.categoryName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
