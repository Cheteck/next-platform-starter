'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { users, posts as allPosts, type User } from '@/lib/mock-data';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs, type TabId } from '@/components/profile/ProfileTabs';
import { ProfileSidebar } from '@/components/profile/ProfileSidebar';
import { PostCard } from '@/components/profile/PostCard';
import { ProfileAbout } from '@/components/profile/ProfileAbout';
import { ProfilePhotos } from '@/components/profile/ProfilePhotos';
import { ProfileNetwork } from '@/components/profile/ProfileNetwork';
import { Card, CardContent } from '@/components/ui';
import { PenTool } from 'lucide-react';

export default function ProfilePage() {
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('posts');
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // In a real app, fetch user by ID
    const userData = users.find(u => u.id === '1'); // Mocking fetching user 1 for demo
    if (userData) setUser(userData);
  }, [params.id]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  const userPosts = allPosts.filter(p => p.userId === user.id);

  const isOwner = user?.id === '1'; // Mocking current user as ID '1'

  return (
    <div className="bg-gray-100 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        <ProfileHeader
          user={user}
          isFollowing={isFollowing}
          onFollowToggle={() => setIsFollowing(!isFollowing)}
          isOwner={isOwner}
        />

        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar (Desktop) - Only visible on 'posts' tab or large screens */}
          <div className={`lg:col-span-5 xl:col-span-4 space-y-6 ${activeTab !== 'posts' ? 'hidden lg:block' : ''}`}>
            <ProfileSidebar user={user} />
          </div>

          {/* Main Content Area */}
          <div className={`lg:col-span-7 xl:col-span-8 ${activeTab !== 'posts' ? 'lg:col-span-12 xl:col-span-12' : ''}`}>

            {activeTab === 'posts' && (
              <div className="space-y-6">
                {/* Create Post Placeholder */}
                {isOwner && (
                  <Card className="shadow-sm mb-6">
                    <CardContent className="p-4 flex space-x-4">
                      <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full bg-gray-200" />
                      <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors">
                        Quoi de neuf, {user.name.split(' ')[0]} ?
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Posts Feed */}
                {userPosts.length > 0 ? (
                  userPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <Card className="shadow-sm text-center text-gray-500 py-12">
                    <CardContent>
                      <PenTool className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                      <h3 className="text-lg font-medium text-gray-900">Aucune publication</h3>
                      <p className="mt-1 text-sm text-gray-500">Cet utilisateur n'a pas encore partagé de contenu.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'about' && <ProfileAbout user={user} isOwner={isOwner} />}

            {activeTab === 'photos' && <ProfilePhotos />}

            {activeTab === 'network' && <ProfileNetwork isOwner={isOwner} />}

            {activeTab === 'videos' && (
              <Card className="shadow-sm text-center text-gray-500 py-12">
                <CardContent>
                  <h3 className="text-lg font-medium text-gray-900">Vidéos</h3>
                  <p className="mt-1 text-sm text-gray-500">Fonctionnalité à venir prochainement.</p>
                </CardContent>
              </Card>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
