import React, { useState } from 'react';

export default function Settings() {
    const [profileData, setProfileData] = useState({
        username: 'cheede.g',
        email: 'utilizador@email.com',
        firstName: 'Pedro',
        lastName: 'Garcia',
        bio: 'Atleta, 6 anos de saltos, sempre melhorando meu setup e buscando as melhores ofertas! 🛩️✨',
        location: 'Santo André, São Paulo',
        phone: '+351 912 345 678',
        avatar: 'https://via.placeholder.com/150/cccccc/969696?text=U',
        isPrivate: false,
        receiveNewsletter: true,
        showOnlineStatus: true
    });

    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'account', 'notifications', 'privacy'

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfileData({
            ...profileData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleAvatarChange = (e) => {
        // Lógica para upload de nova foto
        console.log('Nova foto selecionada:', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSaving(true);
        // Simular envio para API
        setTimeout(() => {
            setIsSaving(false);
            alert('Perfil atualizado com sucesso!');
        }, 1500);
    };

    const tabs = [
        { id: 'profile', name: 'Perfil', icon: '👤' },
        { id: 'account', name: 'Conta', icon: '🔒' },
        { id: 'notifications', name: 'Notificações', icon: '🔔' },
        { id: 'privacy', name: 'Privacidade', icon: '🛡️' }
    ];

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Cabeçalho */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-300">Configurações</h1>
                    <p className="text-gray-400 mt-2">Gere as tuas informações pessoais e preferências</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Menu lateral de abas - estilo Vinted */}
                    <div className="md:w-64 shrink-0">
                        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-gray-800 text-gray-300 border-l-4 border-gray-300'
                                            : 'hover:bg-gray-800 text-gray-400'
                                    }`}
                                >
                                    <span className="text-xl">{tab.icon}</span>
                                    <span className="font-medium">{tab.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Conteúdo principal */}
                    <div className="flex-1">
                        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
                            {/* Aba de Perfil */}
                            {activeTab === 'profile' && (
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-xl font-semibold text-gray-300 mb-6">Informações do Perfil</h2>
                                    
                                    {/* Foto de perfil */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-300 mb-3">
                                            Foto de perfil
                                        </label>
                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 border-4 border-gray-800 shadow-lg">
                                                    <img
                                                        src={profileData.avatar}
                                                        alt="Avatar"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                {profileData.showOnlineStatus && (
                                                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></span>
                                                )}
                                            </div>
                                            <div>
                                                <label className="cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleAvatarChange}
                                                        className="hidden"
                                                    />
                                                    <span className="px-4 py-2 bg-gray-700 border border-gray-800 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                                                        Escolher foto
                                                    </span>
                                                </label>
                                                <p className="text-xs text-gray-400 mt-2">
                                                    PNG ou JPG. Máx 10MB.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Grid de campos */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Username */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Username <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                value={profileData.username}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                            <p className="text-xs text-gray-400 mt-1">
                                                Mín. 3 caracteres. Apenas letras, números e underscores.
                                            </p>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={profileData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        {/* Nome */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={profileData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Sobrenome */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Sobrenome
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={profileData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Localização */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Localização
                                            </label>
                                            <input
                                                type="text"
                                                name="location"
                                                value={profileData.location}
                                                onChange={handleInputChange}
                                                placeholder="Cidade, País"
                                                    className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        {/* Celular */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Celular
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={profileData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+55 11 91234-5678"
                                                className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    {/* Biografia */}
                                    <div className="mt-6">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Biografia
                                        </label>
                                        <textarea
                                            name="bio"
                                            rows="4"
                                            value={profileData.bio}
                                            onChange={handleInputChange}
                                            placeholder="Fala um pouco sobre ti..."
                                            className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            maxLength="500"
                                        />
                                        <p className="text-xs text-gray-400 mt-1">
                                            {profileData.bio.length}/500 caracteres
                                        </p>
                                    </div>

                                    {/* Botões */}
                                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-700">
                                        <button
                                            type="submit"
                                            disabled={isSaving}
                                            className={`px-6 py-2 bg-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors ${
                                                isSaving ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        >
                                            {isSaving ? 'A guardar...' : 'Guardar alterações'}
                                        </button>
                                        <button
                                            type="button"
                                            className="px-6 py-2 bg-gray-700 border border-gray-800 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Aba de Conta */}
                            {activeTab === 'account' && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-300 mb-6">Configurações da Conta</h2>
                                    <div className="space-y-6">
                                        <div className="p-4 bg-gray-800 rounded-lg">
                                            <h3 className="font-medium text-gray-300 mb-2">Alterar senha</h3>
                                            <div className="space-y-3">
                                                <input
                                                    type="password"
                                                    placeholder="Palavra-passe atual"
                                                    className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Nova palavra-passe"
                                                    className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Confirmar nova palavra-passe"
                                                    className="w-full bg-gray-700 text-gray-300 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                                                />
                                                <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-800">
                                                    Atualizar senha
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="p-4 bg-gray-800 rounded-lg">
                                            <button className="px-4 py-2 bg-gray-700 text-gray-300 text-xs rounded-lg hover:bg-gray-800">
                                                Excluir minha conta
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Aba de Notificações */}
                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-300 mb-6">Preferências de Notificações</h2>
                                    <div className="space-y-4">
                                        <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-300">Mensagens</p>
                                                <p className="text-sm text-gray-500">Receber notificações de novas mensagens</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="w-5 h-5 text-gray-300 rounded focus:ring-gray-300"
                                            />
                                        </label>
                                        
                                        <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-300">Vendas</p>
                                                <p className="text-sm text-gray-500">Quando alguém comprar os teus artigos</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                defaultChecked
                                                className="w-5 h-5 text-gray-300 rounded focus:ring-gray-300"
                                            />
                                        </label>
                                        
                                        <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-300">Promoções</p>
                                                <p className="text-sm text-gray-500">Ofertas e novidades da Trade2Fly</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 text-gray-300 rounded focus:ring-gray-300"
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Aba de Privacidade */}
                            {activeTab === 'privacy' && (
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-300 mb-6">Privacidade</h2>
                                    <div className="space-y-4">
                                        <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-300">Perfil privado</p>
                                                <p className="text-sm text-gray-500">Apenas seguidores podem ver os teus artigos</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="isPrivate"
                                                checked={profileData.isPrivate}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-gray-300 rounded focus:ring-gray-300"
                                            />
                                        </label>
                                        
                                        <label className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-300">Mostrar status online</p>
                                                <p className="text-sm text-gray-500">Deixar outros verem quando está online</p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                name="showOnlineStatus"
                                                checked={profileData.showOnlineStatus}
                                                onChange={handleInputChange}
                                                className="w-5 h-5 text-gray-300 rounded focus:ring-gray-300"
                                            />
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}