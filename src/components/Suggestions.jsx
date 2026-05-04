// src/components/Suggestions.jsx
import React, { useState, useEffect } from 'react';

const Suggestions = ({ 
    searchQuery, 
    onSuggestionClick,
    isVisible 
}) => {
    const [suggestions, setSuggestions] = useState([]);

    // Dados de exemplo para sugestões (pode vir de uma API depois)
    const sampleSuggestions = [
        "iPhone 15",
        "MacBook Pro",
        "Air Jordan",
        "Nike Air Max",
        "PlayStation 5",
        "Xbox Series X",
        "Câmera Canon",
        "Fones de ouvido Sony",
        "Smart TV Samsung",
        "Notebook Dell",
        "Tênis Adidas",
        "Relógio Smartwatch"
    ];

    // Filtrar sugestões baseadas na query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSuggestions([]);
            return;
        }

        const filtered = sampleSuggestions.filter(item =>
            item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered);
    }, [searchQuery]);

    // Se não estiver visível ou não houver query, não renderiza nada
    if (!isVisible || searchQuery.trim() === '') {
        return null;
    }

    return (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-b-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
            {suggestions.length > 0 ? (
                <ul className="m-0 p-0 list-none">
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <button
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-blue-700 cursor-pointer text-sm/8 flex items-center gap-2 transition-colors duration-200"
                                onClick={() => onSuggestionClick(suggestion)}
                            >
                                <svg className="w-4 h-4 text-gray-500 hover:text-blue-700 transition-colors duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {suggestion}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-4 text-sm text-gray-500 text-center">
                    <p>
                        Nenhum resultado encontrado para "<span className="font-semibold text-gray-800">{searchQuery}</span>"
                    </p>
                </div>
            )}
        </div>
    );
};

export default Suggestions;