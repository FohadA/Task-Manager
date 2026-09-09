import api from './axios';

export const getProjects = (params = {}) =>
  api.get('/projects', { params }).then((res) => res.data);

export const createProject = (data) =>
  api.post('/projects', data).then((res) => res.data);

export const updateProject = (id, data) =>
  api.put(`/projects/${id}`, data).then((res) => res.data);

export const deleteProject = (id) =>
  api.delete(`/projects/${id}`).then((res) => res.data);