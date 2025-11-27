// Page Messagerie - Chat et conversations ECHOS
'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Avatar, Button, Input } from '@/components/ui';
import { Search, Send, Phone, Video, Info, Paperclip, Smile, MoreHorizontal } from 'lucide-react';
import { users, conversations, messages, getCurrentUser } from '@/lib/mock-data';

const currentUser = getCurrentUser();

// Fonction utilitaire pour formater l'heure
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

// Fonction utilitaire pour formater la date relative
const formatRelativeTime = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor(diff / 60000);

  if (days > 0) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  if (hours > 0) return `il y a ${hours}h`;
  if (minutes > 0) return `il y a ${minutes}min`;
  return 'Maintenant';
};

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer les conversations
  const filteredConversations = conversations.filter(conv => {
    if (!searchTerm) return true;
    
    const participants = conv.participants
      .map(id => users.find(u => u.id === id)?.name)
      .filter(Boolean)
      .join(' ');
    
    return participants.toLowerCase().includes(searchTerm.toLowerCase()) ||
           (conv.lastMessage?.content.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
  });

  // Obtenir les messages pour la conversation sélectionnée
  const getMessagesForConversation = (conversationId: string) => {
    return messages.filter(msg => {
      const isFromCurrentUser = msg.senderId === currentUser.id;
      const isFromSelectedConversation = selectedConversation.participants.includes(msg.senderId);
      return isFromCurrentUser || isFromSelectedConversation;
    }).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  };

  const conversationMessages = selectedConversation 
    ? getMessagesForConversation(selectedConversation.id)
    : [];

  // Obtenir l'autre participant de la conversation
  const getOtherParticipant = () => {
    if (!selectedConversation) return null;
    const otherUserId = selectedConversation.participants.find(id => id !== currentUser.id);
    return otherUserId ? users.find(u => u.id === otherUserId) : null;
  };

  const otherParticipant = getOtherParticipant();

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Dans une vraie app, on enverrait le message à l'API
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Layout 
      user={currentUser} 
      showSidebar={true} 
      showHeader={true}
      activeItem="/chat"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Messages</CardTitle>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => {
                    const otherUserId = conversation.participants.find(id => id !== currentUser.id);
                    const otherUser = otherUserId ? users.find(u => u.id === otherUserId) : null;
                    
                    if (!otherUser) return null;

                    const isSelected = selectedConversation?.id === conversation.id;

                    return (
                      <div
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation)}
                        className={`p-4 cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-blue-50 border-r-2 border-blue-500' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <Avatar src={otherUser.avatar} alt={otherUser.name} />
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-gray-900 truncate">
                                {otherUser.name}
                              </h4>
                              {conversation.lastMessage && (
                                <span className="text-xs text-gray-500">
                                  {formatTime(conversation.lastMessage.createdAt)}
                                </span>
                              )}
                            </div>
                            
                            {conversation.lastMessage && (
                              <p className="text-sm text-gray-600 truncate mt-1">
                                {conversation.lastMessage.content}
                              </p>
                            )}
                            
                            {conversation.unreadCount > 0 && (
                              <div className="flex justify-end mt-1">
                                <span className="inline-flex items-center justify-center h-5 w-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                                  {conversation.unreadCount}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            {selectedConversation && otherParticipant ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="flex-shrink-0 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} />
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{otherParticipant.name}</h3>
                        <p className="text-sm text-green-600">En ligne</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {conversationMessages.map((message) => {
                      const isCurrentUser = message.senderId === currentUser.id;
                      const sender = users.find(u => u.id === message.senderId);

                      return (
                        <div
                          key={message.id}
                          className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                            isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            {!isCurrentUser && (
                              <Avatar 
                                src={sender?.avatar} 
                                alt={sender?.name} 
                                size="sm" 
                              />
                            )}
                            
                            <div className={`px-4 py-2 rounded-lg ${
                              isCurrentUser
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm">{message.content}</p>
                              <p className={`text-xs mt-1 ${
                                isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {formatRelativeTime(message.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Message en cours de frappe (simulation) */}
                    {!conversationMessages.length && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Avatar src={otherParticipant.avatar} alt={otherParticipant.name} size="sm" />
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="flex-shrink-0 border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex-1 relative">
                      <Input
                        placeholder="Tapez votre message..."
                        value={newMessage}
                        onChange={(value: string) => setNewMessage(value)}
                        onKeyPress={handleKeyPress}
                        className="pr-10"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute right-1 top-1/2 -translate-y-1/2"
                      >
                        <Smile className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-400 mb-4">
                    <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une conversation</h3>
                  <p className="text-gray-600">
                    Choisissez une conversation dans la liste pour commencer à échanger.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-blue-600 mb-2">
                <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Nouveau groupe</h4>
              <p className="text-sm text-gray-600">Créez un groupe pour discuter avec plusieurs personnes</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-green-600 mb-2">
                <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Contacts</h4>
              <p className="text-sm text-gray-600">Invitez vos amis à rejoindre ECHOS</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-purple-600 mb-2">
                <svg className="h-8 w-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Paramètres</h4>
              <p className="text-sm text-gray-600">Gérez vos préférences de messagerie</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}