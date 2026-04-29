import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: 1, sender: "João Silva", content: "Olá, o produto ainda está disponível?", time: "10:30", isOwn: false, isRead: true },
        { id: 2, sender: "Você", content: "Sim, ainda está disponível! Interessado?", time: "10:32", isOwn: true, isRead: true },
        { id: 3, sender: "João Silva", content: "Qual o estado do produto? Tem mais fotos?", time: "10:35", isOwn: false, isRead: true },
        { id: 4, sender: "Você", content: "Está em excelente estado, quase novo. Posso te enviar mais fotos sim!", time: "10:37", isOwn: true, isRead: true },
        { id: 5, sender: "João Silva", content: "Perfeito! Podemos combinar para amanhã?", time: "10:40", isOwn: false, isRead: false },
    ]);

    const [newMessage, setNewMessage] = useState("");
    const [activeChat, setActiveChat] = useState("joao_silva");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Conversas disponíveis
    const conversations = [
        {
            id: "joao_silva",
            name: "João Silva",
            avatar: "JS",
            lastMessage: "Podemos combinar para amanhã?",
            time: "10:40",
            unread: 1,
            product: "Tênis Nike Air Force 1",
            productPrice: "R$ 399,90",
            productImage: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop"
        },
        {
            id: "maria_santos",
            name: "Maria Santos",
            avatar: "MS",
            lastMessage: "Aceita R$ 350,00?",
            time: "Ontem",
            unread: 0,
            product: "Jaqueta de Couro Legítima",
            productPrice: "R$ 749,50",
            productImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop"
        },
        {
            id: "carlos_lima",
            name: "Carlos Lima",
            avatar: "CL",
            lastMessage: "Produto ainda disponível?",
            time: "2 dias",
            unread: 0,
            product: "iPhone 13 Pro 256GB",
            productPrice: "R$ 3.999,00",
            productImage: "https://images.unsplash.com/photo-1632661674596-df8be070a6c5?w=100&h=100&fit=crop"
        },
        {
            id: "ana_oliveira",
            name: "Ana Oliveira",
            avatar: "AO",
            lastMessage: "Obrigada pela venda!",
            time: "1 semana",
            unread: 0,
            product: "Mochila North Face",
            productPrice: "R$ 325,00",
            productImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop"
        }
    ];

    // Simular digitação do outro usuário
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTyping(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        const newMsg = {
            id: messages.length + 1,
            sender: "Você",
            content: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
            isRead: true
        };

        setMessages([...messages, newMsg]);
        setNewMessage("");
        
        // Simular resposta automática após 2 segundos
        setTimeout(() => {
            const autoReply = {
                id: messages.length + 2,
                sender: conversations.find(c => c.id === activeChat)?.name || "Usuário",
                content: "Entendi! Vou pensar na sua proposta.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: false,
                isRead: false
            };
            setMessages(prev => [...prev, autoReply]);
            setIsTyping(true);
        }, 2000);

        // Focar no input novamente
        inputRef.current?.focus();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(e);
        }
    };

    const activeConversation = conversations.find(c => c.id === activeChat);

    return (
        <div className="min-h-screen">
            <div className="mx-auto md:mx-56 px-4 py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-300">Mensagens</h1>
                    <p className="text-gray-400 mt-1">Gerencie suas conversas e negociações</p>
                </div>

                <div className="flex bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
                    {/* Lista de conversas - lado esquerdo */}
                    <div className="hidden md:block w-auto border-r border-gray-700">
                        <div className="p-4 border border-gray-700">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar conversas..."
                                    className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1">
                            {conversations.map((conversation) => (
                                <div
                                    key={conversation.id}
                                    onClick={() => setActiveChat(conversation.id)}
                                    className={`p-4 border-b border-gray-700 cursor-pointer transition-colors hover:bg-gray-700 ${
                                        activeChat === conversation.id ? "bg-gray-700 border-l-4 border-l-blue-500" : ""
                                    }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                                <span className="text-blue-600 font-bold text-lg">
                                                    {conversation.avatar}
                                                </span>
                                            </div>
                                            {conversation.unread > 0 && (
                                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">{conversation.unread}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex-1 ">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-semibold text-gray-300 truncate">
                                                    {conversation.name}
                                                </h3>
                                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                                    {conversation.time}
                                                </span>
                                            </div>
                                            
                                            <p className="text-sm text-gray-400 truncate mt-1">
                                                {conversation.lastMessage}
                                            </p>
                                            
                                            <div className="flex items-center mt-2">
                                                <img 
                                                    src={conversation.productImage} 
                                                    alt={conversation.product}
                                                    className="w-8 h-8 rounded object-cover mr-2"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-400 truncate">
                                                        {conversation.product}
                                                    </p>
                                                    <p className="text-xs font-semibold text-blue-600">
                                                        {conversation.productPrice}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Área do chat - lado direito */}
                    <div className="flex flex-col flex-1">
                        {/* Cabeçalho do chat */}
                        <div className="p-4 border-b border-gray-700 flex items-center justify-between bg-gray-800">
                            <div className="flex items-center space-x-3">
                                <div className="md:hidden">
                                    <Link to="/conversations">
                                        <button className="p-2 hover:bg-gray-600 rounded-full">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span className="text-blue-600 font-bold">
                                        {activeConversation?.avatar}
                                    </span>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-300">
                                        {activeConversation?.name}
                                    </h3>
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                        <p className="text-xs text-gray-400">Online agora</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                <button className="p-2 hover:bg-gray-600 rounded-full">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-600 rounded-full">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Informações do produto */}
                        <div className="p-4 border-b border-gray-700 bg-gray-800">
                            <div className="flex items-center space-x-3">
                                <img 
                                    src={activeConversation?.productImage} 
                                    alt={activeConversation?.product}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-300">
                                        {activeConversation?.product}
                                    </h4>
                                    <p className="text-lg font-bold text-blue-600">
                                        {activeConversation?.productPrice}
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                                    Ver anúncio
                                </button>
                            </div>
                        </div>

                        {/* Área das mensagens */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-800">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`mb-4 ${message.isOwn ? "text-right" : "text-left"}`}
                                >
                                    <div className={`inline-block max-w-xs rounded-2xl px-4 py-2 ${message.isOwn ? "bg-blue-600 text-white rounded-tr-none" : "bg-gray-700 text-gray-300 border border-gray-700 rounded-tl-none"}`}>
                                        <p className="text-sm">{message.content}</p>
                                        <div className={`flex items-center justify-end mt-1 ${message.isOwn ? "text-blue-200" : "text-gray-400"}`}>
                                            <span className="text-xs">{message.time}</span>
                                            {message.isOwn && (
                                                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                                    {message.isRead ? (
                                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                                                    ) : (
                                                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" />
                                                    )}
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            {isTyping && (
                                <div className="mb-4 text-left">
                                    <div className="inline-block bg-gray-700 border border-gray-700 rounded-2xl rounded-tl-none px-4 py-3">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Área de envio de mensagem */}
                        <div className="p-4 border-t border-gray-700 bg-gray-800">
                            <form onSubmit={handleSendMessage} className="flex items-center justify-between space-x-3">
                                <button type="button" className="p-2 hover:bg-gray-600 rounded-full">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                                
                                <div className="flex w-full relative">
                                    <textarea
                                        ref={inputRef}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Digite sua mensagem..."
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        rows="1"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newMessage.trim()}
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                                            newMessage.trim() 
                                                ? "bg-blue-600 text-white hover:bg-blue-700" 
                                                : "bg-gray-500 text-gray-300 cursor-not-allowed"
                                        }`}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                    </button>
                                </div>
                                
                                <button type="button" className="p-2 hover:bg-gray-600 rounded-full">
                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                    </svg>
                                </button>
                            </form>
                            
                            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                                <div className="flex items-center space-x-4">
                                    <button className="hover:text-blue-600">👍</button>
                                    <button className="hover:text-blue-600">👎</button>
                                    <button className="hover:text-blue-600">😊</button>
                                    <button className="hover:text-blue-600">💰</button>
                                </div>
                                <p>Pressione Enter para enviar, Shift+Enter para nova linha</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}