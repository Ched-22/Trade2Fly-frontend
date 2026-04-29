import { apiFetch } from './api.js';

const CART_KEY = 'skytrade-cart';
const FAV_KEY = 'skytrade-favorites';

const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

/** After login: push guest cart/favorites (UUID products only) to API, then clear local keys. */
export async function mergeGuestShopToServer() {
    const cart = loadJson(CART_KEY, []);
    const favs = loadJson(FAV_KEY, []);

    try {
        for (const line of cart) {
            if (!line?.id || !UUID_RE.test(String(line.id))) continue;
            const qty = Math.max(1, Number(line.quantity) || 1);
            await apiFetch('/cart/items', {
                method: 'POST',
                json: { productId: String(line.id), quantity: qty },
            });
        }

        for (const item of favs) {
            if (!item?.id || !UUID_RE.test(String(item.id))) continue;
            try {
                await apiFetch(`/favorites/${item.id}`, { method: 'POST' });
            } catch {
                /* duplicate favorite etc. */
            }
        }
    } finally {
        localStorage.removeItem(CART_KEY);
        localStorage.removeItem(FAV_KEY);
    }
}
