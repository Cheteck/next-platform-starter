'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Phone, 
  Video, 
  MoreHorizontal,
  Search,
  Info,
  PhoneOff,
  X,
  Image,
  File,
  Clock,
  Check,
  CheckCheck,
  Archive,
  Trash2,
  Volume2,
  VolumeX,
  Pin,
  Bell,
  BellOff
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  type: 'text' | 'image' | 'file' | 'audio' | 'video';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; users: string[] }[];
  replyTo?: {
    id: string;
    content: string;
    senderName: string;
  };
  isDeleted?: boolean;
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantStatus: 'online' | 'away' | 'busy' | 'offline';
  lastSeen: Date;
  isTyping: boolean;
  unreadCount: number;
  messages: Message[];
  isPinned: boolean;
  isArchived: boolean;
  notifications: boolean;
  theme: 'light' | 'dark';
}

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

// Mock data
const mockConversation: Conversation = {
  id: 'conv-1',
  participantId: 'user-123',
  participantName: 'Marie Dubois',
  participantAvatar: '/api/placeholder/40/40',
  participantStatus: 'online',
  lastSeen: new Date(),
  isTyping: false,
  unreadCount: 0,
  isPinned: true,
  isArchived: false,
  notifications: true,
  theme: 'light',
  messages: [
    {
      id: 'msg-1',
      senderId: 'user-123',
      senderName: 'Marie Dubois',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Salut ! Comment allez-vous ?',
      type: 'text',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: 'msg-2',
      senderId: 'current-user',
      senderName: 'Moi',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Bonjour Marie ! Très bien merci, et vous ?',
      type: 'text',
      timestamp: new Date(Date.now() - 3500000),
      status: 'read'
    },
    {
      id: 'msg-3',
      senderId: 'user-123',
      senderName: 'Marie Dubois',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Ça va super ! J\'ai vu que vous vendez des iPhone. J\'en cherche un pour ma fille.',
      type: 'text',
      timestamp: new Date(Date.now() - 3400000),
      status: 'read'
    },
    {
      id: 'msg-4',
      senderId: 'current-user',
      senderName: 'Moi',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Oui, j\'en ai plusieurs en stock ! Quel modèle recherchez-vous exactement ?',
      type: 'text',
      timestamp: new Date(Date.now() - 3300000),
      status: 'read'
    },
    {
      id: 'msg-5',
      senderId: 'user-123',
      senderName: 'Marie Dubois',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Un iPhone 14 ou 15, de préférence avec une bonne capacité de stockage.',
      type: 'text',
      timestamp: new Date(Date.now() - 3200000),
      status: 'delivered'
    },
    {
      id: 'msg-6',
      senderId: 'current-user',
      senderName: 'Moi',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Parfait ! J\'ai un iPhone 15 Pro 256GB en excellent état. Voulez-vous que je vous envoie des photos ?',
      type: 'text',
      timestamp: new Date(Date.now() - 3100000),
      status: 'sent'
    },
    {
      id: 'msg-7',
      senderId: 'user-123',
      senderName: 'Marie Dubois',
      senderAvatar: '/api/placeholder/40/40',
      content: 'Oui ce serait génial ! Et le prix ?',
      type: 'text',
      timestamp: new Date(Date.now() - 3000000),
      status: 'delivered'
    }
  ]
};

// Components
const MessageBubble: React.FC<{ 
  message: Message; 
  isOwn: boolean;
  showAvatar: boolean;
  onReply: (message: Message) => void;
  onReact: (messageId: string, emoji: string) => void;
}> = ({ message, isOwn, showAvatar, onReply, onReact }) => {
  const [showActions, setShowActions] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Clock size={12} className="text-gray-400" />;
      case 'sent':
        return <Check size={12} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={12} className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4 group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`flex ${isOwn ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2 max-w-[70%]`}>
        {!isOwn && showAvatar && (
          <Avatar 
            src={message.senderAvatar} 
            alt={message.senderName} 
            size="sm"
            className="mb-1"
          />
        )}
        
        <div className={`relative ${isOwn ? 'mr-2' : 'ml-2'}`}>
          {message.replyTo && (
            <div className={`mb-1 p-2 rounded-lg text-xs ${
              isOwn ? 'bg-blue-600 text-blue-100' : 'bg-gray-200 text-gray-700'
            }`}>
              <p className="font-medium">{message.replyTo.senderName}</p>
              <p className="truncate">{message.replyTo.content}</p>
            </div>
          )}
          
          <div
            className={`p-3 rounded-lg ${
              isOwn
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-900'
            } ${message.type === 'file' ? 'border' : ''}`}
            onClick={() => setShowTime(!showTime)}
          >
            {message.type === 'text' && (
              <p className="whitespace-pre-wrap">{message.content}</p>
            )}
            
            {message.type === 'image' && (
              <div>
                <img 
                  src={message.content} 
                  alt="Image partagée" 
                  className="max-w-full h-auto rounded-lg cursor-pointer"
                  onClick={() => window.open(message.content, '_blank')}
                />
                {message.content.includes('image-caption') && (
                  <p className="mt-2 text-sm">{message.content.replace('image-caption: ', '')}</p>
                )}
              </div>
            )}
            
            {message.type === 'file' && (
              <div className="flex items-center space-x-2">
                <File size={20} />
                <div>
                  <p className="font-medium">{message.content}</p>
                  <p className="text-xs opacity-70">Cliquez pour télécharger</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Actions */}
          {showActions && (
            <div className={`absolute top-0 ${isOwn ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'} 
                          flex items-center space-x-1 bg-white rounded-lg shadow-lg border p-1`}>
              <button
                onClick={() => onReply(message)}
                className="p-1 hover:bg-gray-100 rounded"
                title="Répondre"
              >
                ↩
              </button>
              <button
                onClick={() => onReact(message.id, '👍')}
                className="p-1 hover:bg-gray-100 rounded"
                title="Réaction"
              >
                👍
              </button>
              <button
                onClick={() => onReact(message.id, '❤️')}
                className="p-1 hover:bg-gray-100 rounded"
                title="J'aime"
              >
                ❤️
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded"
                title="Copier"
              >
                📋
              </button>
              <button
                className="p-1 hover:bg-gray-100 rounded text-red-600"
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          )}
          
          {/* Timestamp */}
          {showTime && (
            <div className={`absolute top-full mt-1 text-xs text-gray-500 ${
              isOwn ? 'right-0' : 'left-0'
            }`}>
              {formatTime(message.timestamp)} {isOwn && getStatusIcon()}
            </div>
          )}
          
          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  className="bg-gray-100 rounded-full px-2 py-1 text-xs hover:bg-gray-200"
                  title={`${reaction.users.length} personnes`}
                >
                  {reaction.emoji} {reaction.users.length}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-2 mb-4">
    <Avatar src="/api/placeholder/40/40" alt="Marie" size="sm" />
    <div className="bg-gray-200 rounded-lg p-3">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  </div>
);

export default function ChatConversationPage({ params }: { params: { id: string } }) {
  const [conversation] = useState<Conversation>(mockConversation);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Implementation for sending message
      const message: Message = {
        id: `msg-${Date.now()}`,
        senderId: 'current-user',
        senderName: 'Moi',
        senderAvatar: '/api/placeholder/40/40',
        content: newMessage,
        type: 'text',
        timestamp: new Date(),
        status: 'sending',
        replyTo: replyTo ? {
          id: replyTo.id,
          content: replyTo.content,
          senderName: replyTo.senderName
        } : undefined
      };
      
      console.log('Sending message:', message);
      setNewMessage('');
      setReplyTo(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReply = (message: Message) => {
    setReplyTo(message);
  };

  const handleReact = (messageId: string, emoji: string) => {
    // Implementation for adding reaction
    console.log('Adding reaction', messageId, emoji);
  };

  const getStatusColor = (status: Conversation['participantStatus']) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'busy':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: Conversation['participantStatus']) => {
    switch (status) {
      case 'online':
        return 'En ligne';
      case 'away':
        return 'Absent';
      case 'busy':
        return 'Occupé';
      default:
        return 'Hors ligne';
    }
  };

  return (
    <Layout>
      <div className="flex h-screen max-h-screen bg-gray-50">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar 
                    src={conversation.participantAvatar} 
                    alt={conversation.participantName} 
                    size="lg"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(conversation.participantStatus)}`}></div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{conversation.participantName}</h2>
                  <p className="text-sm text-gray-500">
                    {conversation.isTyping ? 'En train d\'écrire...' : 
                     conversation.participantStatus === 'online' ? 'En ligne' :
                     `Vu pour la dernière fois ${conversation.lastSeen.toLocaleDateString('fr-FR')}`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Phone size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Video size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <Info size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            {conversation.messages.map((message, index) => {
              const isOwn = message.senderId === 'current-user';
              const showAvatar = index === 0 || 
                conversation.messages[index - 1].senderId !== message.senderId;
              
              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  onReply={handleReply}
                  onReact={handleReact}
                />
              );
            })}
            
            {conversation.isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Reply Preview */}
          {replyTo && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 ml-4 mr-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Répondre à {replyTo.senderName}</p>
                  <p className="text-sm text-blue-600 truncate">{replyTo.content}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setReplyTo(null)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tapez votre message..."
                    className="w-full p-3 pr-20 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={1}
                    style={{ minHeight: '44px', maxHeight: '120px' }}
                  />
                  
                  <div className="absolute right-2 bottom-2 flex items-center space-x-1">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Smile size={18} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-gray-700">
                      <Paperclip size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-3"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        {showInfo && (
          <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="text-center">
                <Avatar 
                  src={conversation.participantAvatar} 
                  alt={conversation.participantName} 
                  size="xl"
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-lg">{conversation.participantName}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  {getStatusText(conversation.participantStatus)}
                </p>
                {conversation.participantStatus === 'offline' && (
                  <p className="text-xs text-gray-400">
                    Vu pour la dernière fois le {conversation.lastSeen.toLocaleDateString('fr-FR')}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <BellOff size={16} /> : <Bell size={16} />}
                  <span className="ml-2">
                    {isMuted ? 'Réactiver notifications' : 'Couper notifications'}
                  </span>
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Pin size={16} />
                  <span className="ml-2">
                    {conversation.isPinned ? 'Retirer du épinglé' : 'Épingler'}
                  </span>
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Search size={16} />
                  <span className="ml-2">Rechercher dans la conversation</span>
                </Button>
                
                <Button variant="outline" className="w-full justify-start text-red-600">
                  <Trash2 size={16} />
                  <span className="ml-2">Supprimer la conversation</span>
                </Button>
              </div>

              {/* Media & Files */}
              <div>
                <h4 className="font-medium mb-3">Médias et fichiers</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div 
                      key={item}
                      className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400"
                    >
                      📷
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  Voir tout
                </Button>
              </div>

              {/* Settings */}
              <div>
                <h4 className="font-medium mb-3">Confidentialité et support</h4>
                <div className="space-y-2">
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                    Bloquer
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                    Signaler
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                    Centre d'aide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}