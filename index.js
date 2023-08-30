const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Listar todos os usuários
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Deletar um usuário
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: { id: parseInt(id) }
  });
  res.json(user);
});

// Resto do código do servidor

// Adicionar um novo usuário
app.post('/users', async (req, res) => {
    const { nome, telefone } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          nome,
          telefone,
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Could not create user' });
    }
  });

  // Resto do código do servidor

// Editar um usuário
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, telefone } = req.body;
    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { nome, telefone },
      });
      res.json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Could not update user' });
    }
  });
  
  // Resto do código do servidor
  
  
  // Resto do código do servidor
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
