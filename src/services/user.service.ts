const API_URL = import.meta.env.VITE_API_URL;

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
}) {
    const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        const msg = body.message ?? body.error;
        const text = Array.isArray(msg) ? msg.join(', ') : msg;
        throw new Error(text ? String(text) : `HTTP ${res.status}`);
    }
    return body;
} 