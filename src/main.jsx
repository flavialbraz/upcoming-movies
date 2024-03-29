import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './global.css'
import "./responsive.css"
import Home from './Home/index'
import More from './More/index'
 

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/more/:id" element={<More />} />
    </Routes>

    <footer className="footer"> Feito com ❤  Confira os próximos lançamentos  </footer>
    
  </BrowserRouter>,
)
