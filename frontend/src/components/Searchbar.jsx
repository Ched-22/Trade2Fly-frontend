import React from "react";
import { useState, useEffect, useRef } from "react";
import Suggestions from "./Suggestions.jsx";

export default function Searchbar() {
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
        <div className=" md:hidden h-12 flex relative items-center" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Buscar itens..."
                    className="w-full px-4 py-2 pl-10 pr-10 rounded-lg bg-gray-800 border border-gray-700 
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
    );
}