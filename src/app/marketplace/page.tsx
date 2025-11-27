// Page Marketplace - Produits et boutique en ligne
'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Select } from '@/components/ui';
import { Search, Star, Heart, ShoppingCart, Filter, Grid, List, MapPin } from 'lucide-react';
import { products, spaces, getCurrentUser } from '@/lib/mock-data';

const currentUser = getCurrentUser();

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');

  // Filtrer et trier les produits
  const filteredProducts = products
    .filter(product => product.isActive)
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesCondition = !selectedCondition || product.condition === selectedCondition;
      
      let matchesPrice = true;
      if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        matchesPrice = product.price >= min && (max ? product.price <= max : true);
      }
      
      return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.views - a.views;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const categories = ['Mode Femme', 'Électronique', 'Restauration', 'Maison', 'Sport', 'Livres'];
  const conditions = ['Neuf', 'Comme neuf', 'Bon état', 'Usé'];

  const handleAddToCart = (productId: string) => {
    console.log('Add to cart:', productId);
  };

  const handleToggleFavorite = (productId: string) => {
    console.log('Toggle favorite:', productId);
  };

  const handleViewProduct = (productId: string) => {
    console.log('View product:', productId);
  };

  return (
    <Layout 
      user={currentUser} 
      showSidebar={true} 
      showHeader={true}
      activeItem="/marketplace"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-gray-600">Achetez et vendez dans les meilleurs spaces d'ECHOS</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
              <Button>
                <ShoppingCart className="h-4 w-4 mr-2" />
                Panier (0)
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="py-4">
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher des produits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>

                {/* Filters Row */}
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Category */}
                  <div className="lg:w-48">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Toutes les catégories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Condition */}
                  <div className="lg:w-48">
                    <select
                      value={selectedCondition}
                      onChange={(e) => setSelectedCondition(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Toutes conditions</option>
                      {conditions.map(condition => (
                        <option key={condition} value={condition}>{condition}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="lg:w-48">
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Tous les prix</option>
                      <option value="0-50">0€ - 50€</option>
                      <option value="50-100">50€ - 100€</option>
                      <option value="100-500">100€ - 500€</option>
                      <option value="500-1000000">500€+</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <div className="lg:w-48">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="recent">Plus récents</option>
                      <option value="price-low">Prix croissant</option>
                      <option value="price-high">Prix décroissant</option>
                      <option value="rating">Mieux notés</option>
                      <option value="popular">Plus populaires</option>
                    </select>
                  </div>
                </div>

                {/* Active Filters */}
                {(searchTerm || selectedCategory || selectedCondition || priceRange) && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Filtres actifs:</span>
                    {searchTerm && (
                      <Badge variant="default">
                        "{searchTerm}"
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge variant="default">
                        {selectedCategory}
                        <button 
                          onClick={() => setSelectedCategory('')}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    {selectedCondition && (
                      <Badge variant="default">
                        {selectedCondition}
                        <button 
                          onClick={() => setSelectedCondition('')}
                          className="ml-1 hover:text-red-500"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('');
                        setSelectedCondition('');
                        setPriceRange('');
                      }}
                    >
                      Effacer tout
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          : "space-y-4"
        }>
          {filteredProducts.map((product) => {
            const space = spaces.find(s => s.id === product.spaceId);
            
            return viewMode === 'grid' ? (
              // Grid View
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleToggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                  >
                    <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                  </button>
                  <Badge 
                    variant={product.condition === 'Neuf' ? 'success' : 'warning'}
                    className="absolute top-3 left-3"
                  >
                    {product.condition}
                  </Badge>
                </div>

                <CardContent className="p-4">
                  {/* Space Info */}
                  {space && (
                    <div className="flex items-center space-x-2 mb-2">
                      <img src={space.logo} alt={space.name} className="h-4 w-4 rounded" />
                      <span className="text-xs text-gray-600">{space.name}</span>
                    </div>
                  )}

                  {/* Product Title */}
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">{product.price}€</span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(product.id)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      {product.stock > 0 ? 'Ajouter' : 'Rupture'}
                    </Button>
                  </div>

                  {/* Stock */}
                  <p className="text-xs text-gray-500 mt-1">
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture de stock'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              // List View
              <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      {/* Space and Category */}
                      <div className="flex items-center space-x-2 mb-1">
                        {space && (
                          <>
                            <img src={space.logo} alt={space.name} className="h-4 w-4 rounded" />
                            <span className="text-xs text-gray-600">{space.name}</span>
                            <span className="text-gray-400">•</span>
                          </>
                        )}
                        <Badge variant="default" className="text-xs">{product.category}</Badge>
                        <Badge variant={product.condition === 'Neuf' ? 'success' : 'warning'} className="text-xs">
                          {product.condition}
                        </Badge>
                      </div>

                      {/* Title and Description */}
                      <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{product.description}</p>

                      {/* Rating and Stats */}
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span>({product.reviews})</span>
                        </div>
                        <span>{product.views} vues</span>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl font-bold text-green-600">{product.price}€</span>
                          <span className="text-sm text-gray-500">
                            {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleFavorite(product.id)}
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product.id)}
                            disabled={product.stock === 0}
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            {product.stock > 0 ? 'Ajouter' : 'Rupture'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600 mb-4">
                Essayez de modifier vos critères de recherche ou parcourez les catégories disponibles.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setSelectedCondition('');
                  setPriceRange('');
                }}
                variant="outline"
              >
                Effacer les filtres
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center py-8">
            <Button variant="outline">
              Charger plus de produits
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
              const count = products.filter(p => p.category === category).length;
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

        {/* Price Ranges */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Gammes de prix</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Moins de 50€', range: '0-50' },
              { label: '50€ - 100€', range: '50-100' },
              { label: '100€ - 500€', range: '100-500' },
              { label: 'Plus de 500€', range: '500-1000000' },
            ].map((range) => (
              <button
                key={range.range}
                onClick={() => setPriceRange(priceRange === range.range ? '' : range.range)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  priceRange === range.range
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}