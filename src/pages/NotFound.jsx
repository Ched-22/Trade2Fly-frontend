import React from "react";

export default function NotFound() {
    
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300">404</h1>
                <p className="text-xl text-gray-400">Página Não Encontrada</p>
                <a href="/" className="mt-4 inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">Voltar para Home</a>
            </div>
        </div>
    );
}