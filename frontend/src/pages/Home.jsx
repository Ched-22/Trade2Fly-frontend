import React from "react";
import Hero from "../components/Hero.jsx";
import Cards from "../components/Cards.jsx";

export default function Home() {
    return (
        <div>
            <Hero />
            <Cards />
            
            {/* Imagem de fundo home */}
            {/*<img src={banner} alt="Banner do SkyTrade" className="w-full h-auto" />
            <h1>Bem-vindo ao SkyTrade</h1>
            <p>Seu marketplace de itens usados!</p>*/}

            {/* Outros componentes aqui */}
        </div>
    );
}