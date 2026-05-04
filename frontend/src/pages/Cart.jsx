import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/useShop.js';

function formatBRL(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export default function Cart() {
    const {
        cartItems,
        cartSubtotal,
        removeFromCart,
        updateCartQuantity,
    } = useShop();

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[calc(100vh-12rem)] bg-gray-900 py-12 px-4">
                <div className="max-w-lg mx-auto text-center">
                    <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-10">
                        <p className="text-5xl mb-4" aria-hidden>
                            🛒
                        </p>
                        <h1 className="text-2xl font-bold text-gray-100 mb-2">
                            O seu carrinho está vazio
                        </h1>
                        <p className="text-gray-400 mb-8">
                            Quando encontrar algo que goste, adicione ao carrinho por aqui.
                        </p>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Explorar catálogo
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-12rem)] bg-gray-900 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-100 text-left mb-2">
                    Carrinho
                </h1>
                <p className="text-gray-400 text-left mb-8">
                    {cartItems.length}{' '}
                    {cartItems.length === 1 ? 'artigo' : 'artigos'}
                </p>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    <ul className="flex-1 space-y-4">
                        {cartItems.map((item) => (
                            <li
                                key={item.id}
                                className="flex gap-4 rounded-xl border border-gray-700 bg-gray-800/40 p-4 text-left"
                            >
                                <Link
                                    to={`/products/${item.id}`}
                                    className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-700"
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                                            Sem imagem
                                        </div>
                                    )}
                                </Link>
                                <div className="flex-1 min-w-0 flex flex-col">
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="font-semibold text-gray-100 hover:text-blue-400 line-clamp-2"
                                    >
                                        {item.title}
                                    </Link>
                                    {item.seller ? (
                                        <span className="text-sm text-gray-500 mt-1">
                                            {item.seller}
                                        </span>
                                    ) : null}
                                    <div className="mt-auto pt-3 flex flex-wrap items-end justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <label htmlFor={`qty-${item.id}`} className="sr-only">
                                                Quantidade
                                            </label>
                                            <button
                                                type="button"
                                                className="w-9 h-9 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                                                onClick={() =>
                                                    void updateCartQuantity(
                                                        item.id,
                                                        item.quantity - 1 < 1
                                                            ? 1
                                                            : item.quantity - 1
                                                    ).catch(() => {})
                                                }
                                                aria-label="Diminuir quantidade"
                                            >
                                                −
                                            </button>
                                            <input
                                                id={`qty-${item.id}`}
                                                type="number"
                                                min={1}
                                                value={item.quantity}
                                                onChange={(e) =>
                                                    void updateCartQuantity(
                                                        item.id,
                                                        e.target.value
                                                    ).catch(() => {})
                                                }
                                                className="w-14 text-center rounded-lg border border-gray-600 bg-gray-800 text-gray-100 py-1"
                                            />
                                            <button
                                                type="button"
                                                className="w-9 h-9 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                                                onClick={() =>
                                                    void updateCartQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    ).catch(() => {})
                                                }
                                                aria-label="Aumentar quantidade"
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className="font-bold text-gray-100">
                                                {formatBRL(item.price * item.quantity)}
                                            </span>
                                            <button
                                                type="button"
                                                className="text-sm text-red-400 hover:text-red-300"
                                                onClick={() =>
                                                    void removeFromCart(
                                                        item.id
                                                    ).catch(() => {})
                                                }
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <aside className="lg:w-80 shrink-0">
                        <div className="sticky top-24 rounded-xl border border-gray-700 bg-gray-800/50 p-6 text-left">
                            <h2 className="text-lg font-semibold text-gray-100 mb-4">
                                Resumo
                            </h2>
                            <div className="flex justify-between text-gray-400 mb-2">
                                <span>Subtotal</span>
                                <span className="text-gray-100 font-medium">
                                    {formatBRL(cartSubtotal)}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mb-6">
                                Envio calculado no checkout.
                            </p>
                            <Link
                                to="/checkout"
                                className="block w-full text-center py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                            >
                                Finalizar compra
                            </Link>
                            <Link
                                to="/"
                                className="block w-full text-center mt-3 py-2 text-sm text-blue-400 hover:text-blue-300"
                            >
                                Continuar a comprar
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
