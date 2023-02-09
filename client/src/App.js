import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import CartPage from './pages/CartPage/CartPage';
import {
  useGetUserQuery
} from "./features/api/apiSlice";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(0);
  const [isAdmin, setIsAdmin] = useState(0);

  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetUserQuery();

  useEffect(() => {
    if (isLoading) {
      console.log('Loading');
    } else if (isSuccess) {
      console.log(user);
      setLoggedInUser(user.user_id);
      setIsAdmin(user.isAdmin);
    } else if (isError) {
      console.log(error.toString());
    }
  }, [error, isError, isLoading, isSuccess, user, refetch]);

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<HomePage loggedIn={loggedInUser} isAdmin={isAdmin} refetchLogin={refetch} />} />
        <Route path="/cart" element={<CartPage loggedIn={loggedInUser} isAdmin={isAdmin} refetchLogin={refetch} />} />
      </Routes>
    </div>
  )
}

export default App;
