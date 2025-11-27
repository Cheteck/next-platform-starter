'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  Eye, 
  DollarSign,
  Star,
  Package,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { Badge } from '@/components/ui';
import { Layout } from '@/components/layout';

// Types
interface AnalyticsData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalVisitors: number;
    conversionRate: number;
    avgOrderValue: number;
    repeatCustomerRate: number;
  };
  revenue: {
    current: number;
    previous: number;
    growth: number;
    data: Array<{ date: string; revenue: number; orders: number }>;
  };
  topProducts: Array<{
    id: string;
    name: string;
    revenue: number;
    sales: number;
    views: number;
    rating: number;
  }>;
  trafficSources: Array<{
    source: string;
    visitors: number;
    percentage: number;
  }>;
  deviceTypes: Array<{
    device: string;
    visitors: number;
    percentage: number;
  }>;
  customerDemographics: {
    ageGroups: Array<{ range: string; percentage: number }>;
    genders: Array<{ gender: string; percentage: number }>;
    locations: Array<{ country: string; percentage: number }>;
  };
  salesByCategory: Array<{
    category: string;
    revenue: number;
    sales: number;
  }>;
}

// Mock data
const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalRevenue: 89456,
    totalOrders: 342,
    totalVisitors: 12450,
    conversionRate: 2.75,
    avgOrderValue: 261.54,
    repeatCustomerRate: 23.5
  },
  revenue: {
    current: 89456,
    previous: 76543,
    growth: 16.86,
    data: [
      { date: '2024-01-01', revenue: 2456, orders: 12 },
      { date: '2024-01-02', revenue: 3201, orders: 15 },
      { date: '2024-01-03', revenue: 2890, orders: 11 },
      { date: '2024-01-04', revenue: 4123, orders: 18 },
      { date: '2024-01-05', revenue: 3765, orders: 14 },
      { date: '2024-01-06', revenue: 4987, orders: 22 },
      { date: '2024-01-07', revenue: 5234, orders: 19 },
      { date: '2024-01-08', revenue: 4556, orders: 17 },
      { date: '2024-01-09', revenue: 3890, orders: 16 },
      { date: '2024-01-10', revenue: 4321, orders: 18 },
      { date: '2024-01-11', revenue: 5678, orders: 24 },
      { date: '2024-01-12', revenue: 6234, orders: 26 },
      { date: '2024-01-13', revenue: 5890, orders: 23 },
      { date: '2024-01-14', revenue: 6543, orders: 28 },
      { date: '2024-01-15', revenue: 7123, orders: 31 },
      { date: '2024-01-16', revenue: 6789, orders: 29 },
      { date: '2024-01-17', revenue: 7345, orders: 33 },
      { date: '2024-01-18', revenue: 7890, orders: 35 }
    ]
  },
  topProducts: [
    {
      id: 'prod-1',
      name: 'iPhone 15 Pro Max 256GB',
      revenue: 27577,
      sales: 23,
      views: 1245,
      rating: 4.8
    },
    {
      id: 'prod-2',
      name: 'MacBook Pro M3 16"',
      revenue: 29988,
      sales: 12,
      views: 892,
      rating: 4.9
    },
    {
      id: 'prod-4',
      name: 'iPad Pro 12.9" 256GB',
      revenue: 20985,
      sales: 15,
      views: 567,
      rating: 4.6
    },
    {
      id: 'prod-3',
      name: 'AirPods Pro 2ème gen',
      revenue: 24831,
      sales: 89,
      views: 2156,
      rating: 4.7
    }
  ],
  trafficSources: [
    { source: 'Recherche Google', visitors: 5234, percentage: 42.1 },
    { source: 'Direct', visitors: 3456, percentage: 27.8 },
    { source: 'Réseaux sociaux', visitors: 2234, percentage: 17.9 },
    { source: 'Email marketing', visitors: 987, percentage: 7.9 },
    { source: 'Publicité payante', visitors: 539, percentage: 4.3 }
  ],
  deviceTypes: [
    { device: 'Mobile', visitors: 7456, percentage: 59.9 },
    { device: 'Desktop', visitors: 3767, percentage: 30.3 },
    { device: 'Tablette', visitors: 1227, percentage: 9.8 }
  ],
  customerDemographics: {
    ageGroups: [
      { range: '18-24', percentage: 23.5 },
      { range: '25-34', percentage: 34.2 },
      { range: '35-44', percentage: 28.1 },
      { range: '45-54', percentage: 10.7 },
      { range: '55+', percentage: 3.5 }
    ],
    genders: [
      { gender: 'Femme', percentage: 58.3 },
      { gender: 'Homme', percentage: 41.7 }
    ],
    locations: [
      { country: 'France', percentage: 78.4 },
      { country: 'Belgique', percentage: 8.9 },
      { country: 'Suisse', percentage: 4.2 },
      { country: 'Canada', percentage: 3.1 },
      { country: 'Autre', percentage: 5.4 }
    ]
  },
  salesByCategory: [
    { category: 'Smartphones', revenue: 45321, sales: 89 },
    { category: 'Ordinateurs', revenue: 32456, sales: 45 },
    { category: 'Audio', revenue: 15678, sales: 156 },
    { category: 'Tablettes', revenue: 20985, sales: 28 },
    { category: 'Accessoires', revenue: 12456, sales: 234 }
  ]
};

// Components
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: React.ComponentType<any>;
  format?: 'currency' | 'percentage' | 'number';
}> = ({ title, value, change, icon: Icon, format = 'number' }) => {
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return typeof val === 'number' ? `${val.toLocaleString()} €` : val;
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    return val;
  };

  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 ${
              isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
            }`}>
              {isPositive && <ArrowUpRight size={16} className="mr-1" />}
              {isNegative && <ArrowDownRight size={16} className="mr-1" />}
              <span className="text-sm font-medium">
                {Math.abs(change).toFixed(1)}% vs période précédente
              </span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="text-blue-600" size={24} />
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProgressBar: React.FC<{ 
  label: string; 
  value: number; 
  max: number; 
  color?: string;
}> = ({ label, value, max, color = 'bg-blue-500' }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-900 font-medium">{value.toLocaleString()}</span>
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

const SimpleChart: React.FC<{
  data: Array<{ date: string; revenue: number; orders: number }>;
  title: string;
}> = ({ data, title }) => {
  const maxRevenue = Math.max(...data.map(d => d.revenue));
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="relative h-64">
        <div className="absolute bottom-0 left-0 right-0 flex items-end space-x-1 h-full">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
              style={{ 
                height: `${(item.revenue / maxRevenue) * 100}%`,
                minHeight: '4px'
              }}
              title={`${item.date}: ${item.revenue}€ (${item.orders} commandes)`}
            ></div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>{data[0]?.date}</span>
        <span>{data[data.length - 1]?.date}</span>
      </div>
    </Card>
  );
};

export default function SpaceAdminAnalyticsPage() {
  const [data] = useState<AnalyticsData>(mockAnalyticsData);
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <BarChart3 className="mr-3 text-blue-500" size={32} />
                Analytics Espace
              </h1>
              <p className="text-gray-600">
                Suivez les performances de votre espace en temps réel.
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <MetricCard
            title="Chiffre d'affaires"
            value={formatCurrency(data.overview.totalRevenue)}
            change={data.revenue.growth}
            icon={DollarSign}
            format="currency"
          />
          <MetricCard
            title="Commandes"
            value={formatNumber(data.overview.totalOrders)}
            change={12.5}
            icon={ShoppingCart}
            format="number"
          />
          <MetricCard
            title="Visiteurs"
            value={formatNumber(data.overview.totalVisitors)}
            change={8.3}
            icon={Eye}
            format="number"
          />
          <MetricCard
            title="Taux de conversion"
            value={data.overview.conversionRate}
            change={-0.2}
            icon={Target}
            format="percentage"
          />
          <MetricCard
            title="Panier moyen"
            value={data.overview.avgOrderValue}
            change={5.1}
            icon={DollarSign}
            format="currency"
          />
          <MetricCard
            title="Clients récurrents"
            value={data.overview.repeatCustomerRate}
            change={3.7}
            icon={Users}
            format="percentage"
          />
        </div>

        {/* Revenue Chart */}
        <div className="mb-8">
          <SimpleChart 
            data={data.revenue.data} 
            title="Évolution du chiffre d'affaires (30 derniers jours)"
          />
        </div>

        {/* Top Products and Sales by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Products */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Produits les plus vendus</h3>
              <Button variant="outline" size="sm">Voir tout</Button>
            </div>
            
            <div className="space-y-4">
              {data.topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-blue-600">#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatNumber(product.sales)} ventes
                      </span>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-500">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(product.revenue)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatNumber(product.views)} vues
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Sales by Category */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Ventes par catégorie</h3>
              <Button variant="outline" size="sm">Voir tout</Button>
            </div>
            
            <div className="space-y-4">
              {data.salesByCategory.map((category, index) => (
                <div key={category.category}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">{category.category}</span>
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(category.revenue)}
                    </span>
                  </div>
                  <ProgressBar
                    label=""
                    value={category.revenue}
                    max={Math.max(...data.salesByCategory.map(c => c.revenue))}
                    color={index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-green-500'}
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Traffic Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Traffic Sources */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sources de trafic</h3>
              <Globe className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-4">
              {data.trafficSources.map((source, index) => (
                <div key={source.source}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">{source.source}</span>
                    <span className="text-gray-900 font-medium">
                      {source.visitors.toLocaleString()} ({source.percentage}%)
                    </span>
                  </div>
                  <ProgressBar
                    label=""
                    value={source.percentage}
                    max={100}
                    color={index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-green-500'}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Device Types */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Types d'appareils</h3>
              <Monitor className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-4">
              {data.deviceTypes.map((device, index) => {
                const IconComponent = device.device === 'Mobile' ? Smartphone : 
                                   device.device === 'Desktop' ? Monitor : 
                                   BarChart3;
                
                return (
                  <div key={device.device} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index === 0 ? 'bg-blue-100' : index === 1 ? 'bg-purple-100' : 'bg-green-100'
                    }`}>
                      <IconComponent size={20} className={
                        index === 0 ? 'text-blue-600' : index === 1 ? 'text-purple-600' : 'text-green-600'
                      } />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-900">{device.device}</span>
                        <span className="text-sm text-gray-600">{device.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-purple-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Customer Demographics */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Démographie</h3>
              <Users className="text-gray-400" size={20} />
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Tranches d'âge</h4>
                {data.customerDemographics.ageGroups.map((group, index) => (
                  <div key={group.range} className="mb-2">
                    <div className="flex justify-between text-xs">
                      <span>{group.range} ans</span>
                      <span>{group.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        style={{ width: `${group.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Répartition par sexe</h4>
                <div className="space-y-2">
                  {data.customerDemographics.genders.map((gender) => (
                    <div key={gender.gender} className="flex justify-between text-sm">
                      <span>{gender.gender}</span>
                      <span className="font-medium">{gender.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-start space-x-3">
            <Activity className="text-blue-500 flex-shrink-0 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">
                Actions recommandées
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="justify-start">
                  <TrendingUp size={16} className="mr-2" />
                  Optimiser conversions
                </Button>
                <Button variant="outline" className="justify-start">
                  <Target size={16} className="mr-2" />
                  Améliorer SEO
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users size={16} className="mr-2" />
                  Fidéliser clients
                </Button>
                <Button variant="outline" className="justify-start">
                  <Package size={16} className="mr-2" />
                  Optimiser stock
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}