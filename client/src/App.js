import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage";
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage/ConfirmationPage';
import DetailsPage from './pages/DetailsPage/DetailsPage';
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

  const [items, setItems] = useState([]);

  const [totalPrice, setTotalPrice] = useState(0);

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
    data: itemsData,
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
      setItemsCount(itemsData.count);
      setItems(itemsData.items);
      setTotalPrice(itemsData.totalPrice);
    } else if (isItemsError) {
      console.log(itemsError.toString());
    }
  }, [itemsData, itemsError, isItemsError, isItemsLoading, isItemsSuccess]);

  return (
    <div className="App">
      <AppBar loggedIn={loggedInUser} itemsCount={itemsCount} refetchLogin={refetch} setOpenDrawer={setOpenDrawer} setOpenAlert={setOpenAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
      {openAlert && <Alert onClose={() => setOpenAlert(false)} severity={alertType}>{alertMessage}</Alert>}
      <NavDrawer openDrawer={openDrawer} handleDrawerToggle={() => setOpenDrawer(false)} />
      <Routes>
        <Route path="/" element={<HomePage isAdmin={isAdmin} itemsRefetch={itemsRefetch} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />} />
        <Route path="/cart" element={<CartPage itemsRefetch={itemsRefetch} itemsCount={itemsCount} items={items} totalPrice={totalPrice} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />} />
        <Route path="/checkout" element={<CheckoutPage items={items} totalPrice={totalPrice} itemsCount={itemsCount} />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/details/:id" element={<DetailsPage itemsRefetch={itemsRefetch} />} />
        <Route path="*" element={<h1>404</h1>} />
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
