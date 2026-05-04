import React, { useCallback, useMemo, useState } from 'react';
import { apiFetch, setStoredToken } from '../lib/api.js';
import { mergeGuestShopToServer } from '../lib/shopMerge.js';
import { AuthContext } from './auth-context.js';

const USER_KEY = 'skytrade-user';
const TOKEN_KEY = 'skytrade-token';

function loadUser() {
    try {
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function AuthProvider({ children }) {
    const [token, setTokenState] = useState(() => {
        try {
            return localStorage.getItem(TOKEN_KEY);
        } catch {
            return null;
        }
    });
    const [user, setUser] = useState(loadUser);

    const persistUser = useCallback((u) => {
        setUser(u);
        try {
            if (u) localStorage.setItem(USER_KEY, JSON.stringify(u));
            else localStorage.removeItem(USER_KEY);
        } catch {
            /* ignore */
        }
    }, []);

    const setSession = useCallback(
        (accessToken, nextUser) => {
            setStoredToken(accessToken);
            setTokenState(accessToken);
            persistUser(nextUser ?? null);
        },
        [persistUser],
    );

    const logout = useCallback(() => {
        setStoredToken(null);
        setTokenState(null);
        persistUser(null);
    }, [persistUser]);

    const login = useCallback(
        async (email, password) => {
            const data = await apiFetch('/auth/login', {
                method: 'POST',
                json: { email, password },
            });
            setStoredToken(data.access_token);
            setTokenState(data.access_token);
            persistUser(data.user);
            await mergeGuestShopToServer();
            return data;
        },
        [persistUser],
    );

    const register = useCallback(
        async ({ email, password, displayName }) => {
            const data = await apiFetch('/auth/register', {
                method: 'POST',
                json: { email, password, displayName },
            });
            setStoredToken(data.access_token);
            setTokenState(data.access_token);
            persistUser(data.user);
            await mergeGuestShopToServer();
            return data;
        },
        [persistUser],
    );

    const value = useMemo(
        () => ({
            token,
            user,
            isAuthenticated: Boolean(token),
            login,
            register,
            logout,
            setSession,
        }),
        [token, user, login, register, logout, setSession],
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
