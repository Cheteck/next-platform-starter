'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertCircle,
  Download,
  Star,
  MessageCircle,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Avatar } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  spaceId: string;
  image: string;
  variant?: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Mock data
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    items: [
      {
        productId: 'prod-1',
        title: 'iPhone 15 Pro Max 256GB',
        price: 1199,
        quantity: 1,
        spaceId: 'space-1',
        image: '/api/placeholder/80/80'
      }
    ],
    total: 1199,
    status: 'shipped',
    paymentStatus: 'paid',
    trackingNumber: 'TR123456789',
    shippingAddress: {
      fullName: 'Jean Dupont',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16')
  },
  {
    id: 'ORD-002',
    items: [
      {
        productId: 'prod-2',
        title: 'MacBook Pro M3 16"',
        price: 2499,
        quantity: 1,
        spaceId: 'space-2',
        image: '/api/placeholder/80/80'
      },
      {
        productId: 'prod-3',
        title: 'Souris Magic Mouse',
        price: 79,
        quantity: 1,
        spaceId: 'space-2',
        image: '/api/placeholder/80/80'
      }
    ],
    total: 2578,
    status: 'delivered',
    paymentStatus: 'paid',
    shippingAddress: {
      fullName: 'Jean Dupont',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-12')
  },
  {
    id: 'ORD-003',
    items: [
      {
        productId: 'prod-4',
        title: 'T-shirt Nike Dri-FIT',
        price: 29.99,
        quantity: 2,
        spaceId: 'space-3',
        image: '/api/placeholder/80/80'
      }
    ],
    total: 59.98,
    status: 'pending',
    paymentStatus: 'paid',
    shippingAddress: {
      fullName: 'Jean Dupont',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      country: 'France'
    },
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  }
];

// Components
const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const statusConfig = {
    pending: { label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { label: 'Confirmée', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
    processing: { label: 'En préparation', color: 'bg-purple-100 text-purple-800', icon: Package },
    shipped: { label: 'Expédiée', color: 'bg-indigo-100 text-indigo-800', icon: Truck },
    delivered: { label: 'Livrée', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    cancelled: { label: 'Annulée', color: 'bg-red-100 text-red-800', icon: XCircle },
    returned: { label: 'Retournée', color: 'bg-gray-100 text-gray-800', icon: RefreshCw }
  };

  const config = statusConfig[status];
  const IconComponent = config.icon;

  return (
    <Badge className={`${config.color} flex items-center gap-1`}>
      <IconComponent size={14} />
      {config.label}
    </Badge>
  );
};

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-900">Commande {order.id}</h3>
          <p className="text-sm text-gray-500">
            {order.createdAt.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="text-right">
          <StatusBadge status={order.status} />
          <p className="text-lg font-bold text-gray-900 mt-2">
            {order.total.toFixed(2)} €
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                {item.title.substring(0, 2)}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.title}</h4>
              <p className="text-sm text-gray-500">
                Quantité: {item.quantity} × {item.price.toFixed(2)} €
              </p>
            </div>
          </div>
        ))}
      </div>

      {order.trackingNumber && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-700">
            <Truck size={16} />
            <span className="text-sm font-medium">Suivi:</span>
            <span className="font-mono text-sm">{order.trackingNumber}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Masquer' : 'Voir'} détails
        </Button>
        
        {order.status === 'delivered' && (
          <Button variant="outline" size="sm">
            <Star size={16} className="mr-1" />
            Laisser un avis
          </Button>
        )}
        
        {['pending', 'confirmed', 'processing'].includes(order.status) && (
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            Annuler
          </Button>
        )}
        
        <Button variant="outline" size="sm">
          <MessageCircle size={16} className="mr-1" />
          Contacter le vendeur
        </Button>
        
        <Button variant="outline" size="sm">
          <Download size={16} className="mr-1" />
          Facture
        </Button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t space-y-3">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Adresse de livraison</h4>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.fullName}<br />
              {order.shippingAddress.address}<br />
              {order.shippingAddress.postalCode} {order.shippingAddress.city}<br />
              {order.shippingAddress.country}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Résumé</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{(order.total * 0.83).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>TVA (20%):</span>
                <span>{(order.total * 0.17).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>{order.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<'all' | Order['status']>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'total'>('newest');

  const filteredOrders = orders
    .filter(order => statusFilter === 'all' || order.status === statusFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'total':
          return b.total - a.total;
        default:
          return 0;
      }
    });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  };

  const statusOptions = [
    { value: 'all', label: 'Toutes les commandes' },
    { value: 'pending', label: 'En attente' },
    { value: 'confirmed', label: 'Confirmées' },
    { value: 'processing', label: 'En préparation' },
    { value: 'shipped', label: 'Expédiées' },
    { value: 'delivered', label: 'Livrées' },
    { value: 'cancelled', label: 'Annulées' },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Commandes</h1>
          <p className="text-gray-600">
            Suivez et gérez toutes vos commandes en un seul endroit.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Package className="mx-auto text-blue-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </Card>
          <Card className="p-4 text-center">
            <Clock className="mx-auto text-yellow-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
            <p className="text-sm text-gray-600">En attente</p>
          </Card>
          <Card className="p-4 text-center">
            <Truck className="mx-auto text-indigo-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{orderStats.shipped}</p>
            <p className="text-sm text-gray-600">Expédiées</p>
          </Card>
          <Card className="p-4 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-2" size={24} />
            <p className="text-2xl font-bold text-gray-900">{orderStats.delivered}</p>
            <p className="text-sm text-gray-600">Livrées</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Plus récentes</option>
              <option value="oldest">Plus anciennes</option>
              <option value="total">Montant décroissant</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Aucune commande trouvée
            </h3>
            <p className="text-gray-600 mb-6">
              Vous n'avez pas encore de commandes correspondant aux filtres sélectionnés.
            </p>
            <Button>
              Parcourir les produits
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8 p-6 bg-blue-50">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Besoin d'aide avec vos commandes ?
              </h3>
              <p className="text-blue-700 mb-4">
                Notre équipe support est disponible 24h/24 et 7j/7 pour vous accompagner.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  Contacter le support
                </Button>
                <Button variant="outline" size="sm">
                  Centre d'aide
                </Button>
                <Button variant="outline" size="sm">
                  Politique de retour
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}