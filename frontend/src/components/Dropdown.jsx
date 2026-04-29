import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

// Componente do Dropdown do Perfil
const UserDropdown = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Fechar dropdown ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const menuItems = [
        { icon: '👤', label: 'Perfil', to: '/profile' },
        { icon: '⚙️', label: 'Configurações', to: '/settings' },
        { icon: '💰', label: 'Saldo', value: 'R$ 0,00', to: '/saldo' },
        { icon: '📦', label: 'Os meus pedidos', to: '/pedidos' },
        { icon: '❤️', label: 'Favoritos', to: '/favoritos' },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botão do usuário */}
            <button
                className="p-2 rounded-md text-xl text-gray-300 hover:text-blue-600 hover:bg-gray-700 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <img src="/images/icons/user.svg" alt="Ícone perfil" className="h-6 w-6" />
            </button>

            {/* Dropdown */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-2 z-50">
                    
                    {/* Header do dropdown */}
                    <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {(user?.email || user?.displayName || '?')
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-gray-300 text-lg truncate">
                                    {user?.displayName || 'Conta'}
                                </p>
                                <p className="text-sm text-gray-400 truncate">
                                    {user?.email ||
                                        'Inicia sessão para sincronizar carrinho e favoritos'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Itens do menu */}
                    <div className="pt-2 text-sm">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.to}
                                className="flex items-center justify-between px-4 py-3 hover:bg-gray-700"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-medium text-gray-300">
                                        {item.label}
                                    </span>
                                </div>
                                {item.value && (
                                    <span className="font-bold text-green-600">{item.value}</span>
                                )}
                            </Link>
                        ))}
                        {user ? (
                            <button
                                type="button"
                                className="flex w-full items-center px-4 py-3 hover:bg-gray-700 border-t border-gray-700 mt-2 text-left"
                                onClick={() => {
                                    logout();
                                    setIsDropdownOpen(false);
                                    navigate('/');
                                }}
                            >
                                <span className="text-xl mr-3">🚪</span>
                                <span className="font-medium text-red-500">
                                    Sair
                                </span>
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="flex w-full items-center px-4 py-3 hover:bg-gray-700 border-t border-gray-700 mt-2 text-blue-400"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <span className="text-xl mr-3">🔑</span>
                                <span className="font-medium">Entrar</span>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;