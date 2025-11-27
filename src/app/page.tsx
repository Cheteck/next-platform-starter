// Page d'accueil - Feed Social ECHOS
'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Avatar, Button, Badge } from '@/components/ui';
import { Heart, MessageCircle, Share, MoreHorizontal, Star, MapPin } from 'lucide-react';
import { users, posts, spaces, getCurrentUser } from '@/lib/mock-data';

const currentUser = getCurrentUser();

// Fonction utilitaire pour formater la date
const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  if (hours > 0) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  return 'à l\'instant';
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('recent');

  const handleLike = (postId: string) => {
    console.log('Like post:', postId);
  };

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    console.log('Share post:', postId);
  };

  return (
    <Layout 
      user={currentUser} 
      showSidebar={true} 
      showHeader={true}
      activeItem="/"
    >
      <div className="max-w-2xl mx-auto">
        {/* Stories/Highlights */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex space-x-4 overflow-x-auto">
              <div className="flex flex-col items-center space-y-1 min-w-0 flex-shrink-0">
                <div className="relative">
                  <Avatar src={currentUser.avatar} alt={currentUser.name} size="lg" />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-xs text-gray-600">Votre histoire</span>
              </div>
              {spaces.slice(0, 5).map((space) => (
                <div key={space.id} className="flex flex-col items-center space-y-1 min-w-0 flex-shrink-0">
                  <div className="relative">
                    <Avatar src={space.logo} alt={space.name} size="lg" />
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-xs text-gray-600 truncate max-w-16">{space.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Create Post */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex space-x-3">
              <Avatar src={currentUser.avatar} alt={currentUser.name} />
              <div className="flex-1">
                <button className="w-full text-left px-4 py-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                  Que voulez-vous partager ?
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <span className="text-sm">📷</span>
                <span className="text-sm">Photo</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <span className="text-sm">📍</span>
                <span className="text-sm">Position</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <span className="text-sm">😊</span>
                <span className="text-sm">Feeling</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
          {[
            { key: 'recent', label: 'Récent' },
            { key: 'following', label: 'Abonnements' },
            { key: 'spaces', label: 'Spaces' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.map((post) => {
            const user = users.find(u => u.id === post.userId);
            const space = post.spaceId ? spaces.find(s => s.id === post.spaceId) : null;

            if (!user) return null;

            return (
              <Card key={post.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar src={user.avatar} alt={user.name} />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
                          {user.verified && (
                            <Badge variant="info" className="px-1 py-0">
                              ✓
                            </Badge>
                          )}
                          {space && (
                            <>
                              <span className="text-gray-400">•</span>
                              <div className="flex items-center space-x-1">
                                <img src={space.logo} alt={space.name} className="h-4 w-4 rounded" />
                                <span className="text-sm text-gray-600">{space.name}</span>
                                {space.verified && (
                                  <Badge variant="info" className="px-1 py-0">
                                    ✓
                                  </Badge>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{formatTimeAgo(post.createdAt)}</span>
                          {space?.category && (
                            <>
                              <span>•</span>
                              <span>{space.category}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Post Content */}
                  <p className="text-gray-900">{post.content}</p>

                  {/* Post Images */}
                  {post.images && post.images.length > 0 && (
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={post.images[0]}
                        alt="Post image"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{post.likes}</span>
                      </span>
                      <span>{post.comments} commentaires</span>
                      <span>{post.shares} partages</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className="flex-1 flex items-center justify-center space-x-2"
                    >
                      <Heart className="h-4 w-4" />
                      <span>J&#39;aime</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleComment(post.id)}
                      className="flex-1 flex items-center justify-center space-x-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Commenter</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(post.id)}
                      className="flex-1 flex items-center justify-center space-x-2"
                    >
                      <Share className="h-4 w-4" />
                      <span>Partager</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center py-6">
          <Button variant="outline">
            Charger plus de publications
          </Button>
        </div>
      </div>

      {/* Right Sidebar - Suggested Spaces */}
      <div className="hidden xl:block w-80 ml-8">
        <div className="space-y-6">
          {/* Suggested Spaces */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Spaces suggérés</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {spaces.slice(0, 3).map((space) => (
                <div key={space.id} className="flex items-center space-x-3">
                  <Avatar src={space.logo} alt={space.name} />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{space.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{space.category}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span>{space.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Suivre
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tendances</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['#été2024', '#mode', '#tech', '#startup', '#innovation'].map((trend) => (
                <div key={trend} className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">{trend}</span>
                  <span className="text-xs text-gray-500">1.2K posts</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
