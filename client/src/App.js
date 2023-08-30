import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import API_BASE_URL from './apiConfig';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ nome: '', telefone: '' });
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingUserId) {
        // Editar usuário existente
        await axios.put(`${API_BASE_URL}/users/${editingUserId}`, formData);
        setUsers(users.map(user => (user.id === editingUserId ? { ...user, ...formData } : user)));
        setEditingUserId(null);
      } else {
        // Adicionar novo usuário
        const response = await axios.post(`${API_BASE_URL}/users`, formData);
        setUsers([...users, response.data]);
      }
      setFormData({ nome: '', telefone: '' });
    } catch (error) {
      console.error('Error adding/editing user:', error);
    }
  };

  const handleEdit = (user) => {
    setFormData({ nome: user.nome, telefone: user.telefone });
    setEditingUserId(user.id);
  };

  const handleCancelEdit = () => {
    setFormData({ nome: '', telefone: '' });
    setEditingUserId(null);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleInputChange}
        />
        <button type="submit">{editingUserId ? 'Salvar' : 'Adicionar'}</button>
        {editingUserId && <button type="button" onClick={handleCancelEdit}>Cancelar</button>}
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nome} - {user.telefone}
            <button onClick={() => handleEdit(user)}>Editar</button>
            <button onClick={() => handleDelete(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
