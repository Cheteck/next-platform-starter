'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  X, 
  Settings, 
  Filter, 
  MoreHorizontal,
  Heart,
  MessageSquare,
  Users,
  ShoppingCart,
  Star,
  Tag,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  Archive,
  Mail,
  Smartphone
} from 'lucide-react';
import { Card, Button, Badge as UIBadge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { 
  notifications as mockNotifications,
  users,
  products,
  spaces,
  Notification as NotificationType
} from '@/lib/mock-data';
import { NotificationSettings } from '@/types';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    email: true,
    push: true,
    sms: false,
    types: {
      like: { enabled: true, email: true, push: true, sms: false },
      comment: { enabled: true, email: true, push: true, sms: false },
      follow: { enabled: true, email: true, push: true, sms: false },
      message: { enabled: true, email: true, push: true, sms: true },
      product: { enabled: true, email: true, push: false, sms: false },
      space: { enabled: true, email: true, push: true, sms: false },
      order: { enabled: true, email: true, push: true, sms: true },
      promotion: { enabled: true, email: true, push: false, sms: false }
    }
  });

  useEffect(() => {
    // Simuler des notifications avec plus de données
    const enrichedNotifications = mockNotifications.map(notification => ({
      ...notification,
      userId: '1', // Current user ID
      createdAt: new Date(notification.createdAt),
      actionUrl: '/profile/1' // Default action URL
    }));
    setNotifications(enrichedNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-red-500" />;
      case 'comment': return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'follow': return <Users className="w-5 h-5 text-green-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-purple-500" />;
      case 'product': return <ShoppingCart className="w-5 h-5 text-orange-500" />;
      case 'space': return <Star className="w-5 h-5 text-yellow-500" />;
      case 'order': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'promotion': return <Tag className="w-5 h-5 text-pink-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'like': return 'bg-red-50 border-red-200';
      case 'comment': return 'bg-blue-50 border-blue-200';
      case 'follow': return 'bg-green-50 border-green-200';
      case 'message': return 'bg-purple-50 border-purple-200';
      case 'product': return 'bg-orange-50 border-orange-200';
      case 'space': return 'bg-yellow-50 border-yellow-200';
      case 'order': return 'bg-green-50 border-green-200';
      case 'promotion': return 'bg-pink-50 border-pink-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleSelectAll = () => {
    const filteredNotifications = getFilteredNotifications();
    setSelectedNotifications(
      selectedNotifications.length === filteredNotifications.length 
        ? [] 
        : filteredNotifications.map(n => n.id)
    );
  };

  const handleBulkAction = (action: 'read' | 'unread' | 'delete' | 'archive') => {
    if (selectedNotifications.length === 0) return;

    switch (action) {
      case 'read':
        setNotifications(prev => 
          prev.map(notification => 
            selectedNotifications.includes(notification.id)
              ? { ...notification, read: true }
              : notification
          )
        );
        break;
      case 'delete':
        setNotifications(prev => 
          prev.filter(notification => !selectedNotifications.includes(notification.id))
        );
        break;
      case 'archive':
        // Implementation would depend on your archive system
        break;
    }
    setSelectedNotifications([]);
  };

  const getFilteredNotifications = () => {
    return notifications.filter(notification => 
      filter === 'all' || !notification.read
    );
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `Il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)} heure${Math.floor(diffInHours) > 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}` : 'Toutes les notifications sont lues'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Paramètres
            </Button>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Tout marquer comme lu
              </Button>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Paramètres de notification</h3>
            
            <div className="space-y-6">
              {/* Global Settings */}
              <div>
                <h4 className="font-medium mb-3">Canaux de notification</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={notificationSettings.email}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        email: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span>Email</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={notificationSettings.push}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        push: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <span>Push</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg">
                    <input
                      type="checkbox"
                      checked={notificationSettings.sms}
                      onChange={(e) => setNotificationSettings(prev => ({
                        ...prev,
                        sms: e.target.checked
                      }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <MessageSquare className="w-5 h-5 text-gray-600" />
                    <span>SMS</span>
                  </label>
                </div>
              </div>

              {/* Type-specific Settings */}
              <div>
                <h4 className="font-medium mb-3">Types de notifications</h4>
                <div className="space-y-3">
                  {Object.entries(notificationSettings.types).map(([type, settings]) => (
                    <div key={type} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getNotificationIcon(type)}
                        <span className="capitalize font-medium">
                          {type === 'follow' ? 'Abonnements' :
                           type === 'comment' ? 'Commentaires' :
                           type === 'like' ? 'Likes' :
                           type === 'message' ? 'Messages' :
                           type === 'product' ? 'Produits' :
                           type === 'space' ? 'Spaces' :
                           type === 'order' ? 'Commandes' :
                           type === 'promotion' ? 'Promotions' : type}
                        </span>
                      </div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={settings.enabled}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            types: {
                              ...prev.types,
                              [type]: { ...settings, enabled: e.target.checked }
                            }
                          }))}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">Activé</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Filtres</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    filter === 'all' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Toutes</span>
                    <UIBadge variant="default">{notifications.length}</UIBadge>
                  </div>
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    filter === 'unread' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Non lues</span>
                    <UIBadge variant="default">{unreadCount}</UIBadge>
                  </div>
                </button>
              </div>

              {selectedNotifications.length > 0 && (
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Actions en lot ({selectedNotifications.length})
                  </h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('read')}
                      className="w-full justify-start"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Marquer comme lu
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBulkAction('delete')}
                      className="w-full justify-start text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Notifications List */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filter === 'unread' ? 'Notifications non lues' : 'Toutes les notifications'}
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSelectAll}
                  >
                    {selectedNotifications.length === filteredNotifications.length ? 'Désélectionner tout' : 'Sélectionner tout'}
                  </Button>
                </div>
              </div>

              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune notification
                  </h3>
                  <p className="text-gray-600">
                    {filter === 'unread' 
                      ? 'Vous avez lu toutes vos notifications' 
                      : 'Vous n\'avez aucune notification pour le moment'
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredNotifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer hover:shadow-sm ${
                        notification.read 
                          ? 'bg-white border-gray-200' 
                          : `${getNotificationColor(notification.type)} border-l-4`
                      } ${selectedNotifications.includes(notification.id) ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => !selectedNotifications.includes(notification.id) && markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox for bulk selection */}
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(notification.id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleSelectNotification(notification.id);
                          }}
                          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />

                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900 mb-1">
                                {notification.title}
                              </h4>
                              <p className="text-gray-700 mb-2">
                                {notification.message}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatDate(notification.createdAt)}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  deleteNotification(notification.id);
                                }}
                                className="text-gray-400 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Action Button */}
                          {notification.actionUrl && (
                            <div className="mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  if (notification.actionUrl) {
                                    window.location.href = notification.actionUrl;
                                  }
                                }}
                              >
                                Voir
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;