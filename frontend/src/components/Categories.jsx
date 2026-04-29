import React from "react";

export default function Categories() {
    return (
        <div className="container mx-auto border-b border-gray-500">
                        {/* Links - Desktop */}
                        <ul className="hidden md:flex items-center justify-center space-x-8 py-2">
                            <li>
                                <a href="/" className="text-gray-400 hover:text-blue-600 font-medium py-2">
                                    Paraquedas
                                </a>
                            </li>
                            <li>
                                <a href="/sell" className="text-gray-400 hover:text-blue-600 font-medium py-2">
                                    Capacetes
                                </a>
                            </li>
                            <li>
                                <a href="/inbox" className="text-gray-400 hover:text-blue-600 font-medium py-2">
                                    Macacão
                                </a>
                            </li>
                            <li>
                                <a href="/favorites" className="text-gray-400 hover:text-blue-600 font-medium py-2">
                                    Acessórios
                                </a>
                            </li>
                            <li>
                                <a href="/profile" className="text-gray-400 hover:text-blue-600 font-medium py-2">
                                    Câmeras
                                </a>
                            </li>
                        </ul>
        </div>
    );
}