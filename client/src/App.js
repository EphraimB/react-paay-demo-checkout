import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import axios from 'axios';

function App() {
  const [products, setProducts] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/products').then((response) => {
      console.log(response);
        setProducts(response.data);
      }).catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
      </Routes>
    </div>
  )
}

export default App;
