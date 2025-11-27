'use client'

import { useState } from 'react'
import { 
  Flag, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  Ban, 
  MessageSquare,
  Image,
  Video,
  FileText,
  Calendar,
  User,
  Filter,
  Search,
  MoreHorizontal,
  Archive,
  Trash2,
  Edit,
  Clock,
  TrendingUp,
  Users,
  BarChart3,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react'

interface ModerationItem {
  id: string
  type: 'post' | 'comment' | 'user_profile' | 'media'
  content: string
  contentPreview: string
  reportedBy: string
  reportedAt: string
  reason: string
  category: 'spam' | 'inappropriate' | 'harassment' | 'fake_news' | 'copyright' | 'other'
  status: 'pending' | 'approved' | 'rejected' | 'escalated'
  priority: 'low' | 'medium' | 'high' | 'critical'
  reportedByCount: number
  author: {
    id: string
    name: string
    username: string
    avatar?: string
    verified: boolean
    status: 'active' | 'suspended' | 'banned'
  }
  attachments?: {
    type: 'image' | 'video' | 'file'
    url: string
    thumbnail?: string
  }[]
  moderationHistory: {
    action: 'review_started' | 'approved' | 'rejected' | 'escalated' | 'archived'
    moderator: string
    timestamp: string
    note?: string
  }[]
  automodScore?: number
}

interface ModerationStats {
  pendingItems: number
  processedToday: number
  averageResponseTime: string
  approvalRate: number
  topReasons: { reason: string; count: number }[]
  priorityBreakdown: {
    critical: number
    high: number
    medium: number
    low: number
  }
}

export default function AdminModeration() {
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState('pending')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const [stats] = useState<ModerationStats>({
    pendingItems: 47,
    processedToday: 23,
    averageResponseTime: '12m',
    approvalRate: 78.5,
    topReasons: [
      { reason: 'Spam', count: 156 },
      { reason: 'Contenu inapproprié', count: 89 },
      { reason: 'Harcèlement', count: 34 },
      { reason: 'Fake news', count: 28 },
      { reason: 'Violation copyright', count: 12 }
    ],
    priorityBreakdown: {
      critical: 8,
      high: 15,
      medium: 18,
      low: 6
    }
  });

  const [items] = useState<ModerationItem[]>([
    {
      id: '1',
      type: 'post',
      content: 'Ce contenu contient des informations potentiellement trompeuses sur les événements récents. Veuillez vérifier avant de partager...',
      contentPreview: 'Ce contenu contient des informations potentiellement trompeuses sur les événements récents. Veuillez vérifier avant de partager...',
      reportedBy: 'john_doe_123',
      reportedAt: '2025-11-25 06:45:00',
      reason: 'Fake news et désinformation',
      category: 'fake_news',
      status: 'pending',
      priority: 'high',
      reportedByCount: 12,
      author: {
        id: 'user_001',
        name: 'Alice Martin',
        username: 'alice_m',
        verified: true,
        status: 'active'
      },
      automodScore: 85,
      moderationHistory: []
    },
    {
      id: '2',
      type: 'comment',
      content: 'Ce commentaire contient des insultes et du harcèlement envers d\'autres utilisateurs.',
      contentPreview: 'Ce commentaire contient des insultes et du harcèlement envers d\'autres utilisateurs.',
      reportedBy: 'sarah_wilson',
      reportedAt: '2025-11-25 06:30:00',
      reason: 'Harcèlement et insultes',
      category: 'harassment',
      status: 'pending',
      priority: 'critical',
      reportedByCount: 5,
      author: {
        id: 'user_002',
        name: 'Bob Dupont',
        username: 'bob_d',
        verified: false,
        status: 'active'
      },
      automodScore: 92,
      moderationHistory: []
    },
    {
      id: '3',
      type: 'media',
      content: 'Image de contenu sexual explicite',
      contentPreview: 'Image de contenu sexual explicite',
      reportedBy: 'content_mod',
      reportedAt: '2025-11-25 06:15:00',
      reason: 'Contenu sexuellement explicite',
      category: 'inappropriate',
      status: 'pending',
      priority: 'critical',
      reportedByCount: 3,
      author: {
        id: 'user_003',
        name: 'Camille Laurent',
        username: 'camille_l',
        verified: false,
        status: 'active'
      },
      attachments: [
        {
          type: 'image',
          url: '/moderation/image_001.jpg',
          thumbnail: '/moderation/thumb_001.jpg'
        }
      ],
      automodScore: 98,
      moderationHistory: []
    },
    {
      id: '4',
      type: 'post',
      content: 'Post de spam avec liens promotionnels répétés',
      contentPreview: 'Post de spam avec liens promotionnels répétés',
      reportedBy: 'auto_report',
      reportedAt: '2025-11-25 06:00:00',
      reason: 'Spam et promotion non autorisée',
      category: 'spam',
      status: 'approved',
      priority: 'medium',
      reportedByCount: 8,
      author: {
        id: 'user_004',
        name: 'David Bernard',
        username: 'david_b',
        verified: false,
        status: 'active'
      },
      moderationHistory: [
        {
          action: 'review_started',
          moderator: 'mod_001',
          timestamp: '2025-11-25 06:05:00'
        },
        {
          action: 'approved',
          moderator: 'mod_001',
          timestamp: '2025-11-25 06:10:00',
          note: 'Contenu validé comme spam - en cours de traitement'
        }
      ]
    },
    {
      id: '5',
      type: 'user_profile',
      content: 'Profil utilisateur avec informations fausse ou trompeuses',
      contentPreview: 'Profil utilisateur avec informations fausses ou trompeuses',
      reportedBy: 'trust_team',
      reportedAt: '2025-11-25 05:45:00',
      reason: 'Informations personnelles fausses',
      category: 'other',
      status: 'escalated',
      priority: 'high',
      reportedByCount: 2,
      author: {
        id: 'user_005',
        name: 'Emma Rousseau',
        username: 'emma_r',
        verified: false,
        status: 'active'
      },
      moderationHistory: [
        {
          action: 'review_started',
          moderator: 'mod_002',
          timestamp: '2025-11-25 05:50:00'
        },
        {
          action: 'escalated',
          moderator: 'mod_002',
          timestamp: '2025-11-25 06:00:00',
          note: 'Cas complexe - Escalade vers l\'équipe senior'
        }
      ]
    }
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'escalated':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'escalated':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'Critique'
      case 'high':
        return 'Élevée'
      case 'medium':
        return 'Moyenne'
      case 'low':
        return 'Faible'
      default:
        return priority
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'approved':
        return 'Approuvé'
      case 'rejected':
        return 'Rejeté'
      case 'escalated':
        return 'Escaladé'
      default:
        return status
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'post':
        return <FileText className="w-4 h-4" />
      case 'comment':
        return <MessageSquare className="w-4 h-4" />
      case 'media':
        return <Image className="w-4 h-4" />
      case 'user_profile':
        return <User className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'post':
        return 'Publication'
      case 'comment':
        return 'Commentaire'
      case 'media':
        return 'Média'
      case 'user_profile':
        return 'Profil'
      default:
        return type
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'spam':
        return 'Spam'
      case 'inappropriate':
        return 'Inapproprié'
      case 'harassment':
        return 'Harcèlement'
      case 'fake_news':
        return 'Fake News'
      case 'copyright':
        return 'Copyright'
      case 'other':
        return 'Autre'
      default:
        return category
    }
  }

  const filteredItems = items.filter(item => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false
    if (filterCategory !== 'all' && item.category !== filterCategory) return false
    if (filterPriority !== 'all' && item.priority !== filterPriority) return false
    if (searchQuery && !item.content.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !item.author.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const handleAction = async (itemId: string, action: string, note?: string) => {
    console.log(`Action ${action} on item ${itemId}`, { note })
    // Implementation would go here
  }

  const handleBulkAction = async (action: string) => {
    console.log(`Bulk action ${action} on items:`, selectedItems)
    setSelectedItems([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Modération du Contenu</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Gérer et modérer les contenus signalés
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Actualiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En Attente</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingItems}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Traitées Aujourd'hui</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.processedToday}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Temps Réponse Moyen</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.averageResponseTime}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Taux d'Approbation</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.approvalRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Répartition par Priorité</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">{stats.priorityBreakdown.critical}</p>
              <p className="text-sm text-gray-600">Critique</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">{stats.priorityBreakdown.high}</p>
              <p className="text-sm text-gray-600">Élevée</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-yellow-600">{stats.priorityBreakdown.medium}</p>
              <p className="text-sm text-gray-600">Moyenne</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-600">{stats.priorityBreakdown.low}</p>
              <p className="text-sm text-gray-600">Faible</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher contenus..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="approved">Approuvé</option>
                  <option value="rejected">Rejeté</option>
                  <option value="escalated">Escaladé</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Toutes catégories</option>
                  <option value="spam">Spam</option>
                  <option value="inappropriate">Inapproprié</option>
                  <option value="harassment">Harcèlement</option>
                  <option value="fake_news">Fake News</option>
                  <option value="copyright">Copyright</option>
                  <option value="other">Autre</option>
                </select>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Toutes priorités</option>
                  <option value="critical">Critique</option>
                  <option value="high">Élevée</option>
                  <option value="medium">Moyenne</option>
                  <option value="low">Faible</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Vue:</span>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Liste
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Grille
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-800">
                {selectedItems.length} élément(s) sélectionné(s)
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkAction('approve')}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Approuver
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Rejeter
                </button>
                <button
                  onClick={() => handleBulkAction('escalate')}
                  className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Escalader
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, item.id])
                        } else {
                          setSelectedItems(selectedItems.filter(id => id !== item.id))
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <span className="text-sm font-medium text-gray-700">
                        {getTypeText(item.type)}
                      </span>
                    </div>
                    <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(item.priority)}`}>
                      {getPriorityText(item.priority)}
                    </div>
                    {item.automodScore && (
                      <div className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full">
                        Auto: {item.automodScore}%
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(item.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Contenu</h3>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-700">{item.contentPreview}</p>
                      </div>
                    </div>

                    {item.attachments && item.attachments.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Pièces jointes</h4>
                        <div className="flex space-x-2">
                          {item.attachments.map((attachment, index) => (
                            <div key={index} className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center">
                              {attachment.type === 'image' ? (
                                <Image className="w-6 h-6 text-gray-400" />
                              ) : (
                                <FileText className="w-6 h-6 text-gray-400" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.moderationHistory.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Historique</h4>
                        <div className="space-y-2">
                          {item.moderationHistory.map((history, index) => (
                            <div key={index} className="flex items-center justify-between text-xs text-gray-600">
                              <span>{history.action} par {history.moderator}</span>
                              <span>{new Date(history.timestamp).toLocaleString('fr-FR')}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Auteur</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {item.author.name}
                              {item.author.verified && (
                                <CheckCircle className="w-3 h-3 text-blue-500 inline ml-1" />
                              )}
                            </p>
                            <p className="text-xs text-gray-500">@{item.author.username}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Signalement</h4>
                        <div className="text-sm text-gray-600">
                          <p><span className="font-medium">Raison:</span> {getCategoryText(item.category)}</p>
                          <p><span className="font-medium">Signalé par:</span> {item.reportedByCount} utilisateur(s)</p>
                          <p><span className="font-medium">Le:</span> {new Date(item.reportedAt).toLocaleString('fr-FR')}</p>
                        </div>
                      </div>

                      {item.status === 'pending' && (
                        <div className="space-y-2">
                          <button
                            onClick={() => handleAction(item.id, 'approve')}
                            className="w-full flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approuver
                          </button>
                          <button
                            onClick={() => handleAction(item.id, 'reject')}
                            className="w-full flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Rejeter
                          </button>
                          <button
                            onClick={() => handleAction(item.id, 'escalate')}
                            className="w-full flex items-center justify-center px-3 py-2 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700"
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Escalader
                          </button>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </button>
                        <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-sm rounded-md hover:bg-gray-50">
                          <Edit className="w-4 h-4 mr-1" />
                          Éditer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Affichage de {filteredItems.length} élément(s)
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              Précédent
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-blue-600 bg-blue-50">
              1
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}