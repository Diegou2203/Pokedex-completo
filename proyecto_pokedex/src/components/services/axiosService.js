import axios from 'axios';

const axiosServer = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // API de prueba para el CRUD
  headers: { 'Content-Type': 'application/json' }
});

export const axiosService = {

  getAccount: async () => {
    const res = await axiosServer.get('/posts?_limit=5'); 
    return res.data;
  },


  addAccount: async (newUser) => {
    const res = await axiosServer.post('/posts', newUser);
    return res;
  },

 
  updateAccount: async (id, updatedData) => {
    const res = await axiosServer.put(`/posts/${id}`, updatedData);
    return res;
  },

  deleteAccount: async (id) => {
    const res = await axiosServer.delete(`/posts/${id}`);
    return res; 
  },
};

