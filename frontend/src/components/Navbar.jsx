import React, { useState, useRef, useEffect } from 'react';
import './navbar.css';
import UserDropdown from './Dropdown.jsx';
import Footer from './Footer.jsx';
import Suggestions from './Suggestions.jsx';
import { Link } from 'react-router-dom';
import logo from '../assets/logo/logo-atual.svg'; // Certifique-se de que o caminho para o logo está correto
import { useAuth } from '../context/useAuth.js';

export default function Navbar() {
    const { isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    // Fechar sugestões ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Função para lidar com mudanças na busca
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        
        if (value.trim() === '') {
            setShowSuggestions(false);
        } else {
            setShowSuggestions(true);
        }
    };

    // Função para selecionar uma sugestão
    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowSuggestions(false);
        // Aqui você pode redirecionar para a página de busca
        console.log('Item selecionado:', suggestion);
    };

    // Função para realizar a busca
    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== '') {
            setShowSuggestions(false);
            console.log('Buscando por:', searchQuery);
            // Aqui você implementaria a navegação para resultados
        }
    };

    // Lidar com tecla Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <nav className="w-full flex items-center p-3 hover:shadow-md">
            <div className="container mx-auto flex items-center justify-between md:justify-start">
                {/* Logo */}
                <div className="ml-4 mr-7 flex items-center">
                    {/* SVG Logo */}
                    <Link to="/" className="flex items-center max-h-20">
                        <img 
                            src={logo} 
                            alt="Trade2Fly Logo" 
                            className="h-6 mr-5 w-auto"
                        />
                    </Link>
                </div>

                {/* Search Bar com Sugestões */}
                <div className="hidden md:flex relative items-center bg-gray-800" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar itens..."
                            className="w-full px-4 py-2 pl-10 pr-10 rounded-lg border border-gray-700 bg-gray-800 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    placeholder-gray-500 text-gray-500"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => searchQuery && setShowSuggestions(true)}
                        />
                    
                        <div className="flex items-center space-x-4">
                            {/* Ícone de busca dentro da barra */}
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <button 
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                                onClick={handleSearchSubmit}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Componente de Sugestões */}
                    <Suggestions 
                        searchQuery={searchQuery}
                        onSuggestionClick={handleSuggestionClick}
                        isVisible={showSuggestions}
                    />
                </div>

                <div className="hidden md:flex items-center justify-end ml-auto mr-10 ">

                    {/* Ícone do carrinho de compras */}
                    <button
                        className="p-2 rounded-md text-xl text-gray-300 hover:text-blue-600 hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Link to="/carrinho"><img src="/images/icons/carrinho.svg" alt="Carrinho de Compras" className="h-6 w-6" /></Link>
                        
                    </button>

                    {/* Ícone dos favoritos */}
                    <button
                        className="p-2 rounded-md text-xl text-gray-300 hover:text-blue-600 hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Link to="/favoritos"><img src="/images/icons/fav.svg" alt="Ícone favoritos" className="h-6 w-6" /></Link>
                    </button>
                    
                    {/* Ícone do chat */}
                    <button
                        className="p-2 rounded-md text-xl text-gray-300 hover:text-blue-600 hover:bg-gray-700 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Link to="/chat"><img src="/images/icons/chat.svg" alt="Ícone chat" className="h-6 w-6" /></Link>
                    </button>                    

                    {/* Ícone do perfil do usuário COM DROPDOWN */}
                    <UserDropdown />
                    {/* Botão Login - Desktop */}
                    {!isAuthenticated ? (
                        <Link to="/login">
                            <button
                                type="button"
                                className="hidden md:flex ml-4 bg-transparent text-blue-600 hover:text-gray-200 px-6 py-1 rounded-lg hover:border-blue-600 hover:bg-blue-600 font-bold transition-colors hover:shadow-lg hover:scale-105 hover:duration-300 hover:ease-in-out"
                            >
                                Criar conta | Login
                            </button>
                        </Link>
                    ) : null}
                </div>                

                {/* Menu Toggle */}
                <button
                    className="md:hidden p-2 rounded-md text-xl text-gray-300 hover:text-blue-600 hover:bg-gray-300 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>

                {/* Links */}
                {/* Menu Mobile Dropdown - Full Screen */}
                {isMenuOpen && (
                    <div className="md:hidden fixed inset-0 z-50 bg-gray-900 flex flex-col">
                        {/* Header do menu mobile */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900 shrink-0">
                            <div className="font-bold text-xl flex items-center">
                                {/* SVG Logo */}
                                <Link to="/" className="flex p-3 items-center max-h-20">
                                    <img 
                                        src={logo} 
                                        alt="Trade2Fly Logo" 
                                        className="h-6 mr-5 w-auto"
                                    />
                                </Link>
                            </div>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-2xl hover:bg-gray-100 rounded-full text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        {/* Conteúdo principal - ESSA é a parte que rola */}
                        <div className="flex-1 overflow-y-auto mt-2">
                            <div className="p-4">
                                {/* Botão Login - no topo como no Vinted */}
                                {!isAuthenticated ? (
                                    <div className="mb-6">
                                        <Link to="/login">
                                            <button 
                                                type="button"
                                                className="w-10/12 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg hover:shadow-lg hover:scale-105 hover:duration-300 hover:ease-in-out"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                Criar conta | Login
                                            </button>
                                        </Link>
                                    </div>
                                ) : null}

                                {/* Botão Vender - estilo Vinted */}
                                <div className="mb-8">
                                    <Link to="/sell">
                                        <button 
                                            className="w-10/12 py-3 bg-gray-800 border border-gray-800 text-gray-300 font-bold rounded-lg hover:bg-blue-600 transition-colors text-lg hover:shadow-lg hover:scale-105 hover:duration-300"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Vender agora
                                        </button>
                                    </Link>
                                </div>

                                {/* Links do menu - estilo Vinted */}
                                <div className="space-y-1">
                                    <Link to="/profile" 
                                        className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg text-gray-300 text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="mr-3 text-xl">👤</span>
                                        Perfil
                                    </Link>
                                    <Link to="/" 
                                        className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg text-gray-300 text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="mr-3 text-xl">📦</span>
                                        Navegar
                                    </Link>
                                    <Link to="/sell" 
                                        className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg text-gray-300 text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="mr-3 text-xl">💰</span>
                                        Vender
                                    </Link>
                                    <Link to="/chat" 
                                        className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg text-gray-300 text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="mr-3 text-xl">📨</span>
                                        Mensagens
                                    </Link>
                                    <Link to="/favoritos" 
                                        className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg text-gray-300 text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="mr-3 text-xl">❤️</span>
                                        Favoritos
                                    </Link>
                                    <Link to="/settings" 
                                        className="flex items-center px-4 py-3 hover:bg-gray-700 rounded-lg text-gray-300 text-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <span className="mr-3 text-xl">⚙️</span>
                                        Configurações
                                    </Link>
                                    
                                </div>
                            </div>
                            
                            {/* O Footer vai aqui DENTRO do container de scroll */}
                            {/* Ele só aparece quando você rola até o final */}
                            <div className="mt-8 border-t border-gray-700">
                                <div className="p-4">
                                    <Footer />
                                </div>
                            </div>
                        </div>
                    </div>
                )}    
            </div>
        </nav>
    );
}