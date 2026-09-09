import api from './axios';

export const getTasks = (params = {}) =>
  api.get('/tasks', { params }).then((res) => res.data);

export const createTask = (data) =>
  api.post('/tasks', data).then((res) => res.data);

export const updateTask = (id, data) =>
  api.put(`/tasks/${id}`, data).then((res) => res.data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`).then((res) => res.data);