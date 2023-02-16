import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import AppBar from './components/AppBar/AppBar';
import NavDrawer from './components/NavDrawer/NavDrawer';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import {
  useGetUserQuery,
  useGetItemsQuery
} from "./features/api/apiSlice";

function App() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState(null);
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
    <div className="App">
      <AppBar loggedIn={loggedInUser} itemsCount={itemsCount} refetchLogin={refetch} setOpenDrawer={setOpenDrawer} setOpenAlert={setOpenAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
      {openAlert && <Alert onClose={() => setOpenAlert(false)} severity={alertType}>{alertMessage}</Alert>}
      <NavDrawer openDrawer={openDrawer} handleDrawerToggle={() => setOpenDrawer(false)} />
      <Routes>
        <Route path="/" element={<HomePage isAdmin={isAdmin} itemsRefetch={itemsRefetch} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />} />
        <Route path="/cart" element={<CartPage itemsRefetch={itemsRefetch} itemsCount={itemsCount} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </div>
  )
}

export default App;
