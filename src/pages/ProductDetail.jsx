import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct } from '../lib/api.js';
import { useShop } from '../context/useShop.js';

function discountPct(price, originalPrice) {
    if (originalPrice == null || originalPrice <= price) return null;
    return Math.round((1 - price / originalPrice) * 100);
}

export default function ProductDetail() {
    const { id } = useParams();
    const { toggleFavorite, addToCart, isFavorite } = useShop();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        setIsLoading(true);
        setError('');
        setProduct(null);
        setSelectedImage(0);
        (async () => {
            try {
                const raw = await fetchProduct(id);
                if (cancelled) return;
                const price = Number(raw.price);
                const originalPrice =
                    raw.originalPrice != null
                        ? Number(raw.originalPrice)
                        : null;
                setProduct({
                    id: raw.id,
                    title: raw.title,
                    description: raw.description ?? '',
                    price,
                    originalPrice,
                    discount: discountPct(price, originalPrice),
                    imageUrl: raw.imageUrl ?? '',
                    seller: typeof raw.seller === 'string' ? raw.seller : '',
                    location: raw.location ?? '',
                    category: raw.category ?? '',
                    condition: raw.condition ?? '',
                });
            } catch (e) {
                if (!cancelled) {
                    setError(
                        e instanceof Error
                            ? e.message
                            : 'Erro ao carregar o produto.',
                    );
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [id]);

    const images = useMemo(() => {
        if (!product?.imageUrl) return [];
        return [product.imageUrl];
    }, [product]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const liked = product ? isFavorite(product.id) : false;

    const handleLike = () => {
        if (!product) return;
        void toggleFavorite({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.imageUrl,
            seller: product.seller,
            location: product.location,
            condition: product.condition,
            category: product.category,
        }).catch(() => {});
    };

    const handleBuy = () => {
        if (!product) return;
        void addToCart({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.imageUrl,
            seller: product.seller,
        }).catch(() => {});
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="mt-4 text-gray-400">A carregar artigo...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-100">
                        Artigo não encontrado
                    </h2>
                    <p className="text-gray-400 mt-2">{error}</p>
                    <Link
                        to="/"
                        className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Voltar ao catálogo
                    </Link>
                </div>
            </div>
        );
    }

    const mainSrc = images[selectedImage] ?? product.imageUrl;

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="mb-6 text-sm">
                    <ol className="flex items-center flex-wrap gap-2 text-gray-500">
                        <li>
                            <Link to="/" className="hover:text-blue-400">
                                Catálogo
                            </Link>
                        </li>
                        <li aria-hidden="true">›</li>
                        <li>
                            <span className="text-gray-400">
                                {product.category || 'Produto'}
                            </span>
                        </li>
                        <li aria-hidden="true">›</li>
                        <li className="text-gray-200 font-medium truncate max-w-[min(280px,50vw)]">
                            {product.title}
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
                            <div className="aspect-square bg-gray-950">
                                <img
                                    src={mainSrc}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {images.length > 1 ? (
                                <div className="p-4 border-t border-gray-700">
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {images.map((src, index) => (
                                            <button
                                                key={`${src}-${index}`}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedImage(index)
                                                }
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                    selectedImage === index
                                                        ? 'border-blue-600 shadow-md'
                                                        : 'border-transparent hover:border-gray-600'
                                                }`}
                                            >
                                                <img
                                                    src={src}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-24 text-left">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-3xl font-bold text-gray-100">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.originalPrice != null ? (
                                            <>
                                                <span className="text-lg text-gray-500 line-through">
                                                    {formatPrice(
                                                        product.originalPrice,
                                                    )}
                                                </span>
                                                {product.discount != null ? (
                                                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                                                        -{product.discount}%
                                                    </span>
                                                ) : null}
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleLike}
                                    className={`p-3 rounded-full transition-colors ${
                                        liked
                                            ? 'bg-red-950 text-red-400'
                                            : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                    }`}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill={
                                            liked ? 'currentColor' : 'none'
                                        }
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <h1 className="text-xl font-semibold text-gray-100 mb-6">
                                {product.title}
                            </h1>

                            <div className="space-y-3 mb-6">
                                <button
                                    type="button"
                                    onClick={handleBuy}
                                    className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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
                                <Link
                                    to="/chat"
                                    className="block w-full py-3 bg-gray-900 border-2 border-blue-600 text-blue-400 font-medium rounded-lg hover:bg-gray-950 text-center"
                                >
                                    Enviar mensagem
                                </Link>
                            </div>

                            <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-950 rounded-full flex items-center justify-center shrink-0">
                                        <span className="text-blue-400 font-bold text-lg">
                                            {(product.seller || '?')
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-100">
                                            {product.seller || 'Vendedor'}
                                        </span>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {product.location}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-100 mb-3">
                                    Detalhes
                                </h3>
                                <dl className="grid grid-cols-2 gap-3 text-sm">
                                    <div>
                                        <dt className="text-gray-500">
                                            Condição
                                        </dt>
                                        <dd className="text-gray-100 font-medium">
                                            {product.condition || '—'}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-500">
                                            Categoria
                                        </dt>
                                        <dd className="text-gray-100 font-medium">
                                            {product.category || '—'}
                                        </dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-gray-500">
                                            Localização
                                        </dt>
                                        <dd className="text-gray-100 font-medium">
                                            {product.location || '—'}
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="mb-2">
                                <h3 className="font-semibold text-gray-100 mb-3">
                                    Descrição
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
                                    {product.description ||
                                        'Sem descrição adicional.'}
                                </p>
                            </div>

                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 mt-4"
                            >
                                ← Voltar ao catálogo
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
