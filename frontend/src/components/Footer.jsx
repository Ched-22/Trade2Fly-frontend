import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-4 shadow-inner">
            <div className="flex mx-auto text-center justify-evenly md:flex-row flex-col mb-4">
                <div className="mb-2 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">SkyTrade</h2>
                    <a href="/about" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Sobre Nós</a>
                    <a href="/contact" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Contato</a>
                    <a href="/terms" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Termos de Serviço</a>
                    <a href="/privacy" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Política de Privacidade</a>
                </div>
                <div className="mb-2 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Ajuda</h2>
                    <a href="/client" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Apoio ao Cliente</a>
                    <a href="/safety" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Confiança e Segurança</a>
                    <a href="/buy" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Comprar</a>
                    <a href="/sell" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Vender</a>
                    <a href="/contact" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Contato</a>
                </div>
                <div className="mb-2 flex flex-col">
                    <h2 className="text-2xl font-bold mb-4">Descobrir</h2>
                    <a href="/about" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Como funciona</a>
                    <a href="/contact" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Verificação de Artigos</a>
                    <a href="/terms" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">Aplicações Móveis</a>
                    <a href="/privacy" className="mx-2 mb-2 hover:text-blue-600 hover:transition-transform hover:scale-105">informações</a>
                </div>
                
            </div>
            <p>&copy; {new Date().getFullYear()} SkyTrade. Todos os direitos reservados.</p>
        </footer>
    );
}