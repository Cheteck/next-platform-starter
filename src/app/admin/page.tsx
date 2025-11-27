// Page Dashboard Admin Plateforme - Gestion globale ECHOS
'use client';

import React, { useState } from 'react';
import { Layout, AdminHeader, AdminSidebar } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, Avatar, ProgressBar } from '@/components/ui';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Store, 
  DollarSign, 
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MessageCircle,
  Flag,
  Settings,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';
import { 
  users, 
  spaces, 
  products, 
  platformStats,
  getCurrentUser 
} from '@/lib/mock-data';

const currentUser = getCurrentUser();

// Données pour les graphiques
const userGrowthData = [
  { month: 'Jan', users: 12000, spaces: 2100, products: 8500 },
  { month: 'Fév', users: 13500, spaces: 2350, products: 9200 },
  { month: 'Mar', users: 14800, spaces: 2580, products: 9800 },
  { month: 'Avr', users: 16200, spaces: 2720, products: 10400 },
  { month: 'Mai', users: 18000, spaces: 2890, products: 11200 },
  { month: 'Jun', users: 19500, spaces: 3050, products: 12000 },
];

const revenueData = [
  { month: 'Jan', revenue: 450000, transactions: 2300 },
  { month: 'Fév', revenue: 520000, transactions: 2800 },
  { month: 'Mar', revenue: 580000, transactions: 3200 },
  { month: 'Avr', revenue: 640000, transactions: 3600 },
  { month: 'Mai', revenue: 720000, transactions: 4100 },
  { month: 'Jun', revenue: 810000, transactions: 4500 },
];

const categoryData = platformStats.topCategories.map(cat => ({
  name: cat.name,
  value: cat.count,
  growth: cat.growth,
  color: cat.name === 'Fashion' ? '#3B82F6' :
         cat.name === 'Tech' ? '#10B981' :
         cat.name === 'Restaurant' ? '#F59E0B' :
         cat.name === 'Shop' ? '#EF4444' : '#8B5CF6'
}));

export default function PlatformAdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('6months');

  // Calculs des stats en temps réel
  const activeUsersCount = users.filter(u => u.role !== 'PLATFORM_ADMIN').length;
  const verifiedSpacesCount = spaces.filter(s => s.verified).length;
  const activeProductsCount = products.filter(p => p.isActive).length;
  const totalRevenue = platformStats.totalRevenue;

  const pendingReviews = [
    { id: 1, type: 'space', name: 'Restaurant La Belle Époque', status: 'pending', date: '2024-11-24' },
    { id: 2, type: 'product', name: 'iPhone 15 Pro Max', status: 'reported', date: '2024-11-23' },
    { id: 3, type: 'user', name: 'Marc Dubois', status: 'suspended', date: '2024-11-22' },
    { id: 4, type: 'space', name: 'Boutique Tech Plus', status: 'pending', date: '2024-11-21' },
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Usage CPU élevé sur serveur principal', time: '5 min' },
    { id: 2, type: 'info', message: 'Nouvelle version déployée avec succès', time: '1h' },
    { id: 3, type: 'error', message: 'Tentative de connexion échouée détectée', time: '2h' },
  ];

  const topSpaces = spaces
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 5);

  const topUsers = users
    .filter(u => u.role !== 'PLATFORM_ADMIN')
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar activeItem={activeTab} />
      
      <div className="lg:pl-64">
        <AdminHeader 
          title="Dashboard ECHOS"
          subtitle="Gestion globale de la plateforme"
        />
        
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'dashboard', label: 'Tableau de Bord' },
                  { key: 'users', label: 'Utilisateurs' },
                  { key: 'spaces', label: 'Spaces' },
                  { key: 'marketplace', label: 'Marketplace' },
                  { key: 'moderation', label: 'Modération' },
                  { key: 'analytics', label: 'Analytics' },
                  { key: 'settings', label: 'Paramètres' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.key
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8">
                
                {/* Time Range Selector */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h2>
                    <p className="text-gray-600">Métriques globales de la plateforme</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="7days">7 derniers jours</option>
                      <option value="30days">30 derniers jours</option>
                      <option value="6months">6 derniers mois</option>
                      <option value="1year">1 an</option>
                    </select>
                    <Button variant="outline">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Utilisateurs Total</p>
                          <p className="text-3xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
                          <p className="text-sm text-green-600 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +{platformStats.monthlyGrowth.users}% ce mois
                          </p>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                          <Users className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Spaces Actifs</p>
                          <p className="text-3xl font-bold text-gray-900">{platformStats.totalSpaces.toLocaleString()}</p>
                          <p className="text-sm text-green-600 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +{platformStats.monthlyGrowth.spaces}% ce mois
                          </p>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                          <Store className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Produits</p>
                          <p className="text-3xl font-bold text-gray-900">{platformStats.totalProducts.toLocaleString()}</p>
                          <p className="text-sm text-green-600 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +{platformStats.monthlyGrowth.products}% ce mois
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-100 rounded-full">
                          <ShoppingBag className="h-8 w-8 text-yellow-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                          <p className="text-3xl font-bold text-gray-900">{totalRevenue.toLocaleString()}€</p>
                          <p className="text-sm text-green-600 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            +{platformStats.monthlyGrowth.revenue}% ce mois
                          </p>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                          <DollarSign className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* User Growth */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Croissance Utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="spaces" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="products" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Revenue Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Évolution des Revenus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* System Status & Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* System Health */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Activity className="h-5 w-5 mr-2" />
                        État du Système
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Serveurs</span>
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Opérationnel
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Base de données</span>
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Opérationnel
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">CDN</span>
                        <Badge variant="warning">
                          <Clock className="h-3 w-3 mr-1" />
                          Dégradé
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">API</span>
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Opérationnel
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Alerts */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        Alertes Récentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {systemAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <div className={`p-1 rounded-full ${
                            alert.type === 'warning' ? 'bg-yellow-100' :
                            alert.type === 'error' ? 'bg-red-100' :
                            'bg-blue-100'
                          }`}>
                            {alert.type === 'warning' && <AlertTriangle className="h-3 w-3 text-yellow-600" />}
                            {alert.type === 'error' && <AlertTriangle className="h-3 w-3 text-red-600" />}
                            {alert.type === 'info' && <CheckCircle className="h-3 w-3 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{alert.message}</p>
                            <p className="text-xs text-gray-500">Il y a {alert.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Actions Rapides</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Gérer les Utilisateurs
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Store className="h-4 w-4 mr-2" />
                        Modérer les Spaces
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Sécurité
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Configuration
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Performing Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Spaces */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Spaces les Plus Performants</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topSpaces.map((space, index) => (
                          <div key={space.id} className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-sm font-semibold text-blue-600">
                              {index + 1}
                            </div>
                            <Avatar src={space.logo} alt={space.name} size="sm" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{space.name}</p>
                              <p className="text-xs text-gray-500">{space.followers.toLocaleString()} abonnés</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center">
                                <span className="text-xs text-gray-500">★</span>
                                <span className="text-xs text-gray-600 ml-1">{space.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Users */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Utilisateurs les Plus Influents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topUsers.map((user, index) => (
                          <div key={user.id} className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full text-sm font-semibold text-green-600">
                              {index + 1}
                            </div>
                            <Avatar src={user.avatar} alt={user.name} size="sm" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.followers.toLocaleString()} abonnés</p>
                            </div>
                            <Badge variant={user.verified ? 'success' : 'default'}>
                              {user.verified ? 'Vérifié' : 'Standard'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
                    <p className="text-gray-600">Tous les utilisateurs de la plateforme ECHOS</p>
                  </div>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Ajouter Utilisateur
                  </Button>
                </div>

                {/* User Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Utilisateurs</p>
                          <p className="text-xl font-bold">{users.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full mr-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Vérifiés</p>
                          <p className="text-xl font-bold">{users.filter(u => u.verified).length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full mr-4">
                          <Activity className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Actifs</p>
                          <p className="text-xl font-bold">{users.filter(u => u.followers > 0).length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full mr-4">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Nouveaux ce mois</p>
                          <p className="text-xl font-bold">{users.filter(u => new Date(u.createdAt).getMonth() === new Date().getMonth()).length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* User List */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Espace(s)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {user.role === 'PLATFORM_ADMIN' && <Badge variant="destructive">Admin</Badge>}
                                  {user.role === 'SPACE_OWNER' && <Badge variant="success">Propriétaire</Badge>}
                                  {user.role === 'SPACE_ADMIN' && <Badge variant="secondary">Admin</Badge>}
                                  {user.role === 'USER' && <Badge>Standard</Badge>}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.spaces.length} space(s)
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {user.followers.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {user.verified ? (
                                    <Badge variant="success" className="flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Vérifié
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">Non vérifié</Badge>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Éditer
                                </Button>
                                <Button variant="outline" size="sm">
                                  Détails
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Spaces Tab */}
            {activeTab === 'spaces' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestion des Spaces</h2>
                    <p className="text-gray-600">Tous les espaces de la plateforme ECHOS</p>
                  </div>
                  <Button>
                    <Store className="h-4 w-4 mr-2" />
                    Ajouter Space
                  </Button>
                </div>

                {/* Space Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                          <Store className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Spaces</p>
                          <p className="text-xl font-bold">{spaces.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full mr-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Vérifiés</p>
                          <p className="text-xl font-bold">{spaces.filter(s => s.verified).length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full mr-4">
                          <Activity className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Actifs</p>
                          <p className="text-xl font-bold">{spaces.filter(s => s.isActive).length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full mr-4">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Catégories</p>
                          <p className="text-xl font-bold">6</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Space List */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Space</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Propriétaire</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {spaces.map((space) => (
                            <tr key={space.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <Avatar src={space.logo} alt={space.name} size="sm" />
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{space.name}</div>
                                    <div className="text-sm text-gray-500">{space.address}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  <Badge variant={space.category === 'Tech' ? 'default' :
                                                space.category === 'Fashion' ? 'secondary' :
                                                space.category === 'Restaurant' ? 'accent' : 'outline'}>
                                    {space.category}
                                  </Badge>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {users.find(u => u.id === space.ownerId)?.name || 'Inconnu'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {space.followers.toLocaleString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {space.verified ? (
                                    <Badge variant="success" className="flex items-center">
                                      <CheckCircle className="h-3 w-3 mr-1" />
                                      Vérifié
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline">Non vérifié</Badge>
                                  )}
                                  {!space.isActive && (
                                    <Badge variant="destructive" className="ml-2">Inactif</Badge>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Éditer
                                </Button>
                                <Button variant="outline" size="sm">
                                  Détails
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Marketplace Tab */}
            {activeTab === 'marketplace' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Gestion du Marketplace</h2>
                    <p className="text-gray-600">Tous les produits de la plateforme ECHOS</p>
                  </div>
                  <Button>
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Ajouter Produit
                  </Button>
                </div>

                {/* Product Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                          <ShoppingBag className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Produits</p>
                          <p className="text-xl font-bold">{products.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full mr-4">
                          <Activity className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Actifs</p>
                          <p className="text-xl font-bold">{products.filter(p => p.isActive).length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full mr-4">
                          <DollarSign className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Revenus</p>
                          <p className="text-xl font-bold">{products.reduce((sum, p) => sum + (p.isActive ? p.price : 0), 0).toLocaleString()}€</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full mr-4">
                          <TrendingUp className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Vues</p>
                          <p className="text-xl font-bold">{products.reduce((sum, p) => sum + p.views, 0)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Product List */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Space</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {products.map((product) => (
                            <tr key={product.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10">
                                    <img className="h-10 w-10 rounded-md object-cover" src={product.images[0]} alt={product.title} />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                                    <div className="text-sm text-gray-500">{spaces.find(s => s.id === product.spaceId)?.name || 'Inconnu'}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.price.toFixed(2)}€
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.category}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {product.stock}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  {product.isActive ? (
                                    <Badge variant="success">Actif</Badge>
                                  ) : (
                                    <Badge variant="destructive">Inactif</Badge>
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <Button variant="outline" size="sm" className="mr-2">
                                  Éditer
                                </Button>
                                <Button variant="outline" size="sm">
                                  Détails
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Moderation Tab */}
            {activeTab === 'moderation' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Modération</h2>
                    <p className="text-gray-600">Contenu en attente de modération</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline">
                      <Flag className="h-4 w-4 mr-2" />
                      Signalements
                    </Button>
                    <Button>
                      <Shield className="h-4 w-4 mr-2" />
                      Modérer
                    </Button>
                  </div>
                </div>

                {/* Moderation Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-red-100 rounded-full mr-4">
                          <Flag className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Signalements</p>
                          <p className="text-xl font-bold">24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full mr-4">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">En attente</p>
                          <p className="text-xl font-bold">15</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                          <MessageCircle className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Contenu à vérifier</p>
                          <p className="text-xl font-bold">37</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full mr-4">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Résolus</p>
                          <p className="text-xl font-bold">128</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Moderation Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contenu en attente</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pendingReviews.map((review) => (
                          <div key={review.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{review.name}</p>
                              <p className="text-sm text-gray-500">
                                {review.type === 'space' && 'Espace en attente de vérification'}
                                {review.type === 'product' && 'Produit signalé'}
                                {review.type === 'user' && 'Utilisateur suspendu'}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Approuver</Button>
                              <Button variant="destructive" size="sm">Rejeter</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Signalements récents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <div className="p-1 rounded-full bg-yellow-100">
                            <Flag className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Publication inappropriée signalée dans "Tech Solutions Paris"</p>
                            <p className="text-xs text-gray-500">Il y a 2h</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <div className="p-1 rounded-full bg-yellow-100">
                            <Flag className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Profil utilisateur suspect signalé</p>
                            <p className="text-xs text-gray-500">Il y a 4h</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                          <div className="p-1 rounded-full bg-yellow-100">
                            <Flag className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">Produit non conforme signalé dans "Boutique Échos Fashion"</p>
                            <p className="text-xs text-gray-500">Il y a 6h</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
                    <p className="text-gray-600">Métriques et analyses de la plateforme</p>
                  </div>
                  <div className="flex space-x-2">
                    <select className="h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="7days">7 derniers jours</option>
                      <option value="30days">30 derniers jours</option>
                      <option value="6months">6 derniers mois</option>
                      <option value="1year">1 an</option>
                    </select>
                    <Button>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Exporter
                    </Button>
                  </div>
                </div>

                {/* Analytics Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full mr-4">
                          <Activity className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Utilisateurs actifs</p>
                          <p className="text-xl font-bold">{platformStats.activeUsers.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full mr-4">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Croissance</p>
                          <p className="text-xl font-bold">+{platformStats.monthlyGrowth.users}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full mr-4">
                          <DollarSign className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Revenus</p>
                          <p className="text-xl font-bold">{platformStats.totalRevenue.toLocaleString()}€</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-full mr-4">
                          <ShoppingBag className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Ventes</p>
                          <p className="text-xl font-bold">{platformStats.totalProducts.toLocaleString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Analytics Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Croissance des utilisateurs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={userGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="users" fill="#3B82F6" name="Utilisateurs" />
                          <Bar dataKey="spaces" fill="#10B981" name="Spaces" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Évolution des revenus</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} name="Revenus" />
                          <Line type="monotone" dataKey="transactions" stroke="#F59E0B" strokeWidth={2} name="Transactions" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribution par catégorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name} ${(percent ? (percent * 100).toFixed(0) : '0')}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Nombre']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>
                  <p className="text-gray-600">Configuration de la plateforme ECHOS</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <Card>
                      <CardContent className="p-6">
                        <nav className="space-y-2">
                          {[
                            { id: 'general', label: 'Paramètres Généraux' },
                            { id: 'security', label: 'Sécurité' },
                            { id: 'notifications', label: 'Notifications' },
                            { id: 'billing', label: 'Facturation' },
                            { id: 'api', label: 'API' },
                          ].map((setting) => (
                            <button
                              key={setting.id}
                              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-blue-50 text-blue-700"
                            >
                              {setting.label}
                            </button>
                          ))}
                        </nav>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Paramètres Généraux</CardTitle>
                        <p className="text-sm text-gray-500">Configuration principale de la plateforme</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom de la plateforme</label>
                          <input
                            type="text"
                            defaultValue="ECHOS"
                            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea
                            rows={3}
                            defaultValue="Plateforme sociale avec marketplaces et spaces pour créer et gérer des boutiques en ligne"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">URL de la plateforme</label>
                          <input
                            type="text"
                            defaultValue="https://echos.fr"
                            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="maintenance"
                            defaultChecked={false}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-900">
                            Mode maintenance
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="registrations"
                            defaultChecked={true}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label htmlFor="registrations" className="ml-2 block text-sm text-gray-900">
                            Inscriptions ouvertes
                          </label>
                        </div>

                        <Button>Enregistrer les modifications</Button>
                      </CardContent>
                    </Card>

                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle>Sécurité</CardTitle>
                        <p className="text-sm text-gray-500">Paramètres de sécurité de la plateforme</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Durée de validité des tokens</label>
                          <select className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>1 jour</option>
                            <option>7 jours</option>
                            <option selected>30 jours</option>
                            <option>90 jours</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Tentatives de connexion autorisées</label>
                          <input
                            type="number"
                            defaultValue="5"
                            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Durée du blocage (minutes)</label>
                          <input
                            type="number"
                            defaultValue="30"
                            className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="2fa"
                            defaultChecked={true}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                          <label htmlFor="2fa" className="ml-2 block text-sm text-gray-900">
                            Authentification à deux facteurs obligatoire pour les admins
                          </label>
                        </div>

                        <Button>Enregistrer les modifications</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Default message for other tabs (should not be reached now) */}
            {['dashboard', 'users', 'spaces', 'marketplace', 'moderation', 'analytics', 'settings'].indexOf(activeTab) === -1 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Settings className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Section en développement</h3>
                <p className="text-gray-600">
                  La section "{activeTab}" sera bientôt disponible.
                </p>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}