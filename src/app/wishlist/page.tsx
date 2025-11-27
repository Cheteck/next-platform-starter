'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  Share2, 
  Trash2, 
  ShoppingCart, 
  Bell, 
  Filter,
  Grid3X3,
  List,
  Search,
  Star,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface WishlistItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  spaceId: string;
  spaceName: string;
  rating?: number;
  reviews?: number;
  condition: 'Neuf' | 'Comme neuf' | 'Bon état' | 'Usé';
  addedAt: Date;
  notes?: string;
  priceAlert?: {
    enabled: boolean;
    targetPrice?: number;
  };
}

interface WishlistCategory {
  id: string;
  name: string;
  items: WishlistItem[];
}

// Mock data
const mockWishlistItems: WishlistItem[] = [
  {
    id: 'wl-1',
    productId: 'prod-1',
    title: 'iPhone 15 Pro Max 256GB Titane',
    price: 1199,
    originalPrice: 1299,
    image: '/api/placeholder/200/200',
    spaceId: 'space-1',
    spaceName: 'Apple Store',
    rating: 4.8,
    reviews: 1245,
    condition: 'Neuf',
    addedAt: new Date('2024-01-15'),
    notes: 'Attendre les soldes pour meilleur prix',
    priceAlert: {
      enabled: true,
      targetPrice: 1099
    }
  },
  {
    id: 'wl-2',
    productId: 'prod-2',
    title: 'MacBook Pro M3 16" 512GB',
    price: 2499,
    image: '/api/placeholder/200/200',
    spaceId: 'space-1',
    spaceName: 'Apple Store',
    rating: 4.9,
    reviews: 892,
    condition: 'Neuf',
    addedAt: new Date('2024-01-12'),
    notes: 'Pour le travail professionnel',
    priceAlert: {
      enabled: true,
      targetPrice: 2299
    }
  },
  {
    id: 'wl-3',
    productId: 'prod-3',
    title: 'AirPods Pro (2ème génération)',
    price: 279,
    image: '/api/placeholder/200/200',
    spaceId: 'space-2',
    spaceName: 'Audio Premium',
    rating: 4.7,
    reviews: 2156,
    condition: 'Neuf',
    addedAt: new Date('2024-01-10'),
    notes: '',
    priceAlert: {
      enabled: false
    }
  },
  {
    id: 'wl-4',
    productId: 'prod-4',
    title: 'iPad Pro 12.9" 256GB Wi-Fi',
    price: 1399,
    originalPrice: 1499,
    image: '/api/placeholder/200/200',
    spaceId: 'space-1',
    spaceName: 'Apple Store',
    rating: 4.6,
    reviews: 567,
    condition: 'Neuf',
    addedAt: new Date('2024-01-08'),
    notes: 'Cadeau pour anniversaire',
    priceAlert: {
      enabled: true,
      targetPrice: 1299
    }
  },
  {
    id: 'wl-5',
    productId: 'prod-5',
    title: 'Apple Watch Ultra 2',
    price: 899,
    image: '/api/placeholder/200/200',
    spaceId: 'space-3',
    spaceName: 'Sport & Tech',
    rating: 4.5,
    reviews: 423,
    condition: 'Neuf',
    addedAt: new Date('2024-01-05'),
    notes: '',
    priceAlert: {
      enabled: false
    }
  }
];

// Components
const ProductCard: React.FC<{ 
  item: WishlistItem; 
  viewMode: 'grid' | 'list';
  onRemove: (id: string) => void;
  onAddToCart: (item: WishlistItem) => void;
  onTogglePriceAlert: (id: string) => void;
}> = ({ item, viewMode, onRemove, onAddToCart, onTogglePriceAlert }) => {
  const hasDiscount = item.originalPrice && item.originalPrice > item.price;
  const discountPercent = hasDiscount ? 
    Math.round(((item.originalPrice! - item.price) / item.originalPrice!) * 100) : 0;

  if (viewMode === 'list') {
    return (
      <Card className="p-4 hover:shadow-lg transition-shadow">
        <div className="flex space-x-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-medium">
            {item.title.substring(0, 2).toUpperCase()}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.spaceName}</p>
                <div className="flex items-center space-x-2 mt-1">
                  {item.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.rating}</span>
                    </div>
                  )}
                  {item.reviews && (
                    <span className="text-sm text-gray-500">
                      ({item.reviews} avis)
                    </span>
                  )}
                </div>
                {item.notes && (
                  <p className="text-sm text-blue-600 mt-1">
                    📝 {item.notes}
                  </p>
                )}
              </div>
              
              <div className="text-right flex-shrink-0 ml-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">
                    {item.price.toFixed(2)} €
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-gray-500 line-through">
                      {item.originalPrice!.toFixed(2)} €
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <Badge className="bg-red-100 text-red-800 text-xs">
                    -{discountPercent}%
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">
                  Ajouté le {item.addedAt.toLocaleDateString('fr-FR')}
                </span>
                {item.priceAlert?.enabled && item.priceAlert.targetPrice && (
                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                    🔔 Alerte prix: {item.priceAlert.targetPrice}€
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => onAddToCart(item)}
                  className="flex items-center space-x-1"
                >
                  <ShoppingCart size={16} />
                  <span>Ajouter</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onTogglePriceAlert(item.id)}
                  className="flex items-center space-x-1"
                >
                  <Bell size={16} />
                  <span>{item.priceAlert?.enabled ? 'Désactiver' : 'Alerte'}</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center space-x-1"
                >
                  <Share2 size={16} />
                  <span>Partager</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemove(item.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </Button>
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
      <div className="relative mb-3">
        <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium text-2xl">
          {item.title.substring(0, 2).toUpperCase()}
        </div>
        {hasDiscount && (
          <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
            -{discountPercent}%
          </Badge>
        )}
        <button
          onClick={() => onRemove(item.id)}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
        >
          <Trash2 size={14} className="text-red-600" />
        </button>
      </div>
      
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-600">{item.spaceName}</p>
        
        <div className="flex items-center space-x-1">
          {item.rating && (
            <>
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600">{item.rating}</span>
            </>
          )}
          {item.reviews && (
            <span className="text-xs text-gray-400">({item.reviews})</span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-gray-900">
            {item.price.toFixed(2)} €
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              {item.originalPrice!.toFixed(2)} €
            </span>
          )}
        </div>
        
        {item.priceAlert?.enabled && (
          <Badge className="bg-yellow-100 text-yellow-800 text-xs w-full">
            🔔 Alerte prix activée
          </Badge>
        )}
        
        <div className="flex space-x-1 mt-3">
          <Button
            size="sm"
            className="flex-1 text-xs"
            onClick={() => onAddToCart(item)}
          >
            <ShoppingCart size={12} className="mr-1" />
            Ajouter
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs"
            onClick={() => onTogglePriceAlert(item.id)}
          >
            <Bell size={12} />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function WishlistPage() {
  const [items] = useState<WishlistItem[]>(mockWishlistItems);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price_low' | 'price_high' | 'rating'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'with_alert' | 'discounted' | 'new_arrivals'>('all');

  const handleRemoveItem = (id: string) => {
    // Implementation for removing item
    console.log('Removing item:', id);
  };

  const handleAddToCart = (item: WishlistItem) => {
    // Implementation for adding to cart
    console.log('Adding to cart:', item.title);
  };

  const handleTogglePriceAlert = (id: string) => {
    // Implementation for toggling price alert
    console.log('Toggling price alert for:', id);
  };

  const filteredAndSortedItems = items
    .filter(item => {
      switch (filterBy) {
        case 'with_alert':
          return item.priceAlert?.enabled;
        case 'discounted':
          return item.originalPrice && item.originalPrice > item.price;
        case 'new_arrivals':
          const daysSinceAdded = (Date.now() - item.addedAt.getTime()) / (1000 * 60 * 60 * 24);
          return daysSinceAdded <= 7;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.addedAt.getTime() - a.addedAt.getTime();
        case 'oldest':
          return a.addedAt.getTime() - b.addedAt.getTime();
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

  const stats = {
    totalItems: items.length,
    totalValue: items.reduce((sum, item) => sum + item.price, 0),
    priceAlerts: items.filter(item => item.priceAlert?.enabled).length,
    discountedItems: items.filter(item => item.originalPrice && item.originalPrice > item.price).length,
  };

  const filterOptions = [
    { value: 'all', label: 'Tous les produits', count: items.length },
    { value: 'with_alert', label: 'Avec alerte prix', count: stats.priceAlerts },
    { value: 'discounted', label: 'En promotion', count: stats.discountedItems },
    { value: 'new_arrivals', label: 'Nouveautés', count: 2 },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Heart className="mr-3 text-red-500" size={32} />
                Ma Wishlist
              </h1>
              <p className="text-gray-600">
                Gardez un œil sur vos produits préférés et ne manquez aucune promotion.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Partager
              </Button>
              <Button variant="outline" size="sm">
                <ShoppingCart size={16} className="mr-2" />
                Tout ajouter au panier
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Heart className="mx-auto text-red-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
            <p className="text-sm text-gray-600">Produits</p>
          </Card>
          <Card className="p-4 text-center">
            <TrendingUp className="mx-auto text-green-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{stats.totalValue.toFixed(0)}€</p>
            <p className="text-sm text-gray-600">Valeur totale</p>
          </Card>
          <Card className="p-4 text-center">
            <Bell className="mx-auto text-yellow-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{stats.priceAlerts}</p>
            <p className="text-sm text-gray-600">Alertes actives</p>
          </Card>
          <Card className="p-4 text-center">
            <Star className="mx-auto text-purple-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{stats.discountedItems}</p>
            <p className="text-sm text-gray-600">En promotion</p>
          </Card>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2">
              {filterOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => setFilterBy(option.value as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterBy === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
              <option value="price_low">Prix croissant</option>
              <option value="price_high">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
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

        {/* Content */}
        {filteredAndSortedItems.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucun produit dans votre wishlist
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez à sauvegarder vos produits préférés en cliquant sur l'icône ❤️.
            </p>
            <Button>
              Découvrir les produits
            </Button>
          </Card>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
              : 'space-y-4'
          }>
            {filteredAndSortedItems.map((item) => (
              <ProductCard
                key={item.id}
                item={item}
                viewMode={viewMode}
                onRemove={handleRemoveItem}
                onAddToCart={handleAddToCart}
                onTogglePriceAlert={handleTogglePriceAlert}
              />
            ))}
          </div>
        )}

        {/* Tips */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Conseils pour votre wishlist
              </h3>
              <ul className="text-blue-700 space-y-1 text-sm">
                <li>• Activez les alertes prix pour être notifié des baisses</li>
                <li>• Partagez votre wishlist avec vos proches pour les occasions spéciales</li>
                <li>• Vos wishlists sont synchronisées sur tous vos appareils</li>
                <li>• Recevez des recommandations basées sur vos préférences</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}