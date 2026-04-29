import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { describeFetchError } from '../lib/api.js';
import { createUser } from '../services/user.service';

export default function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [pending, setPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPending(true);
        try {
            await createUser({
                name: name.trim(),
                email: email.trim(),
                password,
            });
            alert('Usuário criado!');
            navigate('/login', { replace: true });
        } catch (err) {
            setError(describeFetchError(err, 'Erro ao registar'));
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md border border-gray-700">
                <h2 className="text-2xl font-bold text-center text-gray-300">
                    Registrar-se
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {error ? (
                        <p className="text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-md px-3 py-2">
                            {error}
                        </p>
                    ) : null}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Nome
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nome"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-100"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Digite seu email..."
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-700 px-3 py-2 mt-1 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-100"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-300"
                        >
                            Senha (mín. 6 caracteres)
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            placeholder="Digite sua senha..."
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-700 px-3 py-2 mt-1 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500 text-gray-100"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={pending}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500 disabled:opacity-60"
                    >
                        {pending ? 'A criar conta…' : 'Registrar-se'}
                    </button>
                </form>
                <p className="text-sm text-center text-gray-400">
                    Já tem uma conta?{' '}
                    <Link to="/login" className="text-blue-400 hover:underline">
                        Entrar
                    </Link>
                </p>
            </div>
        </div>
    );
}
