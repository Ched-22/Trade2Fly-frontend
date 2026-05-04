import React from "react";

const Checkout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Checkout</h2>
                <p className="text-gray-600 mb-4">Revise seu pedido antes de finalizar a compra.</p>
                
                {/* Detalhes do pedido */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Detalhes do Pedido</h3>
                    <ul className="space-y-2">
                        <li className="flex justify-between">
                            <span>Produto 1</span>
                            <span>R$ 99,90</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Produto 2</span>
                            <span>R$ 149,90</span>
                        </li>
                        <li className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>R$ 249,80</span>
                        </li>
                    </ul>
                </div>

                {/* Botão de finalizar compra */}
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Finalizar Compra
                </button>
            </div>
        </div>
    );
}

export default Checkout;