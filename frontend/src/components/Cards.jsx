// src/components/Cards.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProductsList } from '../lib/api.js';
import { useShop } from '../context/useShop.js';

function discountPct(price, originalPrice) {
    if (originalPrice == null || originalPrice <= price) return null;
    return Math.round((1 - price / originalPrice) * 100);
}

function normalizeProduct(raw) {
    const price = Number(raw.price);
    const originalPrice =
        raw.originalPrice != null ? Number(raw.originalPrice) : null;
    return {
        id: raw.id,
        title: raw.title,
        price,
        originalPrice,
        discount: discountPct(price, originalPrice),
        image: raw.imageUrl ?? raw.image ?? '',
        seller: raw.seller ?? '',
        location: raw.location ?? '',
        condition: raw.condition ?? '',
        category: raw.category ?? '',
        isNew: false,
        shipping: 'Grátis',
    };
}

const Cards = () => {
    const { toggleFavorite, addToCart, isFavorite } = useShop();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            setLoadError('');
            try {
                const list = await fetchProductsList();
                if (cancelled) return;
                setProducts(Array.isArray(list) ? list.map(normalizeProduct) : []);
            } catch (e) {
                if (!cancelled) {
                    setLoadError(
                        e instanceof Error ? e.message : 'Não foi possível carregar produtos.',
                    );
                    setProducts([]);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const categories = useMemo(() => {
        const set = new Set(
            products.map((p) => p.category).filter(Boolean),
        );
        return ['Todos', ...Array.from(set).sort()];
    }, [products]);

    const [activeFilter, setActiveFilter] = useState('Todos');

    const filteredProducts = useMemo(() => {
        if (activeFilter === 'Todos') return products;
        return products.filter((p) => p.category === activeFilter);
    }, [products, activeFilter]);

    const formatPrice = (price) => {
        if (price % 1 === 0) {
            return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;
        }
        return `R$ ${price.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-[#d6d3cd] mb-2">
                    Descobre as melhores peças em segunda mão
                </h1>
                <p className="text-[#b1aaa0] mb-8">
                    Catálogo em tempo real • Entrega combinada com o vendedor
                </p>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setActiveFilter(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                activeFilter === category
                                    ? 'bg-blue-600 text-[#e8e6e3] shadow-md'
                                    : 'bg-[#181a1b] text-[#bdb7af] border border-[#736b5e] hover:border-blue-600 hover:text-blue-600'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-6 flex-wrap gap-4">
                    <p className="text-[#bdb7af]">
                        <span className="font-semibold">
                            {filteredProducts.length}
                        </span>{' '}
                        produtos encontrados
                    </p>
                    {loadError ? (
                        <p className="text-sm text-red-400">{loadError}</p>
                    ) : null}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-24">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#736b5e] group cursor-pointer"
                        >
                            <div className="relative overflow-hidden">
                                <Link to={`/products/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </Link>

                                {product.discount != null ? (
                                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        -{product.discount}%
                                    </div>
                                ) : null}

                                <div className="absolute top-3 right-3">
                                    <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                                        {product.condition}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        void toggleFavorite({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            image: product.image,
                                            seller: product.seller,
                                            location: product.location,
                                            condition: product.condition,
                                            category: product.category,
                                        }).catch(() => {});
                                    }}
                                    className={`absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                                        isFavorite(product.id)
                                            ? 'bg-white/90 text-red-500 shadow-lg'
                                            : 'bg-white/80 text-gray-500 hover:bg-white hover:text-red-500'
                                    }`}
                                >
                                    <svg
                                        className={`w-5 h-5 ${isFavorite(product.id) ? 'fill-red-500' : ''}`}
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>

                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none" />
                            </div>

                            <div className="p-4">
                                <div className="mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-bold text-gray-200">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.originalPrice != null ? (
                                            <span className="text-sm text-gray-200 line-through">
                                                {formatPrice(
                                                    product.originalPrice,
                                                )}
                                            </span>
                                        ) : null}
                                    </div>
                                    {product.shipping ? (
                                        <p className="text-sm text-green-600 font-medium mt-1">
                                            {product.shipping === 'Grátis'
                                                ? '🚚 Entrega grátis'
                                                : `Entrega: ${product.shipping}`}
                                        </p>
                                    ) : null}
                                </div>

                                <Link to={`/products/${product.id}`}>
                                    <h3 className="font-medium text-gray-200 mb-2 line-clamp-2 h-12 leading-snug hover:text-blue-400">
                                        {product.title}
                                    </h3>
                                </Link>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                                            <span className="text-blue-600 font-bold text-sm">
                                                {(product.seller || '?')
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-200 truncate">
                                                @{product.seller || 'vendedor'}
                                            </p>
                                            <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                                                <svg
                                                    className="w-3 h-3 shrink-0"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {product.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        void addToCart({
                                            id: product.id,
                                            title: product.title,
                                            price: product.price,
                                            image: product.image,
                                            seller: product.seller,
                                        }).catch(() => {});
                                    }}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="text-center mt-12">
                <Link
                    to="/sell"
                    className="inline-block bg-none text-gray-300 hover:bg-blue-600 hover:text-gray-200 border border-blue-600 font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 hover:shadow-lg hover:scale-105"
                >
                    Vender artigo
                </Link>
            </div>

            <div className="mt-16 rounded-2xl p-8 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4 text-gray-300">
                        Vende o que já não usas!
                    </h2>
                    <p className="text-xl mb-6 opacity-90 text-gray-200">
                        Ganha dinheiro extra e dá uma nova vida às tuas peças
                    </p>
                    <Link to="/sell">
                        <button
                            type="button"
                            className="bg-blue-600 hover:bg-blue-200 text-white hover:text-blue-600 font-bold py-4 px-10 rounded-lg text-lg transition-colors duration-300 shadow-md hover:shadow-lg hover:scale-105"
                        >
                            Começar a vender
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cards;
