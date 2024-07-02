import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Sidebar from '../../components/sidebar';
import axios from 'axios';

function CadastroCategorias() {
  const [categories, setCategories] = useState([]);
  const [categoryType, setCategoryType] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [filter, setFilter] = useState('');
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const newCategory = { type: categoryType, description: categoryDescription };
      if (editCategory) {
        await axios.put(`http://localhost:8080/api/categories/${editCategory.id}`, newCategory);
      } else {
        await axios.post('http://localhost:8080/api/categories', newCategory);
      }
      fetchCategories();
      setCategoryType('');
      setCategoryDescription('');
      setEditCategory(null);
    } catch (error) {
      console.error("Erro ao adicionar/atualizar categoria", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setCategoryType(category.type);
    setCategoryDescription(category.description);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className='container'>
        <h4>Cadastro de Categorias</h4>
        <div className='row'>
          <div className='input-field col s12'>
            <input
              id='category_type'
              type='text'
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
            />
            <label htmlFor='category_type' className={editCategory ? 'active' : ''}>
              Tipo da Categoria
            </label>
          </div>
          <div className='input-field col s12'>
            <input
              id='category_description'
              type='text'
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
            <label htmlFor='category_description' className={editCategory ? 'active' : ''}>
              Descrição da Categoria
            </label>
          </div>
          <div className='col s12'>
            <button className='btn waves-effect waves-light' onClick={handleAddCategory}>
              {editCategory ? 'Atualizar Categoria' : 'Adicionar Categoria'}
            </button>
          </div>
        </div>

        <h4>Filtrar Categorias</h4>
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

        <h4>Listagem de Categorias</h4>
        <div className='row'>
          {filteredCategories.map(category => (
            <div className='col s12 m6 l4' key={category.id}>
              <div className='card'>
                <div className='card-content'>
                  <span className='card-title'>{category.type}</span>
                  <p>{category.description}</p>
                </div>
                <div className='card-action'>
                  <button className='btn-small blue' onClick={() => handleEditCategory(category)}>
                    Editar
                  </button>
                  <button className='btn-small red' onClick={() => handleDeleteCategory(category.id)}>
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

export default CadastroCategorias;
