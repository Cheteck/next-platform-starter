'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  MapPin, 
  Star, 
  Users, 
  ShoppingBag,
  X,
  ChevronDown,
  Calendar,
  TrendingUp,
  Eye
} from 'lucide-react';
import { Card, Button, Badge as UIBadge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { 
  users, 
  posts, 
  products, 
  spaces
} from '@/lib/mock-data';
import { SearchFilters } from '@/types';

interface SearchResult {
  id: string;
  type: 'user' | 'post' | 'product' | 'space';
  title: string;
  description: string;
  image?: string;
  avatar?: string;
  metadata?: {
    likes?: number;
    price?: number;
    rating?: number;
    followers?: number;
    category?: string;
    createdAt?: Date;
    location?: string;
    condition?: string;
  };
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeFilterTab, setActiveFilterTab] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [recentSearches] = useState([
    'iPhone 15 Pro',
    'Tech Paradise',
    'Mode féminine',
    'Restaurant sushi',
    'Mobilier vintage'
  ]);
  const [trending] = useState([
    'Smartphone',
    'Laptop gaming',
    'Mode',
    'Maison',
    'Auto',
    'Sport',
    'Musique',
    'Cuisine'
  ]);

  const categories = [
    'Tous',
    'Electronique',
    'Mode',
    'Maison',
    'Auto',
    'Sport',
    'Musique',
    'Cuisine',
    'Livres',
    'Jouets'
  ];

  const conditions = [
    'Neuf',
    'Comme neuf',
    'Bon état',
    'Usé'
  ];

  useEffect(() => {
    if (query.trim()) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [query, filters]);

  const performSearch = () => {
    const searchResults: SearchResult[] = [];
    
    // Recherche dans les utilisateurs
    if (activeFilterTab === 'all' || activeFilterTab === 'users') {
      const userResults = users
        .filter(user => 
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase()) ||
          (user.bio && user.bio.toLowerCase().includes(query.toLowerCase()))
        )
        .map(user => ({
          id: user.id,
          type: 'user' as const,
          title: user.name,
          description: user.email,
          avatar: user.avatar,
          metadata: {
            followers: user.followers,
            category: user.role
          }
        }));
      searchResults.push(...userResults);
    }

    // Recherche dans les produits
    if (activeFilterTab === 'all' || activeFilterTab === 'products') {
      const productResults = products
        .filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        )
        .map(product => ({
          id: product.id,
          type: 'product' as const,
          title: product.title,
          description: product.description,
          image: product.images[0],
          metadata: {
            price: product.price,
            rating: product.rating,
            category: product.category,
            condition: product.condition
          }
        }));
      searchResults.push(...productResults);
    }

    // Recherche dans les spaces
    if (activeFilterTab === 'all' || activeFilterTab === 'spaces') {
      const spaceResults = spaces
        .filter(space => 
          space.name.toLowerCase().includes(query.toLowerCase()) ||
          space.description.toLowerCase().includes(query.toLowerCase()) ||
          space.category.toLowerCase().includes(query.toLowerCase())
        )
        .map(space => ({
          id: space.id,
          type: 'space' as const,
          title: space.name,
          description: space.description,
          image: space.logo,
          metadata: {
            followers: space.followers,
            rating: space.rating,
            category: space.category,
            location: space.address
          }
        }));
      searchResults.push(...spaceResults);
    }

    // Recherche dans les posts
    if (activeFilterTab === 'all' || activeFilterTab === 'posts') {
      const postResults = posts
        .filter(post => 
          post.content.toLowerCase().includes(query.toLowerCase())
        )
        .map(post => ({
          id: post.id,
          type: 'post' as const,
          title: `Post de ${users.find(u => u.id === post.userId)?.name || 'Utilisateur'}`,
          description: post.content,
          metadata: {
            likes: post.likes,
            createdAt: post.createdAt
          }
        }));
      searchResults.push(...postResults);
    }

    // Appliquer les filtres
    let filteredResults = searchResults;

    if (filters.category && filters.category !== 'Tous') {
      filteredResults = filteredResults.filter(result => 
        result.metadata?.category === filters.category
      );
    }

    if (filters.priceRange) {
      filteredResults = filteredResults.filter(result => {
        if (result.type === 'product' && result.metadata?.price) {
          return result.metadata.price >= filters.priceRange!.min && 
                 result.metadata.price <= filters.priceRange!.max;
        }
        return true;
      });
    }

    if (filters.condition && filters.condition.length > 0) {
      filteredResults = filteredResults.filter(result => {
        if (result.metadata?.condition) {
          return filters.condition!.includes(result.metadata.condition);
        }
        return true;
      });
    }

    if (filters.rating) {
      filteredResults = filteredResults.filter(result => {
        if (result.metadata?.rating) {
          return result.metadata.rating >= filters.rating!;
        }
        return true;
      });
    }

    // Tri
    if (filters.sortBy) {
      filteredResults.sort((a, b) => {
        switch (filters.sortBy) {
          case 'price_asc':
            return (a.metadata?.price || 0) - (b.metadata?.price || 0);
          case 'price_desc':
            return (b.metadata?.price || 0) - (a.metadata?.price || 0);
          case 'rating':
            return (b.metadata?.rating || 0) - (a.metadata?.rating || 0);
          case 'newest':
            return new Date(b.metadata?.createdAt || 0).getTime() - new Date(a.metadata?.createdAt || 0).getTime();
          case 'popular':
            return (b.metadata?.followers || b.metadata?.likes || 0) - (a.metadata?.followers || a.metadata?.likes || 0);
          default:
            return 0;
        }
      });
    }

    setResults(filteredResults);
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
  };

  const handleTrendingSearch = (search: string) => {
    setQuery(search);
  };

  const clearFilters = () => {
    setFilters({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-5 h-5 text-blue-600" />;
      case 'product': return <ShoppingBag className="w-5 h-5 text-green-600" />;
      case 'space': return <MapPin className="w-5 h-5 text-purple-600" />;
      case 'post': return <TrendingUp className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-800';
      case 'product': return 'bg-green-100 text-green-800';
      case 'space': return 'bg-purple-100 text-purple-800';
      case 'post': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher utilisateurs, produits, spaces..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <Button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtres
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mt-4 overflow-x-auto">
            {[
              { key: 'all', label: 'Tout', icon: Search },
              { key: 'users', label: 'Utilisateurs', icon: Users },
              { key: 'products', label: 'Produits', icon: ShoppingBag },
              { key: 'spaces', label: 'Spaces', icon: MapPin },
              { key: 'posts', label: 'Posts', icon: TrendingUp }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilterTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  activeFilterTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          {isFilterOpen && (
            <div className="w-80 bg-white rounded-lg shadow-sm p-6 h-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filtres</h3>
                <Button 
                  onClick={clearFilters}
                  variant="ghost" 
                  size="sm"
                >
                  Effacer tout
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Catégorie</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => setFilters(prev => ({ 
                          ...prev, 
                          category: e.target.value 
                        }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Prix</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange?.min || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: { 
                        min: Number(e.target.value) || 0, 
                        max: prev.priceRange?.max || 999999 
                      } 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange?.max || ''}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      priceRange: { 
                        min: prev.priceRange?.min || 0, 
                        max: Number(e.target.value) || 999999 
                      } 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">État</label>
                <div className="space-y-2">
                  {conditions.map(condition => (
                    <label key={condition} className="flex items-center">
                      <input
                        type="checkbox"
                        value={condition}
                        checked={filters.condition?.includes(condition) || false}
                        onChange={(e) => {
                          const current = filters.condition || [];
                          const updated = e.target.checked
                            ? [...current, condition]
                            : current.filter(c => c !== condition);
                          setFilters(prev => ({ ...prev, condition: updated }));
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Note minimale: {filters.rating || 0}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={filters.rating || 0}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    rating: Number(e.target.value) 
                  }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0</span>
                  <span>5</span>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Trier par</label>
                <select
                  value={filters.sortBy || ''}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    sortBy: e.target.value as any 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Pertinence</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                  <option value="newest">Plus récents</option>
                  <option value="popular">Plus populaires</option>
                </select>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {!query ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Searches */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Recherches récentes
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearch(search)}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Trending Searches */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Recherches tendances
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {trending.map((trend, index) => (
                      <button
                        key={index}
                        onClick={() => handleTrendingSearch(trend)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-full text-sm font-medium transition-colors"
                      >
                        #{trend}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <div>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Résultats pour "{query}"
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Results */}
                {results.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Aucun résultat trouvé
                    </h3>
                    <p className="text-gray-600">
                      Essayez de modifier vos termes de recherche ou vos filtres
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {results.map(result => (
                      <Card key={result.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex gap-4">
                          {/* Image/Avatar */}
                          <div className="flex-shrink-0">
                            {result.type === 'user' && result.avatar ? (
                              <Avatar src={result.avatar} alt={result.title} className="w-16 h-16" />
                            ) : result.image ? (
                              <img 
                                src={result.image} 
                                alt={result.title}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                {getResultIcon(result.type)}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-gray-900 truncate">
                                {result.title}
                              </h3>
                              <UIBadge className={getTypeColor(result.type)}>
                                {result.type}
                              </UIBadge>
                            </div>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {result.description}
                            </p>
                            
                            {/* Metadata */}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {result.metadata?.price && (
                                <span className="font-medium text-green-600">
                                  {formatPrice(result.metadata.price)}
                                </span>
                              )}
                              {result.metadata?.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{result.metadata.rating}</span>
                                </div>
                              )}
                              {result.metadata?.followers && (
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  {result.metadata.followers.toLocaleString()}
                                </span>
                              )}
                              {result.metadata?.likes && (
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {result.metadata.likes}
                                </span>
                              )}
                              {result.metadata?.createdAt && (
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(result.metadata.createdAt)}
                                </span>
                              )}
                              {result.metadata?.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {result.metadata.location}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex-shrink-0">
                            <Button variant="outline" size="sm">
                              Voir
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;