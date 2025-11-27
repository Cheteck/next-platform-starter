// Page Spaces - Liste des boutiques et entreprises
'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Avatar, Button, Badge, Select, Input } from '@/components/ui';
import { Search, MapPin, Star, Plus, Filter } from 'lucide-react';
import { spaces, getCurrentUser } from '@/lib/mock-data';

const currentUser = getCurrentUser();

export default function SpacesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Filtrer et trier les spaces
  const filteredSpaces = spaces
    .filter(space => space.isActive)
    .filter(space => {
      const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          space.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || space.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'followers':
          return b.followers - a.followers;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const categories = ['Restaurant', 'Shop', 'Service', 'Entertainment', 'Fashion', 'Tech'];

  const handleFollowSpace = (spaceId: string) => {
    console.log('Follow space:', spaceId);
  };

  const handleVisitSpace = (spaceId: string) => {
    console.log('Visit space:', spaceId);
  };

  return (
    <Layout 
      user={currentUser} 
      showSidebar={true} 
      showHeader={true}
      activeItem="/spaces"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Spaces</h1>
              <p className="text-gray-600">Découvrez les boutiques et entreprises sur ECHOS</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Créer un Space
            </Button>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="py-4">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher des spaces..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:w-48">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Toutes les catégories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Sort */}
                <div className="lg:w-48">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="recent">Plus récents</option>
                    <option value="followers">Plus populaires</option>
                    <option value="rating">Mieux notés</option>
                    <option value="name">Ordre alphabétique</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <Card key={space.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              {/* Space Banner */}
              <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                <img
                  src={space.banner}
                  alt={space.name}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute top-4 right-4">
                  {space.verified && (
                    <Badge variant="info" className="bg-white text-blue-600">
                      ✓ Vérifié
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center space-x-3">
                    <Avatar 
                      src={space.logo} 
                      alt={space.name} 
                      className="border-2 border-white h-16 w-16"
                    />
                  </div>
                </div>
              </div>

              <CardContent className="pt-8">
                {/* Space Info */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{space.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{space.description}</p>
                </div>

                {/* Category & Location */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="default">{space.category}</Badge>
                    {space.address && (
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="truncate">{space.address.split(',')[0]}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{space.rating}</span>
                    </span>
                    <span>{space.followers.toLocaleString()} abonnés</span>
                    <span>{space.reviews} avis</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleVisitSpace(space.id)}
                    className="flex-1"
                  >
                    Visiter
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleFollowSpace(space.id)}
                  >
                    Suivre
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredSpaces.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun Space trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou parcourez toutes les catégories.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
                variant="outline"
              >
                Effacer les filtres
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredSpaces.length > 0 && (
          <div className="text-center py-8">
            <Button variant="outline">
              Charger plus de Spaces
            </Button>
          </div>
        )}
      </div>

      {/* Categories Sidebar */}
      <div className="hidden xl:block w-64 ml-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Catégories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map((category) => {
              const count = spaces.filter(s => s.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>{category}</span>
                    <span className="text-gray-500">({count})</span>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Featured Spaces */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Spaces en vedette</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {spaces
              .filter(s => s.verified)
              .slice(0, 3)
              .map((space) => (
                <div key={space.id} className="flex items-center space-x-3">
                  <Avatar src={space.logo} alt={space.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{space.name}</h4>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{space.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}