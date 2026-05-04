import React, { useState } from 'react';
import Settings from './Settings';
import { Link } from 'react-router-dom';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('listings'); // 'listings' ou 'reviews'

    // Dados do usuário (simulados)
    const user = {
        username: 'cheede.g',
        name: 'cheede.g',
        location: 'Setúbal, Portugal',
        bio: '',
        avatar: 'https://via.placeholder.com/150/cccccc/969696?text=U', // Placeholder
        followers: 0,
        following: 0,
        isOnline: true,
        lastOnline: 'há 4 minutos',
        verifiedMethods: ['google', 'email'],
        memberSince: 'Membro recente'
    };

    // Produtos simulados (anúncios)
    const userListings = [
        { id: 1, title: 'Artigo Exemplo 1', price: 15.00, image: 'https://via.placeholder.com/300x200/eeeeee/969696?text=Produto+1', condition: 'Bom estado' },
        { id: 2, title: 'Artigo Exemplo 2', price: 25.50, image: 'https://via.placeholder.com/300x200/eeeeee/969696?text=Produto+2', condition: 'Como novo' },
        { id: 3, title: 'Artigo Exemplo 3', price: 8.00, image: 'https://via.placeholder.com/300x200/eeeeee/969696?text=Produto+3', condition: 'Usado' },
        { id: 4, title: 'Artigo Exemplo 4', price: 45.00, image: 'https://via.placeholder.com/300x200/eeeeee/969696?text=Produto+4', condition: 'Excelente' },
    ];

    // Opiniões simuladas (vazias por enquanto)
    const userReviews = [
        { id: 1, rating: 5, comment: 'Ótimo produto!' },
        { id: 2, rating: 4, comment: 'Boa comunicação.' },
        { id: 3, rating: 3, comment: 'Produto conforme descrito.' },
    ];

    return (
        <div className="min-h-screen">
            {/* Cabeçalho com imagem de capa (simulada) */}
            <div className="h-48"></div>

            <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 -mt-20 pb-12">
                {/* Card do Perfil */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-md overflow-hidden px-2">
                    {/* Área da foto e informações principais */}
                    <div className="p-6 md:px-6 md:py-8">
                        <div className="flex md:flex-row items-start md:items-end gap-8">
                            {/* Foto de perfil */}
                            <div className="relative mt-6 md:mt-0">
                                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-800">
                                    <img
                                        src={user.avatar}
                                        alt={user.username}
                                        className="w-full h-full object-cover text-gray-200"
                                    />
                                </div>
                                {user.isOnline && (
                                    <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>

                            {/* Nome e estatísticas */}
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <h1 className="text-start text-2xl md:text-3xl font-bold text-gray-300">
                                            {user.name}
                                        </h1>
                                        <div className="flex items-center gap-1 mt-2 text-gray-300">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="text-sm">{user.location}</span>
                                            <span className="text-sm text-gray-500">•</span>
                                            <span className="text-sm text-green-600 font-medium">
                                                {user.lastOnline}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Botão Editar perfil */}
                                    <Link to="/settings">
                                        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                            Editar Perfil
                                        </button>
                                        </Link>
                                </div>

                                {/* Estatísticas (seguidores/seguindo) */}
                                <div className="flex gap-6 mt-4">
                                    <div>
                                        <span className="font-bold text-gray-300">{user.followers}</span>
                                        <span className="text-gray-500 ml-1 text-sm">seguidores</span>
                                    </div>
                                    <div>
                                        <span className="font-bold text-gray-300">{user.following}</span>
                                        <span className="text-gray-500 ml-1 text-sm">seguindo</span>
                                    </div>
                                </div>

                                {/* Informações verificadas */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {user.verifiedMethods.includes('google') && (
                                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                            </svg>
                                            Google
                                        </span>
                                    )}
                                    {user.verifiedMethods.includes('email') && (
                                        <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                            </svg>
                                            E-mail
                                        </span>
                                    )}
                                </div>

                                {/* Bio (se houver) */}
                                {user.bio && (
                                    <p className="mt-4 text-gray-700 border-t pt-4">{user.bio}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Abas de navegação (Anúncios / Opiniões) */}
                    <div className="border-t border-gray-700">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('listings')}
                                className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                                    activeTab === 'listings'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-300 hover:text-gray-500'
                                }`}
                            >
                                Anúncios ({userListings.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
                                    activeTab === 'reviews'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-300 hover:text-gray-500'
                                }`}
                            >
                                Opiniões ({userReviews.length})
                            </button>
                        </div>
                    </div>

                    {/* Conteúdo da aba ativa */}
                    <div className="p-6">
                        {activeTab === 'listings' && (
                            <div>
                                {userListings.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {userListings.map((item) => (
                                            <div key={item.id} className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="p-3">
                                                    <h3 className="font-medium text-gray-300 truncate">{item.title}</h3>
                                                    <p className="text-sm text-gray-400 mt-1">{item.condition}</p>
                                                    <p className="text-lg font-bold text-blue-600 mt-2">
                                                        €{item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-300 py-8">
                                        Este membro ainda não tem anúncios.
                                    </p>
                                )}
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div>
                                {userReviews.length > 0 ? (
                                    <div className="space-y-4">
                                        {/* Aqui você pode mapear as opiniões quando houver */}
                                        {userReviews.map((review) => (
                                            <div key={review.id} className="bg-gray-700 rounded-lg p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center gap-1 text-yellow-400">
                                                        {Array.from({ length: review.rating }).map((_, i) => (
                                                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-gray-300">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-300 py-8">
                                        Ainda não há opiniões sobre este membro.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}