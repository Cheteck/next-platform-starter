'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Users, 
  Star,
  Video,
  Image,
  Share2,
  Heart,
  MessageCircle,
  Map,
  Ticket,
  ExternalLink,
  Play,
  Camera,
  Globe,
  Eye,
  CheckCircle,
  AlertCircle,
  MoreHorizontal,
  Bell,
  BellOff,
  Settings,
  Download,
  Trophy
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'webinar' | 'meetup' | 'launch' | 'contest' | 'workshop' | 'conference' | 'live';
  category: string;
  startDate: Date;
  endDate: Date;
  timezone: string;
  location: {
    type: 'online' | 'physical' | 'hybrid';
    address?: string;
    city?: string;
    country?: string;
    venue?: string;
    url?: string;
  };
  organizer: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
    organization?: string;
  };
  status: 'draft' | 'published' | 'live' | 'ended' | 'cancelled';
  visibility: 'public' | 'private' | 'invite_only';
  maxAttendees?: number;
  currentAttendees: number;
  interestedCount: number;
  tags: string[];
  price: number;
  currency: string;
  isFree: boolean;
  registrationRequired: boolean;
  isRegistered: boolean;
  isInterested: boolean;
  isFeatured: boolean;
  allowChat: boolean;
  allowNetworking: boolean;
  streaming?: {
    platform: string;
    url: string;
    isLive: boolean;
    viewerCount?: number;
  };
  agenda?: Array<{
    time: string;
    title: string;
    speaker: string;
    duration: number;
    description?: string;
  }>;
  speakers?: Array<{
    id: string;
    name: string;
    title: string;
    company: string;
    avatar: string;
    bio: string;
  }>;
  requirements?: string[];
  materials?: Array<{
    name: string;
    url: string;
    type: 'pdf' | 'video' | 'link' | 'image';
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data
const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Lancement iPhone 15 Pro - Présentation Exclusive',
    description: 'Découvrez en avant-première le nouvel iPhone 15 Pro avec des démonstrations live et des offres spéciales. Session interactive avec nos experts Apple.',
    image: '/api/placeholder/400/250',
    type: 'launch',
    category: 'Technologie',
    startDate: new Date('2024-01-25T14:00:00'),
    endDate: new Date('2024-01-25T16:00:00'),
    timezone: 'Europe/Paris',
    location: {
      type: 'hybrid',
      address: '123 Avenue des Champs-Élysées',
      city: 'Paris',
      country: 'France',
      venue: 'Apple Store Paris'
    },
    organizer: {
      id: 'org-1',
      name: 'Apple Store France',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
      organization: 'Apple Inc.'
    },
    status: 'published',
    visibility: 'public',
    maxAttendees: 200,
    currentAttendees: 156,
    interestedCount: 89,
    tags: ['Apple', 'iPhone', 'Lancement', 'Présentation'],
    price: 0,
    currency: 'EUR',
    isFree: true,
    registrationRequired: true,
    isRegistered: true,
    isInterested: false,
    isFeatured: true,
    allowChat: true,
    allowNetworking: true,
    agenda: [
      {
        time: '14:00',
        title: 'Accueil et présentation',
        speaker: 'Équipe Apple',
        duration: 30
      },
      {
        time: '14:30',
        title: 'Démo iPhone 15 Pro',
        speaker: 'Expert Produit',
        duration: 45
      },
      {
        time: '15:15',
        title: 'Q&A avec experts',
        speaker: 'Community',
        duration: 30
      },
      {
        time: '15:45',
        title: 'Offres spéciales',
        speaker: 'Équipe Commerciale',
        duration: 15
      }
    ],
    speakers: [
      {
        id: 'speaker-1',
        name: 'Sophie Martin',
        title: 'Expert Produit',
        company: 'Apple France',
        avatar: '/api/placeholder/60/60',
        bio: 'Spécialiste produits Apple avec 10 ans d\'expérience'
      }
    ],
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-18T14:30:00')
  },
  {
    id: 'event-2',
    title: 'Webinaire: Stratégies de E-commerce 2024',
    description: 'Apprenez les dernières tendances et stratégies pour développer votre business en ligne. Présentation interactive avec cas pratiques et session Q&A.',
    image: '/api/placeholder/400/250',
    type: 'webinar',
    category: 'Business',
    startDate: new Date('2024-01-30T19:00:00'),
    endDate: new Date('2024-01-30T21:00:00'),
    timezone: 'Europe/Paris',
    location: {
      type: 'online',
      url: 'https://echos.com/events/event-2/join'
    },
    organizer: {
      id: 'org-2',
      name: 'ECHOS Business',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
      organization: 'ECHOS Platform'
    },
    status: 'published',
    visibility: 'public',
    maxAttendees: 500,
    currentAttendees: 234,
    interestedCount: 67,
    tags: ['E-commerce', 'Business', 'Marketing', 'Stratégie'],
    price: 29.99,
    currency: 'EUR',
    isFree: false,
    registrationRequired: true,
    isRegistered: false,
    isInterested: true,
    isFeatured: false,
    allowChat: true,
    allowNetworking: true,
    createdAt: new Date('2024-01-16T09:15:00'),
    updatedAt: new Date('2024-01-18T11:20:00')
  },
  {
    id: 'event-3',
    title: 'Meetup Tech Entrepreneurs Paris',
    description: 'Networking et partage d\'expériences entre entrepreneurs tech. Présentations éclair, échanges informels et opportunités de collaboration.',
    image: '/api/placeholder/400/250',
    type: 'meetup',
    category: 'Networking',
    startDate: new Date('2024-02-02T18:30:00'),
    endDate: new Date('2024-02-02T22:00:00'),
    timezone: 'Europe/Paris',
    location: {
      type: 'physical',
      address: '45 Rue de Rivoli',
      city: 'Paris',
      country: 'France',
      venue: 'Station F'
    },
    organizer: {
      id: 'org-3',
      name: 'Tech Entrepreneurs',
      avatar: '/api/placeholder/40/40',
      isVerified: false
    },
    status: 'published',
    visibility: 'public',
    maxAttendees: 150,
    currentAttendees: 78,
    interestedCount: 34,
    tags: ['Startup', 'Entrepreneuriat', 'Networking', 'Paris'],
    price: 15,
    currency: 'EUR',
    isFree: false,
    registrationRequired: true,
    isRegistered: false,
    isInterested: false,
    isFeatured: false,
    allowChat: false,
    allowNetworking: true,
    createdAt: new Date('2024-01-17T14:45:00'),
    updatedAt: new Date('2024-01-18T16:10:00')
  },
  {
    id: 'event-4',
    title: 'LIVE: Discussion iPhone vs Samsung 2024',
    description: 'Débat en direct entre experts pour comparer les dernières gammes iPhone 15 et Galaxy S24. Stream interactif avec sondages en temps réel.',
    image: '/api/placeholder/400/250',
    type: 'live',
    category: 'Technologie',
    startDate: new Date('2024-01-22T20:00:00'),
    endDate: new Date('2024-01-22T21:30:00'),
    timezone: 'Europe/Paris',
    location: {
      type: 'online',
      url: 'https://echos.com/events/event-4/live'
    },
    organizer: {
      id: 'org-4',
      name: 'TechTalk Live',
      avatar: '/api/placeholder/40/40',
      isVerified: true,
      organization: 'TechTalk Media'
    },
    status: 'live',
    visibility: 'public',
    currentAttendees: 1234,
    interestedCount: 567,
    tags: ['Live', 'Comparaison', 'iPhone', 'Samsung', 'Stream'],
    price: 0,
    currency: 'EUR',
    isFree: true,
    registrationRequired: false,
    isRegistered: false,
    isInterested: true,
    isFeatured: true,
    allowChat: true,
    allowNetworking: false,
    streaming: {
      platform: 'ECHOS Live',
      url: 'https://echos.com/events/event-4/live',
      isLive: true,
      viewerCount: 1234
    },
    createdAt: new Date('2024-01-20T16:20:00'),
    updatedAt: new Date('2024-01-22T19:45:00')
  }
];

// Components
const EventCard: React.FC<{
  event: Event;
  onRegister: (eventId: string) => void;
  onInterested: (eventId: string) => void;
  onShare: (eventId: string) => void;
  onViewDetails: (eventId: string) => void;
}> = ({ event, onRegister, onInterested, onShare, onViewDetails }) => {
  const isLive = event.status === 'live';
  const isPast = event.endDate < new Date();
  const isUpcoming = event.startDate > new Date();
  const isOngoing = event.startDate <= new Date() && event.endDate >= new Date();

  const getTypeIcon = () => {
    switch (event.type) {
      case 'webinar':
        return <Video size={16} className="text-blue-500" />;
      case 'meetup':
        return <Users size={16} className="text-green-500" />;
      case 'launch':
        return <Star size={16} className="text-purple-500" />;
      case 'live':
        return <Video size={16} className="text-red-500" />;
      case 'workshop':
        return <Users size={16} className="text-orange-500" />;
      case 'conference':
        return <Calendar size={16} className="text-indigo-500" />;
      case 'contest':
        return <Trophy size={16} className="text-yellow-500" />;
      default:
        return <Calendar size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    if (isLive) return 'bg-red-100 text-red-800';
    if (isPast) return 'bg-gray-100 text-gray-800';
    if (isOngoing) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusLabel = () => {
    if (isLive) return 'LIVE';
    if (isPast) return 'Terminé';
    if (isOngoing) return 'En cours';
    return 'À venir';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLocationText = () => {
    if (event.location.type === 'online') {
      return 'En ligne';
    }
    return `${event.location.city}, ${event.location.country}`;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <div className="aspect-[16/9] bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
          {event.title.substring(0, 2).toUpperCase()}
        </div>
        
        <div className="absolute top-3 left-3 flex space-x-2">
          <Badge className={getStatusColor()}>
            {isLive && <Video size={12} className="mr-1" />}
            {getStatusLabel()}
          </Badge>
          
          {event.isFeatured && (
            <Badge className="bg-yellow-100 text-yellow-800">
              <Star size={12} className="mr-1" />
              À la une
            </Badge>
          )}
        </div>
        
        <div className="absolute top-3 right-3 flex space-x-1">
          <div className="flex items-center space-x-1">
            {getTypeIcon()}
            <Badge variant="outline" className="bg-white/90 text-gray-800">
              {event.type}
            </Badge>
          </div>
        </div>
        
        {isLive && event.streaming?.viewerCount && (
          <div className="absolute bottom-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
            {event.streaming.viewerCount} spectateurs
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3">
            {event.description}
          </p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(event.startDate)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>
              {formatTime(event.startDate)} - {formatTime(event.endDate)} 
              ({event.timezone})
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            {event.location.type === 'online' ? 
              <Video size={16} className="mr-2" /> :
              <MapPin size={16} className="mr-2" />
            }
            <span>{getLocationText()}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users size={16} className="mr-2" />
            <span>
              {event.currentAttendees}
              {event.maxAttendees && ` / ${event.maxAttendees}`} participants
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Avatar src={event.organizer.avatar} alt={event.organizer.name} size="sm" />
            <div>
              <p className="text-sm font-medium text-gray-900">{event.organizer.name}</p>
              {event.organizer.organization && (
                <p className="text-xs text-gray-500">{event.organizer.organization}</p>
              )}
            </div>
            {event.organizer.isVerified && (
              <CheckCircle size={16} className="text-blue-500" />
            )}
          </div>
          
          <div className="text-right">
            {event.isFree ? (
              <p className="text-lg font-bold text-green-600">Gratuit</p>
            ) : (
              <p className="text-lg font-bold text-gray-900">
                {event.price.toFixed(2)} {event.currency}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {event.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            className="flex-1"
            onClick={() => onViewDetails(event.id)}
          >
            <Eye size={16} className="mr-1" />
            Voir détails
          </Button>
          
          {isLive ? (
            <Button 
              className="flex-1 bg-red-500 hover:bg-red-600"
              onClick={() => onViewDetails(event.id)}
            >
              <Play size={16} className="mr-1" />
              Rejoindre
            </Button>
          ) : event.isRegistered ? (
            <Button variant="outline" className="flex-1 text-green-600">
              <CheckCircle size={16} className="mr-1" />
              Inscrit
            </Button>
          ) : (
            <Button 
              className="flex-1"
              onClick={() => onRegister(event.id)}
              disabled={!!(event.maxAttendees && event.currentAttendees >= event.maxAttendees)}
            >
              <Ticket size={16} className="mr-1" />
              S'inscrire
            </Button>
          )}
          
          <div className="flex space-x-1">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onInterested(event.id)}
              className={event.isInterested ? 'text-red-600' : ''}
            >
              <Heart size={16} className={event.isInterested ? 'fill-current' : ''} />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onShare(event.id)}
            >
              <Share2 size={16} />
            </Button>
            <Button size="sm" variant="outline">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function EventsPage() {
  const [events] = useState<Event[]>(mockEvents);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | Event['type']>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'live' | 'past'>('upcoming');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'date' | 'popularity'>('date');

  const handleRegister = (eventId: string) => {
    console.log('Registering for event:', eventId);
  };

  const handleInterested = (eventId: string) => {
    console.log('Toggling interest for event:', eventId);
  };

  const handleShare = (eventId: string) => {
    console.log('Sharing event:', eventId);
  };

  const handleViewDetails = (eventId: string) => {
    console.log('Viewing event details:', eventId);
  };

  const now = new Date();
  
  const filteredEvents = events
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = typeFilter === 'all' || event.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      const matchesStatus = 
        statusFilter === 'all' ||
        (statusFilter === 'upcoming' && event.startDate > now) ||
        (statusFilter === 'live' && event.status === 'live') ||
        (statusFilter === 'past' && event.endDate < now);
      
      return matchesSearch && matchesType && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'date':
          return a.startDate.getTime() - b.startDate.getTime();
        case 'popularity':
          return b.currentAttendees - a.currentAttendees;
        default:
          return 0;
      }
    });

  const categories = Array.from(new Set(events.map(e => e.category)));
  const liveEvents = events.filter(e => e.status === 'live');
  const myEvents = events.filter(e => e.isRegistered || e.isInterested);

  const typeOptions = [
    { value: 'all', label: 'Tous types' },
    { value: 'webinar', label: 'Webinaires' },
    { value: 'meetup', label: 'Meetups' },
    { value: 'launch', label: 'Lancements' },
    { value: 'live', label: 'Live' },
    { value: 'workshop', label: 'Ateliers' },
    { value: 'conference', label: 'Conférences' },
    { value: 'contest', label: 'Concours' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Calendar className="mr-3 text-blue-500" size={32} />
                Événements
              </h1>
              <p className="text-gray-600">
                Découvrez et participez aux événements de la communauté ECHOS.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filtrer
              </Button>
              <Button size="sm">
                <Plus size={16} className="mr-2" />
                Créer un événement
              </Button>
            </div>
          </div>
        </div>

        {/* Live Events Banner */}
        {liveEvents.length > 0 && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2 flex items-center">
                    <div className="w-3 h-3 bg-white rounded-full mr-2 animate-pulse"></div>
                    En direct maintenant
                  </h2>
                  <p className="opacity-90">
                    {liveEvents.length} événement(s) en cours - Rejoignez-nous en temps réel !
                  </p>
                </div>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-red-500">
                  Voir tout le direct
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Calendar className="mx-auto text-blue-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">
              {events.filter(e => e.startDate > now).length}
            </p>
            <p className="text-sm text-gray-600">À venir</p>
          </Card>
          <Card className="p-4 text-center">
            <Video className="mx-auto text-red-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{liveEvents.length}</p>
            <p className="text-sm text-gray-600">En direct</p>
          </Card>
          <Card className="p-4 text-center">
            <Ticket className="mx-auto text-green-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{myEvents.length}</p>
            <p className="text-sm text-gray-600">Mes événements</p>
          </Card>
          <Card className="p-4 text-center">
            <Users className="mx-auto text-purple-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">
              {events.reduce((sum, e) => sum + e.currentAttendees, 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Participants</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher des événements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Toutes catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="upcoming">À venir</option>
              <option value="live">En direct</option>
              <option value="past">Passés</option>
              <option value="all">Tous</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">Date</option>
              <option value="popularity">Popularité</option>
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <Card className="p-12 text-center">
            <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun événement trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Aucun événement ne correspond à vos critères de recherche.
            </p>
            <Button>
              <Plus size={16} className="mr-2" />
              Créer le premier événement
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
                onInterested={handleInterested}
                onShare={handleShare}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-3">
            <Star className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Créez votre événement
              </h3>
              <p className="text-blue-700 mb-4">
                Organisez vos propres événements et rassemblons la communauté ECHOS.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start">
                  <Plus size={16} className="mr-2" />
                  Nouvel événement
                </Button>
                <Button variant="outline" className="justify-start">
                  <Video size={16} className="mr-2" />
                  Webinaire
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users size={16} className="mr-2" />
                  Meetup
                </Button>
                <Button variant="outline" className="justify-start">
                  <Calendar size={16} className="mr-2" />
                  Planning
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}