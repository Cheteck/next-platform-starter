'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Eye,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Star,
  Package,
  MapPin,
  Calendar,
  RefreshCw,
  Download,
  Filter,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  PieChart,
  LineChart,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface PlatformMetrics {
  totalUsers: number;
  totalSpaces: number;
  totalProducts: number;
  totalRevenue: number;
  monthlyGrowth: {
    users: number;
    spaces: number;
    products: number;
    revenue: number;
  };
  activeUsers: number;
  newUsersThisMonth: number;
  conversionRate: number;
  avgSessionDuration: number;
  bounceRate: number;
  topCategories: Array<{
    name: string;
    count: number;
    growth: number;
  }>;
}

interface RevenueData {
  current: number;
  previous: number;
  growth: number;
  data: Array<{ month: string; revenue: number; transactions: number }>;
  breakdown: {
    marketplace: number;
    spaces: number;
    advertising: number;
    subscriptions: number;
  };
}

interface UserDemographics {
  ageGroups: Array<{ range: string; count: number; percentage: number }>;
  genders: Array<{ gender: string; count: number; percentage: number }>;
  locations: Array<{ country: string; count: number; percentage: number }>;
  deviceTypes: Array<{ device: string; count: number; percentage: number }>;
  browserTypes: Array<{ browser: string; count: number; percentage: number }>;
}

interface SystemHealth {
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeConnections: number;
  cpuUsage: number;
  memoryUsage: number;
  storageUsage: number;
  databaseConnections: number;
}

interface Alert {
  id: string;
  type: 'performance' | 'security' | 'revenue' | 'user' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

// Mock data
const mockPlatformMetrics: PlatformMetrics = {
  totalUsers: 89456,
  totalSpaces: 3421,
  totalProducts: 45678,
  totalRevenue: 1234567,
  monthlyGrowth: {
    users: 15.3,
    spaces: 8.7,
    products: 22.1,
    revenue: 18.9
  },
  activeUsers: 12567,
  newUsersThisMonth: 2341,
  conversionRate: 3.45,
  avgSessionDuration: 12.7,
  bounceRate: 23.8,
  topCategories: [
    { name: 'Technologie', count: 12345, growth: 15.2 },
    { name: 'Mode', count: 9876, growth: 12.8 },
    { name: 'Électroménager', count: 7892, growth: 9.4 },
    { name: 'Sports', count: 6543, growth: 7.6 },
    { name: 'Livres', count: 5432, growth: 5.2 }
  ]
};

const mockRevenueData: RevenueData = {
  current: 1234567,
  previous: 1038765,
  growth: 18.9,
  data: [
    { month: 'Jan', revenue: 85000, transactions: 1200 },
    { month: 'Fév', revenue: 92000, transactions: 1350 },
    { month: 'Mar', revenue: 78000, transactions: 1100 },
    { month: 'Avr', revenue: 105000, transactions: 1500 },
    { month: 'Mai', revenue: 118000, transactions: 1650 },
    { month: 'Jun', revenue: 125000, transactions: 1800 },
    { month: 'Jul', revenue: 142000, transactions: 2100 },
    { month: 'Aoû', revenue: 138000, transactions: 1950 },
    { month: 'Sep', revenue: 156000, transactions: 2200 },
    { month: 'Oct', revenue: 165000, transactions: 2350 },
    { month: 'Nov', revenue: 172000, transactions: 2450 },
    { month: 'Déc', revenue: 189000, transactions: 2700 }
  ],
  breakdown: {
    marketplace: 734567,
    spaces: 345678,
    advertising: 123456,
    subscriptions: 29466
  }
};

const mockUserDemographics: UserDemographics = {
  ageGroups: [
    { range: '18-24', count: 22356, percentage: 25.0 },
    { range: '25-34', count: 31234, percentage: 34.9 },
    { range: '35-44', count: 19876, percentage: 22.2 },
    { range: '45-54', count: 11234, percentage: 12.5 },
    { range: '55+', count: 4756, percentage: 5.3 }
  ],
  genders: [
    { gender: 'Femme', count: 49234, percentage: 55.0 },
    { gender: 'Homme', count: 36543, percentage: 40.8 },
    { gender: 'Autre', count: 3679, percentage: 4.1 }
  ],
  locations: [
    { country: 'France', count: 67234, percentage: 75.1 },
    { country: 'Belgique', count: 8976, percentage: 10.0 },
    { country: 'Suisse', count: 4567, percentage: 5.1 },
    { country: 'Canada', count: 3456, percentage: 3.9 },
    { country: 'Autre', count: 5223, percentage: 5.8 }
  ],
  deviceTypes: [
    { device: 'Mobile', count: 63456, percentage: 70.9 },
    { device: 'Desktop', count: 21456, percentage: 24.0 },
    { device: 'Tablet', count: 4544, percentage: 5.1 }
  ],
  browserTypes: [
    { browser: 'Chrome', count: 45678, percentage: 51.1 },
    { browser: 'Safari', count: 23456, percentage: 26.2 },
    { browser: 'Firefox', count: 12345, percentage: 13.8 },
    { browser: 'Edge', count: 7977, percentage: 8.9 }
  ]
};

const mockSystemHealth: SystemHealth = {
  uptime: 99.97,
  responseTime: 145,
  errorRate: 0.02,
  activeConnections: 3456,
  cpuUsage: 34.5,
  memoryUsage: 67.2,
  storageUsage: 45.8,
  databaseConnections: 23
};

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'performance',
    severity: 'high',
    title: 'Pic de traffic détecté',
    message: 'Le traffic a augmenté de 45% dans les dernières 2 heures.',
    timestamp: new Date(Date.now() - 1800000),
    isRead: false
  },
  {
    id: 'alert-2',
    type: 'revenue',
    severity: 'medium',
    title: 'Objectif mensuel presque atteint',
    message: 'Le CA mensuel est à 95% de l\'objectif (1.17M€ / 1.23M€).',
    timestamp: new Date(Date.now() - 3600000 * 3),
    isRead: false
  },
  {
    id: 'alert-3',
    type: 'security',
    severity: 'low',
    title: 'Tentatives de connexion échouées',
    message: '12 tentatives de connexion échouées dans la dernière heure.',
    timestamp: new Date(Date.now() - 3600000 * 6),
    isRead: true
  }
];

// Components
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change: number;
  icon: React.ComponentType<any>;
  format?: 'currency' | 'percentage' | 'number' | 'duration';
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange';
}> = ({ title, value, change, icon: Icon, format = 'number', color = 'blue' }) => {
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return typeof val === 'number' ? `${val.toLocaleString()} €` : val;
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    if (format === 'duration') {
      return typeof val === 'number' ? `${val} min` : val;
    }
    return val;
  };

  const isPositive = change > 0;
  const isNegative = change < 0;

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600'
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">
            {formatValue(value)}
          </p>
          <div className={`flex items-center mt-2 ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
          }`}>
            {isPositive && <ArrowUpRight size={16} className="mr-1" />}
            {isNegative && <ArrowDownRight size={16} className="mr-1" />}
            <span className="text-sm font-medium">
              {Math.abs(change).toFixed(1)}% vs mois dernier
            </span>
          </div>
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
};

const SimpleLineChart: React.FC<{
  data: Array<{ month: string; value: number }>;
  title: string;
  color?: string;
}> = ({ data, title, color = 'bg-blue-500' }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 160">
          {data.map((point, index) => {
            const x = (index / (data.length - 1)) * 380 + 10;
            const y = 150 - ((point.value - minValue) / range) * 120;
            
            if (index === 0) {
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#3b82f6"
                />
              );
            }
            
            const prevX = ((index - 1) / (data.length - 1)) * 380 + 10;
            const prevY = 150 - ((data[index - 1].value - minValue) / range) * 120;
            
            return (
              <g key={index}>
                <line
                  x1={prevX}
                  y1={prevY}
                  x2={x}
                  y2={y}
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#3b82f6"
                />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{data[0]?.month}</span>
        <span>{data[data.length - 1]?.month}</span>
      </div>
    </Card>
  );
};

const ProgressBar: React.FC<{
  label: string;
  value: number;
  total: number;
  color?: string;
}> = ({ label, value, total, color = 'bg-blue-500' }) => {
  const percentage = (value / total) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-900 font-medium">{value.toLocaleString()} ({percentage.toFixed(1)}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function AdminAnalyticsPage() {
  const [metrics] = useState<PlatformMetrics>(mockPlatformMetrics);
  const [revenueData] = useState<RevenueData>(mockRevenueData);
  const [demographics] = useState<UserDemographics>(mockUserDemographics);
  const [systemHealth] = useState<SystemHealth>(mockSystemHealth);
  const [alerts] = useState<Alert[]>(mockAlerts);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('fr-FR').format(value);
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'performance':
        return <Activity className="text-orange-500" size={16} />;
      case 'security':
        return <AlertTriangle className="text-red-500" size={16} />;
      case 'revenue':
        return <DollarSign className="text-green-500" size={16} />;
      case 'user':
        return <Users className="text-blue-500" size={16} />;
      case 'system':
        return <Zap className="text-purple-500" size={16} />;
      default:
        return <AlertTriangle className="text-gray-500" size={16} />;
    }
  };

  const getSeverityColor = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <BarChart3 className="mr-3 text-blue-500" size={32} />
                Analytics Globaux
              </h1>
              <p className="text-gray-600">
                Tableau de bord complet des performances de la plateforme ECHOS.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">7 derniers jours</option>
                <option value="30d">30 derniers jours</option>
                <option value="90d">90 derniers jours</option>
                <option value="1y">1 an</option>
              </select>
              
              <Button variant="outline" size="sm">
                <Filter size={16} className="mr-2" />
                Filtres
              </Button>
              
              <Button variant="outline" size="sm">
                <RefreshCw size={16} className="mr-2" />
                Actualiser
              </Button>
              
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Utilisateurs totaux"
            value={formatNumber(metrics.totalUsers)}
            change={metrics.monthlyGrowth.users}
            icon={Users}
            format="number"
            color="blue"
          />
          <MetricCard
            title="Chiffre d'affaires"
            value={formatCurrency(metrics.totalRevenue)}
            change={metrics.monthlyGrowth.revenue}
            icon={DollarSign}
            format="currency"
            color="green"
          />
          <MetricCard
            title="Espaces actifs"
            value={formatNumber(metrics.totalSpaces)}
            change={metrics.monthlyGrowth.spaces}
            icon={Globe}
            format="number"
            color="purple"
          />
          <MetricCard
            title="Produits"
            value={formatNumber(metrics.totalProducts)}
            change={metrics.monthlyGrowth.products}
            icon={Package}
            format="number"
            color="orange"
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Utilisateurs actifs"
            value={formatNumber(metrics.activeUsers)}
            change={12.5}
            icon={Activity}
            format="number"
            color="blue"
          />
          <MetricCard
            title="Nouveaux utilisateurs"
            value={formatNumber(metrics.newUsersThisMonth)}
            change={18.3}
            icon={TrendingUp}
            format="number"
            color="green"
          />
          <MetricCard
            title="Taux de conversion"
            value={metrics.conversionRate}
            change={-0.8}
            icon={Target}
            format="percentage"
            color="purple"
          />
          <MetricCard
            title="Durée session moyenne"
            value={metrics.avgSessionDuration}
            change={5.2}
            icon={Clock}
            format="duration"
            color="orange"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <SimpleLineChart 
            data={revenueData.data.map(d => ({ month: d.month, value: d.revenue }))}
            title="Évolution du chiffre d'affaires"
            color="bg-green-500"
          />
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition du CA</h3>
            <div className="space-y-4">
              <ProgressBar
                label="Marketplace"
                value={revenueData.breakdown.marketplace}
                total={revenueData.current}
                color="bg-blue-500"
              />
              <ProgressBar
                label="Espaces"
                value={revenueData.breakdown.spaces}
                total={revenueData.current}
                color="bg-green-500"
              />
              <ProgressBar
                label="Publicité"
                value={revenueData.breakdown.advertising}
                total={revenueData.current}
                color="bg-purple-500"
              />
              <ProgressBar
                label="Abonnements"
                value={revenueData.breakdown.subscriptions}
                total={revenueData.current}
                color="bg-orange-500"
              />
            </div>
          </Card>
        </div>

        {/* Demographics and Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Top Categories */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Catégories populaires</h3>
            <div className="space-y-4">
              {metrics.topCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-900">{formatNumber(category.count)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        style={{ width: `${(category.count / metrics.topCategories[0].count) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <Badge className={`ml-3 ${
                    category.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {category.growth > 0 ? '+' : ''}{category.growth.toFixed(1)}%
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Age Groups */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition par âge</h3>
            <div className="space-y-4">
              {demographics.ageGroups.map((group) => (
                <div key={group.range} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{group.range} ans</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">{group.percentage}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Device Types */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Types d'appareils</h3>
            <div className="space-y-4">
              {demographics.deviceTypes.map((device) => {
                const IconComponent = device.device === 'Mobile' ? Smartphone : 
                                   device.device === 'Desktop' ? Monitor : 
                                   Tablet;
                
                return (
                  <div key={device.device} className="flex items-center space-x-3">
                    <IconComponent className="text-gray-400" size={20} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{device.device}</span>
                        <span className="text-sm text-gray-900">{device.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="h-2 bg-purple-500 rounded-full"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* System Health and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* System Health */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Monitor className="mr-2" size={20} />
              État du système
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <CheckCircle className="mx-auto text-green-500 mb-2" size={24} />
                <p className="text-lg font-bold text-green-900">{systemHealth.uptime}%</p>
                <p className="text-sm text-green-700">Disponibilité</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Zap className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="text-lg font-bold text-blue-900">{systemHealth.responseTime}ms</p>
                <p className="text-sm text-blue-700">Temps réponse</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Users className="mx-auto text-purple-500 mb-2" size={24} />
                <p className="text-lg font-bold text-purple-900">{systemHealth.activeConnections.toLocaleString()}</p>
                <p className="text-sm text-purple-700">Connexions actives</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <AlertTriangle className="mx-auto text-orange-500 mb-2" size={24} />
                <p className="text-lg font-bold text-orange-900">{systemHealth.errorRate}%</p>
                <p className="text-sm text-orange-700">Taux d'erreur</p>
              </div>
            </div>
          </Card>

          {/* Alerts */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="mr-2" size={20} />
              Alertes récentes
            </h3>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500 bg-red-50' :
                    alert.severity === 'high' ? 'border-orange-500 bg-orange-50' :
                    alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{alert.title}</h4>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{alert.message}</p>
                      <p className="text-xs text-gray-500">
                        {alert.timestamp.toLocaleDateString('fr-FR')} à {alert.timestamp.toLocaleTimeString('fr-FR')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Location Data */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition géographique</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {demographics.locations.map((location) => (
              <div key={location.country} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <MapPin className="text-gray-400 mr-1" size={16} />
                </div>
                <p className="font-medium text-gray-900">{location.country}</p>
                <p className="text-sm text-gray-600">{formatNumber(location.count)} utilisateurs</p>
                <p className="text-xs text-gray-500">{location.percentage}%</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-3">
            <Settings className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Actions rapides d'administration
              </h3>
              <p className="text-blue-700 mb-4">
                Gérez les paramètres globaux et surveillez les métriques de performance.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start">
                  <BarChart3 size={16} className="mr-2" />
                  Rapports détaillés
                </Button>
                <Button variant="outline" className="justify-start">
                  <Settings size={16} className="mr-2" />
                  Configuration
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download size={16} className="mr-2" />
                  Export avancé
                </Button>
                <Button variant="outline" className="justify-start">
                  <AlertTriangle size={16} className="mr-2" />
                  Centre alertes
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}