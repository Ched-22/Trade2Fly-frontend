import React from 'react';
import Searchbar from './Searchbar.jsx';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section>
            <div className="container flex items-center justify-center mx-auto px-4 md:hidden">
                <Searchbar  />
            </div>
            
            <div 
                className="w-full py-16 border-b border-gray-500 min-h-[500px] md:min-h-[600px] relative"
                style={{ 
                    backgroundImage: "url('/images/banners/parachutebg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                }}
            >
                {/* Overlay para controlar opacidade */}
                <div className="absolute inset-0 bg-gray-900/70"></div>

                <div className="relative z-10">
                    <div className="container mx-auto px-4 py-10 md:py-16">
                        <div className="max-w-3xl mx-auto text-center">
                            
                            {/* Título */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-300 mb-6 leading-tight">
                                Pronto para ser um <br />
                                <span className="text-[#459ff6]">paraquedista?</span>
                            </h1>
                            
                            {/* Subtítulo */}
                            <p className="text-[#bdb7af] text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                                Milhares de pessoas já estão vendendo seus equipamentos usados. Junte-se à comunidade!
                            </p>
                            
                            {/* Botões */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link to="/sell">
                                    <button className="bg-blue-600 hover:bg-blue-200 text-white hover:text-blue-600 font-bold py-4 px-20 rounded-lg text-lg transition-colors duration-300 shadow-md hover:shadow-lg hover:scale-105">
                                        Vender agora
                                    </button>
                                </Link>
                                <a href="#how-it-works" className="flex items-center justify-center">
                                    <button className="bg-gray-800 text-gray-300 hover:bg-blue-600 hover:text-gray-200 border-blue-600 font-bold py-4 px-10 md:px-10 rounded-lg text-lg transition-colors duration-300 hover:shadow-lg hover:scale-105">
                                        Descubra como funciona
                                    </button>
                                </a>
                            </div>
                            
                            {/* Estatísticas */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-[#459ff6] animate-bounce">+121K</div>
                                        <div className="text-[#bdb7af]">Itens vendidos</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-[#459ff6] animate-bounce">+52K</div>
                                        <div className="text-[#bdb7af]">Vendedores ativos</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl md:text-4xl font-bold text-[#459ff6] animate-bounce">+99,7%</div>
                                        <div className="text-[#bdb7af]">Satisfação</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;