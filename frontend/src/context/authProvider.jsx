import { useState } from 'react';
import api from '../api/axios';
import AuthContext from './authContext';

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    const stored = localStorage.getItem('usuario');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const guardarSesion = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));
    setToken(data.token);
    setUsuario(data.usuario);
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      guardarSesion(data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales inválidas');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (nombre, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', { nombre, email, password });
      guardarSesion(data);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'No se pudo registrar el usuario');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setToken(null);
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{ usuario, token, isAuthenticated: !!token, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};