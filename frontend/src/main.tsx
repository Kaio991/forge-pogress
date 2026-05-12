import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Dashboard from './Dashboard.tsx'
import CriarTreino from './treino.tsx'
import EditarTreino from './EditarTreino.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/criar-treino" element={<CriarTreino />} />
        <Route path="/editar-treino/:id" element={<EditarTreino />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)