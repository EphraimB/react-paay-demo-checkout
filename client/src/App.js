import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import CartPage from './pages/CartPage/CartPage';
import {
  useGetUserQuery,
  useGetItemsQuery
} from "./features/api/apiSlice";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(0);
  const [isAdmin, setIsAdmin] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);

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
      setLoggedInUser(user.id);
      setIsAdmin(user.isAdmin);
    } else if (isError) {
      console.log(error.toString());
    }
  }, [user, error, isError, isLoading, isSuccess]);

  const {
    data: items,
    isLoading: isItemsLoading,
    isSuccess: isItemsSuccess,
    isError: isItemsError,
    error: itemsError,
    refetch: itemsRefetch
  } = useGetItemsQuery();

  useEffect(() => {
    if (isItemsLoading) {
      console.log('Items loading');
    } else if (isItemsSuccess) {
      setItemsCount(items.count);
    } else if (isItemsError) {
      console.log(itemsError.toString());
    }
  }, [items, itemsError, isItemsError, isItemsLoading, isItemsSuccess]);

  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<HomePage loggedIn={loggedInUser} isAdmin={isAdmin} itemsCount={itemsCount} refetchLogin={refetch} />} />
        <Route path="/cart" element={<CartPage loggedIn={loggedInUser} isAdmin={isAdmin} itemsCount={itemsCount} refetchLogin={refetch} />} />
      </Routes>
    </div>
  )
}

export default App;
