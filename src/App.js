// src/App.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import AddPhone from './components/AddPhone';
import VerifyCode from './components/VerifyCode';
import AddCard from './components/AddCard';
import TransferMoney from './components/TransferMoney';
import TransactionHistory from './components/TransactionHistory'; // Importe o novo componente

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-phone" element={<AddPhone />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/add-card" element={<AddCard />} />
      <Route path="/transfer-money" element={<TransferMoney />} />
      <Route path="/history" element={<TransactionHistory />} /> {}
    </Routes>
  );
};

export default App;
