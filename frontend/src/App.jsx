import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import PrivateRoute from './routes/PrivateRoute';
import { Login } from './pages/LoginPage';
import { Navbar } from './components/Navbar';
import { Register } from './pages/RegisterPage';
import { Projects } from './pages/ProjectPage';
import { Tasks } from './pages/TaskPage';
import Reports from './pages/ReportsPage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Reports />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to={isAuthenticated ? '/projects' : '/login'} replace />} />
      </Routes>
    </>
  );
}

export default App;