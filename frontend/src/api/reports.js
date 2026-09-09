import api from './axios';

export const getReports = () => api.get('/reportes').then((res) => res.data);