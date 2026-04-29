// src/routes/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importe suas páginas
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Chat from '../pages/Chat.jsx';
import NotFound from '../pages/NotFound.jsx';
import Profile from '../pages/Profile.jsx';
import SellPage from '../pages/SellPage.jsx';
import Settings from '../pages/Settings.jsx';
import ProductDetail from '../pages/ProductDetail.jsx';
import Checkout from '../pages/Checkout.jsx';
import Cart from '../pages/Cart.jsx';
import Favorites from '../pages/Favorites.jsx';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Rota principal */}
            <Route path="/" element={<Home />} />
            
            {/* Rotas de autenticação */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Outras rotas */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/carrinho" element={<Cart />} />
            <Route path="/favoritos" element={<Favorites />} />

            {/* Rota para página não encontrada */}
            <Route path="*" element={<NotFound />} />
            
            
        </Routes>
    );
};

export default AppRoutes;