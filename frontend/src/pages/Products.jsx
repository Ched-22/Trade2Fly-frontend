import React, {useState} from "react";

export default function Products() {
    const [products, setProducts] = useState([
        { id: 1, name: "Produto 1", price: 100 },
        { id: 2, name: "Produto 2", price: 200 },
        { id: 3, name: "Produto 3", price: 300 },
    ]);
    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800">Página de Produtos</h1>
                <div className="mt-6 w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
                    <ul className="space-y-4">
                        {products.map(product => (
                            <li key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                                    <p className="text-gray-600">Preço: R${product.price}</p>
                                </div>
                                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Comprar</button>
                            </li>
                        ))}
                    </ul>
                </div>
        </div>
    );
}