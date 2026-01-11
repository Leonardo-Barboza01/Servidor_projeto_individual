import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './pages/Home.tsx'
import './index.css'; // E o estilo global 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <Home />
  </React.StrictMode>
)