import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import axios from 'axios';

function App() {
  axios.defaults.withCredentials = true;
  
  const [products, setProducts] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/user').then((response) => {
      console.log(response);
      setLoggedInUser(response.data);
    }).catch(err => {
      console.log(err);
    });

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
        <Route path="/" element={<HomePage products={products} loggedIn={loggedInUser} />} />
      </Routes>
    </div>
  )
}

export default App;
