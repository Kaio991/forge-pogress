import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importando as páginas (verifique se os nomes batem com os arquivos)
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Dashboard from './pages/Dashboard';
import Treino from './pages/treino';
import EditarTreino from './pages/EditarTreino';

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/criar-treino" element={<Treino />} />
        <Route path="/editar-treino/:id" element={<EditarTreino />} />
      </Routes>
    </BrowserRouter>
  );
}