import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { apiFetch, getStoredToken } from '../lib/api.js';
import { useAuth } from './useAuth.js';
import { ShopContext } from './shop-context.js';

const CART_KEY = 'skytrade-cart';
const FAV_KEY = 'skytrade-favorites';

function loadJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch {
        return fallback;
    }
}

function mapCartFromApi(data) {
    if (!data?.items) return [];
    return data.items.map((row) => ({
        id: row.id,
        title: row.title,
        price: Number(row.price),
        image: row.image ?? '',
        seller: row.seller ?? '',
        quantity: row.quantity,
    }));
}

function mapFavoritesFromApi(arr) {
    if (!Array.isArray(arr)) return [];
    return arr.map((row) => ({
        id: row.id,
        title: row.title,
        price: Number(row.price),
        image: row.image ?? '',
        seller: row.seller ?? '',
        location: row.location ?? '',
        condition: row.condition ?? '',
        category: row.category ?? '',
    }));
}

function initialGuestOrEmpty() {
    try {
        if (localStorage.getItem('skytrade-token')) return [];
        return loadJson(CART_KEY, []);
    } catch {
        return [];
    }
}

function initialFavGuestOrEmpty() {
    try {
        if (localStorage.getItem('skytrade-token')) return [];
        return loadJson(FAV_KEY, []);
    } catch {
        return [];
    }
}

export function ShopProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState(initialGuestOrEmpty);
    const [favorites, setFavorites] = useState(initialFavGuestOrEmpty);

    const refreshCart = useCallback(async () => {
        if (!getStoredToken()) return;
        try {
            const data = await apiFetch('/cart');
            setCartItems(mapCartFromApi(data));
        } catch {
            setCartItems([]);
        }
    }, []);

    const refreshFavorites = useCallback(async () => {
        if (!getStoredToken()) return;
        try {
            const data = await apiFetch('/favorites');
            setFavorites(mapFavoritesFromApi(data));
        } catch {
            setFavorites([]);
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            const id = setTimeout(() => {
                setCartItems(loadJson(CART_KEY, []));
                setFavorites(loadJson(FAV_KEY, []));
            }, 0);
            return () => clearTimeout(id);
        }
        let cancelled = false;
        (async () => {
            await Promise.all([refreshCart(), refreshFavorites()]);
            if (cancelled) return;
        })();
        return () => {
            cancelled = true;
        };
    }, [isAuthenticated, refreshCart, refreshFavorites]);

    useEffect(() => {
        if (isAuthenticated) return;
        try {
            localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        } catch {
            /* ignore */
        }
    }, [cartItems, isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) return;
        try {
            localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
        } catch {
            /* ignore */
        }
    }, [favorites, isAuthenticated]);

    const addToCart = useCallback(
        async (product, quantity = 1) => {
            const qty = Math.max(1, Number(quantity) || 1);
            if (getStoredToken()) {
                await apiFetch('/cart/items', {
                    method: 'POST',
                    json: { productId: String(product.id), quantity: qty },
                });
                await refreshCart();
                return;
            }
            setCartItems((prev) => {
                const id = String(product.id);
                const idx = prev.findIndex((p) => String(p.id) === id);
                if (idx >= 0) {
                    const next = [...prev];
                    next[idx] = {
                        ...next[idx],
                        quantity: next[idx].quantity + qty,
                    };
                    return next;
                }
                return [
                    ...prev,
                    {
                        id: product.id,
                        title: product.title,
                        price: Number(product.price),
                        image: product.image ?? product.imageUrl ?? '',
                        seller: product.seller ?? '',
                        quantity: qty,
                    },
                ];
            });
        },
        [refreshCart],
    );

    const removeFromCart = useCallback(
        async (id) => {
            if (getStoredToken()) {
                await apiFetch(`/cart/items/${id}`, { method: 'DELETE' });
                await refreshCart();
                return;
            }
            setCartItems((prev) =>
                prev.filter((p) => String(p.id) !== String(id)),
            );
        },
        [refreshCart],
    );

    const updateCartQuantity = useCallback(
        async (id, quantity) => {
            const q = Math.max(1, Math.floor(Number(quantity) || 1));
            if (getStoredToken()) {
                await apiFetch(`/cart/items/${id}`, {
                    method: 'PATCH',
                    json: { quantity: q },
                });
                await refreshCart();
                return;
            }
            setCartItems((prev) =>
                prev.map((p) =>
                    String(p.id) === String(id) ? { ...p, quantity: q } : p,
                ),
            );
        },
        [refreshCart],
    );

    const addToFavorites = useCallback(
        async (product) => {
            if (getStoredToken()) {
                await apiFetch(`/favorites/${product.id}`, {
                    method: 'POST',
                });
                await refreshFavorites();
                return;
            }
            setFavorites((prev) => {
                const id = String(product.id);
                if (prev.some((p) => String(p.id) === id)) return prev;
                const {
                    id: pid,
                    title,
                    price,
                    image,
                    imageUrl,
                    seller,
                    location,
                    condition,
                    category,
                } = product;
                return [
                    ...prev,
                    {
                        id: pid,
                        title,
                        price: Number(price),
                        image: image ?? imageUrl ?? '',
                        seller: seller ?? '',
                        location: location ?? '',
                        condition: condition ?? '',
                        category: category ?? '',
                    },
                ];
            });
        },
        [refreshFavorites],
    );

    const removeFromFavorites = useCallback(
        async (id) => {
            if (getStoredToken()) {
                await apiFetch(`/favorites/${id}`, { method: 'DELETE' });
                await refreshFavorites();
                return;
            }
            setFavorites((prev) =>
                prev.filter((p) => String(p.id) !== String(id)),
            );
        },
        [refreshFavorites],
    );

    const isFavorite = useCallback(
        (id) => favorites.some((p) => String(p.id) === String(id)),
        [favorites],
    );

    const toggleFavorite = useCallback(
        async (product) => {
            const id = String(product.id);
            const exists = favorites.some((p) => String(p.id) === id);
            if (getStoredToken()) {
                if (exists) {
                    await apiFetch(`/favorites/${id}`, { method: 'DELETE' });
                } else {
                    await apiFetch(`/favorites/${id}`, { method: 'POST' });
                }
                await refreshFavorites();
                return;
            }
            setFavorites((prev) => {
                const has = prev.some((p) => String(p.id) === id);
                if (has) return prev.filter((p) => String(p.id) !== id);
                return [
                    ...prev,
                    {
                        id: product.id,
                        title: product.title,
                        price: Number(product.price),
                        image: product.image ?? product.imageUrl ?? '',
                        seller: product.seller ?? '',
                        location: product.location ?? '',
                        condition: product.condition ?? '',
                        category: product.category ?? '',
                    },
                ];
            });
        },
        [favorites, refreshFavorites],
    );

    const cartCount = useMemo(
        () => cartItems.reduce((sum, p) => sum + p.quantity, 0),
        [cartItems],
    );

    const cartSubtotal = useMemo(
        () => cartItems.reduce((sum, p) => sum + p.price * p.quantity, 0),
        [cartItems],
    );

    const value = useMemo(
        () => ({
            cartItems,
            favorites,
            cartCount,
            cartSubtotal,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            toggleFavorite,
            refreshCart,
            refreshFavorites,
        }),
        [
            cartItems,
            favorites,
            cartCount,
            cartSubtotal,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            toggleFavorite,
            refreshCart,
            refreshFavorites,
        ],
    );

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
}
