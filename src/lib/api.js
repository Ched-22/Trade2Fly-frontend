const TOKEN_KEY = 'skytrade-token';

/** @returns {string | null} */
export function getStoredToken() {
    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch {
        return null;
    }
}

/** @param {string | null} token */
export function setStoredToken(token) {
    try {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        else localStorage.removeItem(TOKEN_KEY);
    } catch {
        /* ignore */
    }
}

function apiBase() {
    const env = import.meta.env.VITE_API_URL;
    if (!env) {
        throw new Error('VITE_API_URL não definido');
    }
    return env.replace(/\/$/, '');
}

/**
 * @param {string} path — e.g. '/products' (leading slash)
 * @param {RequestInit & { json?: unknown }} options
 */
export async function apiFetch(path, options = {}) {
    const { json: jsonBody, ...fetchOptions } = options;
    const base = apiBase();
    const url = `${base}${path.startsWith('/') ? path : `/${path}`}`;
    const headers = {
        Accept: 'application/json',
        ...fetchOptions.headers,
    };

    const token = getStoredToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    let body = fetchOptions.body;
    if (jsonBody !== undefined) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(jsonBody);
    } else if (
        body &&
        typeof body === 'object' &&
        !(body instanceof FormData)
    ) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(body);
    }

    const res = await fetch(url, { ...fetchOptions, headers, body });

    if (res.status === 204) {
        return undefined;
    }

    const ct = res.headers.get('content-type');
    const isJson = ct && ct.includes('application/json');
    const payload = isJson ? await res.json().catch(() => ({})) : null;

    if (!res.ok) {
        let message = `Pedido falhou (${res.status})`;
        if (payload && typeof payload === 'object') {
            const m = payload.message;
            if (Array.isArray(m)) message = m.join(', ');
            else if (typeof m === 'string') message = m;
        }
        throw new Error(message);
    }

    return payload;
}

/** @param {string[]} paths */
export async function fetchProductsList() {
    return apiFetch('/products');
}

/** @param {string} id */
export async function fetchProduct(id) {
    return apiFetch(`/products/${id}`);
}

/**
 * User-facing message when fetch fails (backend down, CORS, offline).
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function describeFetchError(err, fallback = 'Pedido falhou.') {
    const msg = err instanceof Error ? err.message : String(err ?? '');
    const looksNetwork =
        err instanceof TypeError ||
        /network|failed to fetch|load failed|fetch resource/i.test(msg);
    if (looksNetwork) {
        return 'Sem ligação ao servidor. Inicia o backend Nest na porta 3000 (na pasta backend: npm run start:dev).';
    }
    return msg || fallback;
}
