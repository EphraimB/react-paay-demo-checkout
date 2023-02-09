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
    console.log("useEffect hook running");
    if (isLoading) {
      console.log('Loading');
    } else if (isSuccess) {
      setLoggedInUser(user.id);
      setIsAdmin(user.isAdmin);
    } else if (isError) {
      console.log(error.toString());
    }
  }, [user, error, isError, isLoading, isSuccess, user]);

  console.log(loggedInUser);

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
