import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import axios from 'axios';
import CartPage from './pages/CartPage/CartPage';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  axios.defaults.withCredentials = true;

  const [loggedInUser, setLoggedInUser] = useState(0);
  const [isAdmin, setIsAdmin] = useState(0);

  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    axios.get('http://localhost:5001/user').then((response) => {
      console.log(response);
      setLoggedInUser(response.data.id);
      setIsAdmin(response.data.isAdmin);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<HomePage loggedIn={loggedInUser} isAdmin={isAdmin} />} />
        <Route path="/cart" element={<CartPage loggedIn={loggedInUser} isAdmin={isAdmin} />} />
      </Routes>
    </div>
  )
}

export default App;
