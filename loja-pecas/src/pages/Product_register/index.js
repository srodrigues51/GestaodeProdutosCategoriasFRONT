import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import axios from 'axios';

function ProductRegister() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filter, setFilter] = useState('');
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/produtos');
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      const newProduct = {
        name: productName,
        description: productDescription,
        categoria: { id: selectedCategory } // Vinculando o ID da categoria ao produto
      };
      if (editProduct) {
        await axios.put(`http://localhost:8080/api/produtos/${editProduct.id}`, newProduct);
      } else {
        await axios.post('http://localhost:8080/api/produtos', newProduct);
      }
      fetchProducts();
      setProductName('');
      setProductDescription('');
      setSelectedCategory('');
      setEditProduct(null);
    } catch (error) {
      console.error("Erro ao adicionar/atualizar produto", error);
    }
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setProductName(product.name);
    setProductDescription(product.description);
    setSelectedCategory(product.categoria.id);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/produtos/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Erro ao deletar produto", error);
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='container'>
        <h4>Cadastro de Produtos</h4>
        <div className='row'>
          <div className='input-field col s12'>
            <input 
              id='product_name' 
              type='text' 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
            />
            <label htmlFor='product_name' className={editProduct ? 'active' : ''}>Nome do Produto</label>
          </div>
          <div className='input-field col s12'>
            <input 
              id='product_description' 
              type='text' 
              value={productDescription} 
              onChange={(e) => setProductDescription(e.target.value)} 
            />
            <label htmlFor='product_description' className={editProduct ? 'active' : ''}>Descrição do Produto</label>
          </div>
          <div className='input-field col s12'>
            <select
              id='category'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='browser-default'
            >
              <option value='' disabled>Escolha uma categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.type}
                </option>
              ))}
            </select>
          </div>
          <div className='col s12'>
            <button className='btn waves-effect waves-light' onClick={handleAddProduct}>
              {editProduct ? 'Atualizar Produto' : 'Adicionar Produto'}
            </button>
          </div>
        </div>

        <h4>Filtrar Produtos</h4>
        <div className='row'>
          <div className='input-field col s12'>
            <input 
              id='filter' 
              type='text' 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)} 
            />
            <label htmlFor='filter'>Filtrar por Nome</label>
          </div>
        </div>

        <h4>Listagem de Produtos</h4>
        <div className='row'>
          {filteredProducts.map(product => (
            <div className='col s12 m6 l4' key={product.id}>
              <div className='card'>
                <div className='card-content'>
                  <span className='card-title'>{product.name}</span>
                  <p>{product.description}</p>
                  <p>Categoria: {product.categoria.type}</p>
                </div>
                <div className='card-action'>
                  <button className='btn-small blue' onClick={() => handleEditProduct(product)}>
                    Editar
                  </button>
                  <button className='btn-small red' onClick={() => handleDeleteProduct(product.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductRegister;
