import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';
import { apiFetch } from '../lib/api.js';

export default function SellPage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [formData, setFormData] = useState({
        photos: [],
        title: '',
        description: '',
        price: '',
        imageUrl:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
        location: '',
        brand: '',
        size: '',
        condition: '',
        category: '',
        color: '',
        material: '',
        isNegotiable: false,
        isShippingAvailable: true
    });
    const [publishError, setPublishError] = useState('');
    const [publishing, setPublishing] = useState(false);

    // Função para simular upload de fotos
    const handlePhotoUpload = (e) => {
        // Aqui você implementará a lógica real de upload
        console.log('Fotos selecionadas:', e.target.files);
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setPublishError('Inicia sessão para publicar um anúncio.');
            return;
        }
        setPublishError('');
        const priceNum = parseFloat(
            String(formData.price).replace(',', '.').trim(),
        );
        if (!formData.title.trim() || Number.isNaN(priceNum) || priceNum < 0) {
            setPublishError('Preenche título e preço válidos.');
            return;
        }
        if (!formData.imageUrl?.trim()) {
            setPublishError('Indica o URL da imagem de capa (obrigatório na API).');
            return;
        }
        setPublishing(true);
        try {
            await apiFetch('/products', {
                method: 'POST',
                json: {
                    title: formData.title.trim(),
                    description: formData.description.trim() || undefined,
                    price: priceNum,
                    originalPrice: undefined,
                    imageUrl: formData.imageUrl.trim(),
                    location: formData.location.trim(),
                    category: formData.category || undefined,
                    condition: formData.condition || undefined,
                },
            });
            navigate('/');
        } catch (err) {
            setPublishError(
                err instanceof Error ? err.message : 'Erro ao publicar.',
            );
        } finally {
            setPublishing(false);
        }
    };

    // Opções para os selects (simuladas)
    const categories = ['Mulher', 'Homem', 'Criança', 'Casa', 'Eletrónica', 'Entretenimento', 'Hobbies', 'Desporto'];
    const conditions = ['Novo com etiqueta', 'Como novo', 'Excelente', 'Bom', 'Satisfatório'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Único'];
    const colors = ['Preto', 'Branco', 'Cinzento', 'Azul', 'Vermelho', 'Verde', 'Amarelo', 'Rosa', 'Roxo'];

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Cabeçalho */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-300">Vender artigo</h1>
                    <p className="text-gray-500 mt-2">Preenche os detalhes do teu anúncio</p>
                    {!isAuthenticated ? (
                        <p className="mt-3 text-sm text-amber-400">
                            Precisas de{' '}
                            <Link to="/login" className="underline hover:text-amber-300">
                                iniciar sessão
                            </Link>{' '}
                            para publicar na API.
                        </p>
                    ) : null}
                    {publishError ? (
                        <p className="mt-3 text-sm text-red-400 border border-red-900/50 rounded-lg px-3 py-2 bg-red-950/30">
                            {publishError}
                        </p>
                    ) : null}
                </div>

                {/* Formulário principal */}
                <form className="space-y-8" onSubmit={handlePublish}>
                    {/* Secção de Fotos - Destaque visual como no Vinted */}
                    <div className="bg-gray-800 rounded-xl shadow-md border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-gray-300 mb-4">Fotos</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                            {/* Botão de adicionar foto */}
                            <label className="aspect-square border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-100 transition-colors">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                />
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span className="text-xs text-gray-500">Adicionar</span>
                            </label>
                            {/* Placeholders para fotos adicionadas (exemplo) */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="aspect-square bg-gray-700 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">Adiciona até 20 fotos. A primeira foto será a capa do anúncio.</p>
                    </div>

                    {/* Secção de Informações Básicas */}
                    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-gray-300 mb-4">Informação básica</h2>

                        {/* Título */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Título <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                placeholder="Ex.: Vestido Zara novo com etiqueta"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                maxLength="100"
                            />
                            <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 caracteres</p>
                        </div>

                        {/* Descrição */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Descrição
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                placeholder="Descreve o artigo, o seu estado, medidas, etc."
                                rows="4"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                maxLength="1000"
                            />
                            <p className="text-xs text-gray-500 mt-1">{formData.description.length}/1000 caracteres</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                URL da imagem de capa <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                value={formData.imageUrl}
                                onChange={(e) =>
                                    setFormData({ ...formData, imageUrl: e.target.value })
                                }
                                placeholder="https://..."
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 text-sm"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                URL público obrigatório até existir upload de ficheiros.
                            </p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Localização
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                placeholder="Ex.: São Paulo, SP"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100"
                            />
                        </div>

                        {/* Preço */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Preço (R$) <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    placeholder="0,00"
                                    className="w-full pl-8 pr-4 py-2 bg-gray-700 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <input
                                    type="checkbox"
                                    id="negotiable"
                                    checked={formData.isNegotiable}
                                    onChange={(e) => setFormData({...formData, isNegotiable: e.target.checked})}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="negotiable" className="ml-2 text-sm text-gray-700">
                                    Aceito propostas (preço negociável)
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Secção de Detalhes */}
                    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-gray-300 mb-4">Detalhes</h2>

                        {/* Categoria */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Categoria <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Seleciona uma categoria</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Marca */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Marca
                                </label>
                                <input
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                    placeholder="Ex.: Zara, Nike, Adidas..."
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Tamanho e Condição */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Tamanho
                                </label>
                                <select
                                    value={formData.size}
                                    onChange={(e) => setFormData({...formData, size: e.target.value})}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Seleciona um tamanho</option>
                                    {sizes.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Condição <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.condition}
                                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Seleciona a condição</option>
                                    {conditions.map(cond => (
                                        <option key={cond} value={cond}>{cond}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Cor e Material */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Cor
                                </label>
                                <select
                                    value={formData.color}
                                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Seleciona uma cor</option>
                                    {colors.map(color => (
                                        <option key={color} value={color}>{color}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Material
                                </label>
                                <input
                                    type="text"
                                    value={formData.material}
                                    onChange={(e) => setFormData({...formData, material: e.target.value})}
                                    placeholder="Ex.: Algodão, Pele, Sintético..."
                                    className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Secção de Envio */}
                    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-gray-300 mb-4">Métodos de envio</h2>
                        
                        <div className="space-y-3">
                            <label className="flex items-center p-3 text-gray-300 border border-gray-700 rounded-lg hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.isShippingAvailable}
                                    onChange={(e) => setFormData({...formData, isShippingAvailable: e.target.checked})}
                                    className="w-4 h-4 text-blue-600 border-gray-700 rounded focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-300">Envio rápido</p>
                                    <p className="text-xs text-gray-500">Em até 5 dias úteis</p>
                                </div>
                            </label>
                            
                            <label className="flex items-center p-3 border border-gray-700 rounded-lg hover:bg-gray-700 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-700 rounded focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-300 hover:bg-gray-700">Envio padrão</p>
                                    <p className="text-xs text-gray-500">Em até 21 dias úteis</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Botões de ação */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={publishing}
                            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors hover:shadow-lg hover:transition-transform hover:scale-105 disabled:opacity-50"
                        >
                            {publishing ? 'A publicar…' : 'Publicar anúncio'}
                        </button>
                        <button
                            type="button"
                            className="px-6 py-3 bg-gray-700 border border-gray-600 text-gray-200 font-medium rounded-lg hover:bg-gray-600 transition-colors hover:scale-105 hover:shadow-lg hover:transition-transform"
                        >
                            Guardar rascunho
                        </button>
                    </div>

                    {/* Nota sobre taxas (igual ao Vinted) */}
                    <div className="text-center text-sm text-gray-600">
                        <p className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Publicar anúncios na Trade2Fly é gratuito. Apenas pagas quando vendes.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}