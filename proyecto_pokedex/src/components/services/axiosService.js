import axios from 'axios';

export const axiosServer = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // API de prueba para el CRUD
  headers: { 'Content-Type': 'application/json' }
});

export const crudService = {

  getFavorites: async () => {
    const res = await axiosServer.get('/posts?_limit=5'); // Traer 5 posts de prueba
    return res.data;
  },


  addFavorite: async (newPoke) => {
    const res = await axiosServer.post('/posts', newPoke);
    return res.data;
  },

 
  updateFavorite: async (id, updatedData) => {
    const res = await axiosServer.put(`/posts/${id}`, updatedData);
    return res.data;
  },

  deleteFavorite: async (id) => {
    await axiosServer.delete(`/posts/${id}`);
    return id; 
  },
};