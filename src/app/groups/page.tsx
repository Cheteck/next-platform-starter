'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MessageCircle,
  UserPlus,
  Crown,
  Settings,
  Lock,
  Globe,
  Eye,
  EyeOff,
  Star,
  TrendingUp,
  MapPin,
  Calendar,
  Hash,
  Bell,
  BellOff,
  UserCheck,
  UserX,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  banner?: string;
  category: string;
  privacy: 'public' | 'private' | 'secret';
  memberCount: number;
  adminCount: number;
  moderatorCount: number;
  postCount: number;
  createdAt: Date;
  lastActivity: Date;
  location?: string;
  tags: string[];
  isMember: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  joinRequestPending: boolean;
  rules: string[];
  coverImage?: string;
}

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  role: 'admin' | 'moderator' | 'member';
  joinedAt: Date;
  isOnline: boolean;
}

// Mock data
const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Tech Lovers France',
    description: 'Communauté des passionnés de technologie en France. Discussions sur les dernières innovations, reviews et conseils.',
    avatar: '/api/placeholder/80/80',
    banner: '/api/placeholder/400/200',
    category: 'Technologie',
    privacy: 'public',
    memberCount: 2847,
    adminCount: 3,
    moderatorCount: 8,
    postCount: 15420,
    createdAt: new Date('2023-06-15'),
    lastActivity: new Date(Date.now() - 3600000),
    location: 'France',
    tags: ['Tech', 'Innovation', 'Reviews', 'Discussion'],
    isMember: true,
    isAdmin: false,
    isModerator: false,
    joinRequestPending: false,
    rules: [
      'Respecter tous les membres',
      'Pas de spam ou de promotion non autorisée',
      'Discussions constructives uniquement',
      'Pas de contenu offensant'
    ]
  },
  {
    id: 'group-2',
    name: 'Acheteurs Groupés Paris',
    description: 'Formez des groupes d\'achat pour obtenir de meilleurs prix. Partagez vos bonnes affaires et organisez des achats collectifs.',
    avatar: '/api/placeholder/80/80',
    category: 'Achats',
    privacy: 'public',
    memberCount: 1234,
    adminCount: 2,
    moderatorCount: 5,
    postCount: 8765,
    createdAt: new Date('2023-08-20'),
    lastActivity: new Date(Date.now() - 7200000),
    location: 'Paris',
    tags: ['Achats', 'Groupés', 'Bonnes affaires', 'Économies'],
    isMember: true,
    isAdmin: false,
    isModerator: false,
    joinRequestPending: false,
    rules: [
      'Seules les vraies bonnes affaires',
      'Pas de vente directe',
      'Respecter les délais de commande',
      'Partager les frais de port'
    ]
  },
  {
    id: 'group-3',
    name: 'Freelancers & Entrepreneurs',
    description: 'Réseau de freelancers et entrepreneurs pour s\'entraider, partager des opportunités et développer son business.',
    avatar: '/api/placeholder/80/80',
    category: 'Business',
    privacy: 'public',
    memberCount: 3456,
    adminCount: 4,
    moderatorCount: 12,
    postCount: 12340,
    createdAt: new Date('2023-03-10'),
    lastActivity: new Date(Date.now() - 1800000),
    location: 'France',
    tags: ['Freelance', 'Entrepreneuriat', 'Networking', 'Business'],
    isMember: false,
    isAdmin: false,
    isModerator: false,
    joinRequestPending: false,
    rules: [
      'Contenu professionnel uniquement',
      'Pas de spam commercial',
      'Partage d\'expériences constructif',
      'Respecter la propriété intellectuelle'
    ]
  },
  {
    id: 'group-4',
    name: 'Apple Users Community',
    description: 'La plus grande communauté française d\'utilisateurs Apple. Tips, tricks, support et news sur tous les produits Apple.',
    avatar: '/api/placeholder/80/80',
    banner: '/api/placeholder/400/200',
    category: 'Technologie',
    privacy: 'public',
    memberCount: 8923,
    adminCount: 5,
    moderatorCount: 18,
    postCount: 45672,
    createdAt: new Date('2022-11-05'),
    lastActivity: new Date(Date.now() - 900000),
    location: 'France',
    tags: ['Apple', 'iPhone', 'Mac', 'iOS', 'macOS'],
    isMember: false,
    isAdmin: false,
    isModerator: false,
    joinRequestPending: true,
    rules: [
      'Respecter l\'écosystème Apple',
      'Aide et support entre membres',
      'Partage de tips et tricks',
      'Pas de jailbreak ou hacking'
    ]
  },
  {
    id: 'group-5',
    name: 'Investisseurs Crypto France',
    description: 'Groupe privé pour discuter d\'investissement en cryptomonnaies. Analyses, conseils et partage d\'expérience.',
    avatar: '/api/placeholder/80/80',
    category: 'Finance',
    privacy: 'private',
    memberCount: 567,
    adminCount: 2,
    moderatorCount: 4,
    postCount: 3240,
    createdAt: new Date('2023-12-01'),
    lastActivity: new Date(Date.now() - 3600000),
    location: 'France',
    tags: ['Cryptomonnaies', 'Investissement', 'Trading', 'Finance'],
    isMember: false,
    isAdmin: false,
    isModerator: false,
    joinRequestPending: false,
    rules: [
      'Accès sur demande uniquement',
      'Informations financières fiables uniquement',
      'Pas de conseil financier personnalisé',
      'Respecter la confidentialité'
    ]
  }
];

// Components
const GroupCard: React.FC<{
  group: Group;
  viewMode: 'grid' | 'list';
  onJoin: (groupId: string) => void;
  onLeave: (groupId: string) => void;
  onViewDetails: (groupId: string) => void;
}> = ({ group, viewMode, onJoin, onLeave, onViewDetails }) => {
  const getPrivacyIcon = () => {
    switch (group.privacy) {
      case 'public':
        return <Globe size={16} className="text-green-500" />;
      case 'private':
        return <Lock size={16} className="text-yellow-500" />;
      case 'secret':
        return <EyeOff size={16} className="text-red-500" />;
      default:
        return <Globe size={16} className="text-gray-500" />;
    }
  };

  const getPrivacyLabel = () => {
    switch (group.privacy) {
      case 'public':
        return 'Public';
      case 'private':
        return 'Privé';
      case 'secret':
        return 'Secret';
      default:
        return group.privacy;
    }
  };

  const getRoleBadge = () => {
    if (group.isAdmin) {
      return <Badge className="bg-purple-100 text-purple-800"><Crown size={12} className="mr-1" />Admin</Badge>;
    }
    if (group.isModerator) {
      return <Badge className="bg-blue-100 text-blue-800">Modérateur</Badge>;
    }
    if (group.isMember) {
      return <Badge className="bg-green-100 text-green-800">Membre</Badge>;
    }
    if (group.joinRequestPending) {
      <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
    }
    return null;
  };

  const formatLastActivity = (date: Date) => {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `il y a ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `il y a ${Math.floor(diffInMinutes / 60)} h`;
    } else {
      return `il y a ${Math.floor(diffInMinutes / 1440)} j`;
    }
  };

  if (viewMode === 'list') {
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-medium">
            {group.name.substring(0, 2).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{group.name}</h3>
                  {getPrivacyIcon()}
                  {getRoleBadge()}
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                  {group.description}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{group.memberCount.toLocaleString()} membres</span>
                  <span>{group.postCount.toLocaleString()} posts</span>
                  <span>{group.category}</span>
                  {group.location && (
                    <span className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {group.location}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewDetails(group.id)}
                >
                  <Eye size={16} />
                </Button>
                
                {group.isMember ? (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onViewDetails(group.id)}
                    >
                      <MessageCircle size={16} className="mr-1" />
                      Accéder
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onLeave(group.id)}
                      className="text-red-600"
                    >
                      Quitter
                    </Button>
                  </div>
                ) : group.joinRequestPending ? (
                  <Button size="sm" variant="outline" disabled>
                    Demande en attente
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => onJoin(group.id)}
                    disabled={group.privacy === 'secret'}
                  >
                    <UserPlus size={16} className="mr-1" />
                    Rejoindre
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-wrap gap-1">
                {group.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <span>Actif {formatLastActivity(group.lastActivity)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid view
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow group">
      <div className="relative mb-4">
        {group.banner ? (
          <div className="aspect-[3/1] bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium">
            {group.name.substring(0, 2).toUpperCase()}
          </div>
        ) : (
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-medium mx-auto">
            {group.name.substring(0, 2).toUpperCase()}
          </div>
        )}
        
        <div className="absolute top-2 left-2 flex space-x-1">
          {getPrivacyIcon()}
          {getRoleBadge()}
        </div>
        
        <div className="absolute top-2 right-2">
          <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreHorizontal size={16} />
          </Button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
            {group.name}
          </h3>
          <p className="text-xs text-gray-600">{group.category}</p>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {group.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{group.memberCount.toLocaleString()} membres</span>
          <span>{group.postCount.toLocaleString()} posts</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {group.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="text-xs text-gray-500">
          Actif {formatLastActivity(group.lastActivity)}
        </div>
        
        <div className="flex space-x-1">
          {group.isMember ? (
            <>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
                <MessageCircle size={12} className="mr-1" />
                Chat
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs text-red-600"
                onClick={() => onLeave(group.id)}
              >
                Quitter
              </Button>
            </>
          ) : group.joinRequestPending ? (
            <Button size="sm" variant="outline" disabled className="w-full text-xs">
              En attente
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => onJoin(group.id)}
              disabled={group.privacy === 'secret'}
              className="w-full text-xs"
            >
              <UserPlus size={12} className="mr-1" />
              Rejoindre
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default function GroupsPage() {
  const [groups] = useState<Group[]>(mockGroups);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [privacyFilter, setPrivacyFilter] = useState<'all' | Group['privacy']>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'members' | 'activity'>('activity');

  const handleJoinGroup = (groupId: string) => {
    console.log('Joining group:', groupId);
  };

  const handleLeaveGroup = (groupId: string) => {
    console.log('Leaving group:', groupId);
  };

  const handleViewDetails = (groupId: string) => {
    console.log('Viewing group details:', groupId);
  };

  const filteredGroups = groups
    .filter(group => {
      const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'all' || group.category === categoryFilter;
      const matchesPrivacy = privacyFilter === 'all' || group.privacy === privacyFilter;
      
      return matchesSearch && matchesCategory && matchesPrivacy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'members':
          return b.memberCount - a.memberCount;
        case 'activity':
          return b.lastActivity.getTime() - a.lastActivity.getTime();
        default:
          return 0;
      }
    });

  const categories = Array.from(new Set(groups.map(g => g.category)));

  const userGroups = groups.filter(g => g.isMember);
  const suggestedGroups = groups.filter(g => !g.isMember);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Users className="mr-3 text-blue-500" size={32} />
                Groupes
              </h1>
              <p className="text-gray-600">
                Rejoignez des communautés, créez des groupes et connectez-vous avec des personnes partageant vos intérêts.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filtrer
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Créer un groupe
              </Button>
            </div>
          </div>
        </div>

        {/* My Groups Stats */}
        {userGroups.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mes groupes</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <Users className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">{userGroups.length}</p>
                <p className="text-sm text-gray-600">Groupes rejoints</p>
              </Card>
              <Card className="p-4 text-center">
                <MessageCircle className="mx-auto text-green-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Discussions actives</p>
              </Card>
              <Card className="p-4 text-center">
                <UserCheck className="mx-auto text-purple-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-sm text-gray-600">Admin/Modérateur</p>
              </Card>
              <Card className="p-4 text-center">
                <TrendingUp className="mx-auto text-orange-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-600">Participation</p>
              </Card>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher des groupes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={privacyFilter}
              onChange={(e) => setPrivacyFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes les visibilités</option>
              <option value="public">Publics</option>
              <option value="private">Privés</option>
              <option value="secret">Secrets</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="activity">Plus actifs</option>
              <option value="members">Plus populaires</option>
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${
                  viewMode === 'grid'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${
                  viewMode === 'list'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Groups */}
        {userGroups.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Groupes recommandés</h2>
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {suggestedGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  viewMode={viewMode}
                  onJoin={handleJoinGroup}
                  onLeave={handleLeaveGroup}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Groups */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tous les groupes</h2>
          {filteredGroups.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="mx-auto text-gray-400 mb-4" size={64} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Aucun groupe trouvé
              </h3>
              <p className="text-gray-600 mb-6">
                Aucun groupe ne correspond à vos critères de recherche.
              </p>
              <Button>
                <Plus size={16} className="mr-2" />
                Créer le premier groupe
              </Button>
            </Card>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  viewMode={viewMode}
                  onJoin={handleJoinGroup}
                  onLeave={handleLeaveGroup}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-3">
            <Star className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Créez votre propre communauté
              </h3>
              <p className="text-blue-700 mb-4">
                Lancez un groupe autour de vos passions et rencontrez des personnes qui partagent vos intérêts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start">
                  <Plus size={16} className="mr-2" />
                  Nouveau groupe
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users size={16} className="mr-2" />
                  Inviter des amis
                </Button>
                <Button variant="outline" className="justify-start">
                  <Settings size={16} className="mr-2" />
                  Gérer mes groupes
                </Button>
                <Button variant="outline" className="justify-start">
                  <TrendingUp size={16} className="mr-2" />
                  Analytics groupes
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}