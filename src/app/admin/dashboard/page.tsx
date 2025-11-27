'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  MessageSquare, 
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Globe,
  Smartphone
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  monthlyGrowth: number
  totalPosts: number
  totalComments: number
  pendingModeration: number
  systemStatus: string
}

interface RecentActivity {
  id: string
  type: 'user_registered' | 'post_created' | 'payment_received' | 'moderation_action'
  description: string
  timestamp: string
  user: string
  status: 'success' | 'warning' | 'info'
}

interface QuickActions {
  title: string
  description: string
  icon: any
  action: string
  priority: 'high' | 'medium' | 'low'
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 15742,
    activeUsers: 8934,
    totalRevenue: 89450,
    monthlyGrowth: 23.5,
    totalPosts: 32567,
    totalComments: 158432,
    pendingModeration: 47,
    systemStatus: 'operational'
  })

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'user_registered',
      description: 'Nouvel utilisateur inscrit',
      timestamp: '2025-11-25 07:25:00',
      user: 'alice.martin@email.com',
      status: 'info'
    },
    {
      id: '2',
      type: 'payment_received',
      description: 'Paiement Premium reçu',
      timestamp: '2025-11-25 07:20:00',
      user: 'bob.dupont@email.com',
      status: 'success'
    },
    {
      id: '3',
      type: 'post_created',
      description: 'Nouveau post créé',
      timestamp: '2025-11-25 07:15:00',
      user: 'camille.laurent@email.com',
      status: 'info'
    },
    {
      id: '4',
      type: 'moderation_action',
      description: 'Contenu signalé traité',
      timestamp: '2025-11-25 07:10:00',
      user: 'system',
      status: 'warning'
    },
    {
      id: '5',
      type: 'user_registered',
      description: 'Nouvel utilisateur inscrit',
      timestamp: '2025-11-25 07:05:00',
      user: 'david.bernard@email.com',
      status: 'info'
    }
  ])

  const [quickActions] = useState<QuickActions[]>([
    {
      title: 'Modérer le Contenu',
      description: `${stats.pendingModeration} contenus en attente`,
      icon: AlertCircle,
      action: '/admin/moderation',
      priority: 'high'
    },
    {
      title: 'Voir les Utilisateurs',
      description: 'Gérer les comptes utilisateurs',
      icon: Users,
      action: '/admin/users',
      priority: 'medium'
    },
    {
      title: 'Configurer la Plateforme',
      description: 'Paramètres généraux',
      icon: Globe,
      action: '/admin/settings',
      priority: 'medium'
    },
    {
      title: 'Gérer les Rôles',
      description: 'Système de permissions',
      icon: CheckCircle,
      action: '/admin/roles',
      priority: 'low'
    }
  ])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered':
        return <Users className="w-4 h-4" />
      case 'post_created':
        return <MessageSquare className="w-4 h-4" />
      case 'payment_received':
        return <DollarSign className="w-4 h-4" />
      case 'moderation_action':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'info':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 hover:border-red-300'
      case 'medium':
        return 'border-yellow-200 hover:border-yellow-300'
      case 'low':
        return 'border-green-200 hover:border-green-300'
      default:
        return 'border-gray-200 hover:border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrateur</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Vue d'ensemble de la plateforme ECHOS
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                  stats.systemStatus === 'operational' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    stats.systemStatus === 'operational' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span>{stats.systemStatus === 'operational' ? 'Opérationnel' : 'Maintenance'}</span>
                </div>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs Total</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
              <span className="text-gray-500 ml-1">ce mois</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-gray-500">
                {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% du total
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalRevenue.toLocaleString()}€</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+{stats.monthlyGrowth * 1.2}%</span>
              <span className="text-gray-500 ml-1">ce mois</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Modération</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingModeration}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Clock className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-yellow-600">En attente</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Actions Rapides</h3>
            <p className="text-sm text-gray-600">Accès rapide aux tâches administratives courantes</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = action.action}
                  className={`p-4 border-2 rounded-lg text-left hover:shadow-md transition-all ${getPriorityColor(action.priority)}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <action.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                  {action.priority === 'high' && (
                    <div className="mt-2 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                      <span className="text-xs text-red-600 font-medium">Priorité haute</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Activité Récente</h3>
              <p className="text-sm text-gray-600">Derniers événements de la plateforme</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.user} • {activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Voir toute l'activité
                </button>
              </div>
            </div>
          </div>

          {/* Content Overview */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900">Vue d'Ensemble du Contenu</h3>
              <p className="text-sm text-gray-600">Statistiques des contenus publiés</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalPosts.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Posts Total</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalComments.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Commentaires</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Taux d'engagement</span>
                  <span className="text-sm font-medium text-gray-900">87.3%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Posts par jour</span>
                  <span className="text-sm font-medium text-gray-900">~234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Commentaires modérés</span>
                  <span className="text-sm font-medium text-green-600">98.9%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium text-gray-900">Santé du Système</h3>
            <p className="text-sm text-gray-600">Monitoring en temps réel de l'infrastructure</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-medium text-gray-900">Performance</h4>
                <p className="text-2xl font-bold text-green-600">98.7%</p>
                <p className="text-sm text-gray-600">Disponibilité</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <PieChart className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-900">Charge Serveur</h4>
                <p className="text-2xl font-bold text-blue-600">23%</p>
                <p className="text-sm text-gray-600">CPU Utilisé</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-medium text-gray-900">Base de Données</h4>
                <p className="text-2xl font-bold text-yellow-600">156ms</p>
                <p className="text-sm text-gray-600">Temps de réponse</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}