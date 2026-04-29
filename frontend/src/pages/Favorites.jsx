import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/useShop.js';

function formatBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export default function Favorites() {
    const { favorites, removeFromFavorites, addToCart } = useShop();

    if (favorites.length === 0) {
        return (
            <div className="min-h-[calc(100vh-12rem)] bg-gray-900 py-12 px-4">
                <div className="max-w-lg mx-auto text-center">
                    <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-10">
                        <p className="text-5xl mb-4" aria-hidden>
                            ❤️
                        </p>
                        <h1 className="text-2xl font-bold text-gray-100 mb-2">
                            Ainda não tens favoritos
                        </h1>
                        <p className="text-gray-400 mb-8">
                            Guarda artigos que gostes clicando no coração nas páginas de produto.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Descobrir artigos
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-12rem)] bg-gray-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100 text-left mb-2">
                    Favoritos
                </h1>
                <p className="text-gray-400 text-left mb-8">
                    {favorites.length}{' '}
                    {favorites.length === 1 ? 'artigo guardado' : 'artigos guardados'}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                        <li
                            key={item.id}
                            className="rounded-xl border border-gray-700 bg-gray-800/40 overflow-hidden text-left flex flex-col"
                        >
                            <Link
                                to={`/products/${item.id}`}
                                className="aspect-square bg-gray-700 block overflow-hidden"
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        Sem imagem
                                    </div>
                                )}
                            </Link>
                            <div className="p-4 flex flex-col flex-1">
                                <Link
                                    to={`/products/${item.id}`}
                                    className="font-semibold text-gray-100 hover:text-blue-400 line-clamp-2"
                                >
                                    {item.title}
                                </Link>
                                <span className="text-lg font-bold text-gray-100 mt-2">
                                    {formatBRL(item.price)}
                                </span>
                                {item.seller ? (
                                    <span className="text-sm text-gray-500 mt-1">
                                        {item.seller}
                                        {item.location ? ` · ${item.location}` : ''}
                                    </span>
                                ) : null}
                                <div className="mt-auto pt-4 flex gap-2">
                                    <button
                                        type="button"
                                        className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors"
                                        onClick={() =>
                                            void addToCart(item, 1).catch(
                                                () => {}
                                            )
                                        }
                                    >
                                        Adicionar ao carrinho
                                    </button>
                                    <button
                                        type="button"
                                        className="px-3 rounded-lg border border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-500/50"
                                        onClick={() =>
                                            void removeFromFavorites(
                                                item.id
                                            ).catch(() => {})
                                        }
                                        aria-label="Remover dos favoritos"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
