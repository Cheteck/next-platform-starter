'use client'

import { useState } from 'react'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Heart, 
  Eye,
  Settings,
  BarChart3,
  Star,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Download,
  Share,
  Bookmark,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  Cpu,
  Database,
  Network,
  Shield,
  Sparkles,
  ArrowRight,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Activity,
  Book
} from 'lucide-react'

// Types pour l'IA et recommandations
interface AIInsight {
  id: string
  type: 'trend' | 'opportunity' | 'recommendation' | 'alert'
  title: string
  description: string
  confidence: number
  impact: 'low' | 'medium' | 'high'
  category: string
  timestamp: string
  actionable: boolean
  tags: string[]
}

interface Recommendation {
  id: string
  title: string
  description: string
  type: 'product' | 'content' | 'user' | 'content' | 'search'
  reason: string
  confidence: number
  relevanceScore: number
  personalized: boolean
  category: string
  imageUrl?: string
  price?: string
  rating?: number
  views?: number
  liked?: boolean
  saved?: boolean
}

interface AIStats {
  totalRecommendations: string
  accuracy: number
  engagementIncrease: number
  conversionRate: number
  satisfactionScore: number
}

interface LearningData {
  clicks: number
  likes: number
  shares: number
  timeSpent: number
  searchQueries: number
  purchases: number
}

export default function AIPage() {
  const [activeTab, setActiveTab] = useState<'insights' | 'recommendations' | 'analytics' | 'settings'>('insights')
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [recommendationFilter, setRecommendationFilter] = useState<'all' | 'products' | 'content' | 'people'>('all')
  const [aiEnabled, setAiEnabled] = useState(true)

  // Données des insights IA
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'trend',
      title: 'Montée des produits éco-responsables',
      description: 'Les articles écologiquement durables montrent une augmentation de 47% d\'engagement cette semaine.',
      confidence: 89,
      impact: 'high',
      category: 'Tendances produits',
      timestamp: '2025-01-20T10:30:00Z',
      actionable: true,
      tags: ['eco-friendly', 'sustainability', 'market-trend']
    },
    {
      id: '2',
      type: 'opportunity',
      title: 'Audience sous-exploitée détectée',
      description: 'Groupe d\'utilisateurs 25-34 ans particulièrement actif en soirée (19h-22h) mais peu ciblé.',
      confidence: 76,
      impact: 'medium',
      category: 'Opportunités marketing',
      timestamp: '2025-01-20T09:15:00Z',
      actionable: true,
      tags: ['audience-targeting', 'timing', 'segmentation']
    },
    {
      id: '3',
      type: 'alert',
      title: 'Baisse de performance détectée',
      description: 'Réduction de 23% des interactions sur les posts technique entre 12h-14h.',
      confidence: 92,
      impact: 'medium',
      category: 'Performance',
      timestamp: '2025-01-20T08:45:00Z',
      actionable: true,
      tags: ['performance', 'timing', 'content-type']
    },
    {
      id: '4',
      type: 'recommendation',
      title: 'Optimisation du contenu recommandée',
      description: 'Les vidéos courtes (< 30s) génèrent 3x plus d\'engagement que le contenu long.',
      confidence: 94,
      impact: 'high',
      category: 'Stratégie contenu',
      timestamp: '2025-01-20T07:20:00Z',
      actionable: true,
      tags: ['content-strategy', 'video', 'engagement']
    }
  ]

  // Données des recommandations personnalisées
  const recommendations: Recommendation[] = [
    {
      id: '1',
      title: 'Écouteurs Sans Fil Premium',
      description: 'Recommandés pour vous basés sur vos achats précédents et avis similaires',
      type: 'product',
      reason: 'Vous avez acheté des écouteurs similaires et avez noté des produits tech',
      confidence: 87,
      relevanceScore: 9.2,
      personalized: true,
      category: 'Technologie',
      imageUrl: '/imgs/wireless-headphones.jpg',
      price: '199€',
      rating: 4.8,
      views: 1542,
      liked: false,
      saved: true
    },
    {
      id: '2',
      title: 'Guide Complet React 2025',
      description: 'Contenu recommandé basé sur vos centres d\'intérêt programmation',
      type: 'content',
      reason: 'Vous consultez fréquemment du contenu sur le développement web',
      confidence: 91,
      relevanceScore: 9.5,
      personalized: true,
      category: 'Formation',
      imageUrl: '/imgs/react-guide.jpg',
      rating: 4.9,
      views: 3240,
      liked: true,
      saved: false
    },
    {
      id: '3',
      title: 'Sophie Martin - UX Designer',
      description: 'Proposée car vous suivez des designers et travaillez dans le tech',
      type: 'user',
      reason: 'Similarité avec votre réseau professionnel et centres d\'intérêt',
      confidence: 78,
      relevanceScore: 8.7,
      personalized: true,
      category: 'Professionnel',
      imageUrl: '/imgs/sophie-profile.jpg',
      rating: 4.6,
      views: 234,
      liked: true,
      saved: false
    },
    {
      id: '4',
      title: 'Recherches "IA Marketing"',
      description: 'Recommandations basées sur vos recherches récentes',
      type: 'search',
      reason: 'Recherches liées détectées dans votre historique',
      confidence: 82,
      relevanceScore: 8.9,
      personalized: true,
      category: 'Recherche',
      rating: 4.7,
      views: 892,
      liked: false,
      saved: true
    }
  ]

  // Statistiques IA
  const aiStats: AIStats = {
    totalRecommendations: '12.5K',
    accuracy: 87.3,
    engagementIncrease: 34.5,
    conversionRate: 8.9,
    satisfactionScore: 4.6
  }

  // Données d'apprentissage (simulées)
  const learningData: LearningData = {
    clicks: 1250,
    likes: 342,
    shares: 89,
    timeSpent: 156, // minutes
    searchQueries: 67,
    purchases: 23
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-5 h-5" />
      case 'opportunity': return <Lightbulb className="w-5 h-5" />
      case 'alert': return <AlertCircle className="w-5 h-5" />
      case 'recommendation': return <Target className="w-5 h-5" />
      default: return <Brain className="w-5 h-5" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend': return 'text-blue-600 bg-blue-100'
      case 'opportunity': return 'text-green-600 bg-green-100'
      case 'alert': return 'text-red-600 bg-red-100'
      case 'recommendation': return 'text-purple-600 bg-purple-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Il y a moins d\'une heure'
    if (hours < 24) return `Il y a ${hours}h`
    return `Il y a ${Math.floor(hours / 24)} jour(s)`
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return <ShoppingBag className="w-4 h-4" />
      case 'content': return <Book className="w-4 h-4" />
      case 'user': return <Users className="w-4 h-4" />
      case 'search': return <Search className="w-4 h-4" />
      default: return <Star className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-fuchsia-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">IA & Recommandations</h1>
                <p className="text-gray-600 mt-1">Intelligence artificielle personnalisée pour vous</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${aiEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-sm text-gray-600">
                  IA {aiEnabled ? 'Active' : 'Inactive'}
                </span>
              </div>
              <button
                onClick={() => setAiEnabled(!aiEnabled)}
                className={`px-4 py-2 rounded-lg font-medium text-sm ${
                  aiEnabled 
                    ? 'bg-violet-600 text-white hover:bg-violet-700' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {aiEnabled ? 'Désactiver' : 'Activer'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Overview Stats */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">{aiStats.totalRecommendations}</div>
              <div className="text-violet-200 text-sm">Recommandations générées</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{aiStats.accuracy}%</div>
              <div className="text-violet-200 text-sm">Précision IA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">+{aiStats.engagementIncrease}%</div>
              <div className="text-violet-200 text-sm">Augmentation engagement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{aiStats.conversionRate}%</div>
              <div className="text-violet-200 text-sm">Taux de conversion</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <div className="text-3xl font-bold">{aiStats.satisfactionScore}</div>
              </div>
              <div className="text-violet-200 text-sm">Satisfaction utilisateur</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'insights', label: 'Insights IA', icon: Brain },
              { id: 'recommendations', label: 'Recommandations', icon: Target },
              { id: 'analytics', label: 'Analytiques', icon: BarChart3 },
              { id: 'settings', label: 'Paramètres', icon: Settings }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === id
                    ? 'border-violet-500 text-violet-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Insights & Analyses IA</h2>
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">90 derniers jours</option>
                  <option value="1y">1 an</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                  <RefreshCw className="w-4 h-4" />
                  <span>Actualiser</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-violet-500">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getInsightColor(insight.type)}`}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <p className="text-sm text-gray-600">{insight.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                        Impact {insight.impact === 'high' ? 'élevé' : insight.impact === 'medium' ? 'moyen' : 'faible'}
                      </span>
                      <span className="text-sm text-gray-500">{insight.confidence}%</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-wrap gap-1">
                        {insight.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{formatTimestamp(insight.timestamp)}</span>
                      {insight.actionable && (
                        <button className="text-violet-600 hover:text-violet-700">
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Learning Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Apprentissage en cours</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-violet-600">{learningData.clicks}</div>
                  <div className="text-gray-600 text-sm">Clics analysés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-fuchsia-600">{learningData.timeSpent}min</div>
                  <div className="text-gray-600 text-sm">Temps d'engagement</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-600">{learningData.purchases}</div>
                  <div className="text-gray-600 text-sm">Conversions</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Recommandations personnalisées</h2>
              <div className="flex items-center space-x-3">
                <select 
                  value={recommendationFilter}
                  onChange={(e) => setRecommendationFilter(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="all">Tous</option>
                  <option value="products">Produits</option>
                  <option value="content">Contenu</option>
                  <option value="people">Personnes</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
                  <RefreshCw className="w-4 h-4" />
                  <span>Actualiser</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations
                .filter(rec => recommendationFilter === 'all' || rec.type === recommendationFilter)
                .map((rec) => (
                <div key={rec.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-violet-100 rounded-lg">
                          {getTypeIcon(rec.type)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                            {rec.personalized && (
                              <Sparkles className="w-4 h-4 text-violet-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{rec.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-violet-600">{rec.confidence}%</div>
                        <div className="text-xs text-gray-500">Confiance</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{rec.description}</p>
                    <p className="text-sm text-gray-600 mb-4">💡 {rec.reason}</p>
                    
                    {rec.price && (
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-green-600">{rec.price}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{rec.rating}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className={`p-2 rounded-lg ${rec.liked ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500'}`}>
                          <Heart className="w-5 h-5" />
                        </button>
                        <button className={`p-2 rounded-lg ${rec.saved ? 'text-violet-500 bg-violet-50' : 'text-gray-400 hover:text-violet-500'}`}>
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-violet-500 rounded-lg">
                          <Share className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{rec.views} vues</span>
                        <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 text-sm">
                          Voir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Analytiques IA</h2>
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">90 derniers jours</option>
                  <option value="1y">1 an</option>
                </select>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  <span>Exporter</span>
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Précision IA</p>
                    <p className="text-2xl font-bold text-violet-600">{aiStats.accuracy}%</p>
                  </div>
                  <div className="p-3 bg-violet-100 rounded-full">
                    <Target className="w-6 h-6 text-violet-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+2.3%</span>
                  <span className="text-gray-500 ml-1">vs mois dernier</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Engagement</p>
                    <p className="text-2xl font-bold text-green-600">+{aiStats.engagementIncrease}%</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+5.1%</span>
                  <span className="text-gray-500 ml-1">vs mois dernier</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversions</p>
                    <p className="text-2xl font-bold text-blue-600">{aiStats.conversionRate}%</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+1.8%</span>
                  <span className="text-gray-500 ml-1">vs mois dernier</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Satisfaction</p>
                    <p className="text-2xl font-bold text-purple-600">{aiStats.satisfactionScore}/5</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+0.2</span>
                  <span className="text-gray-500 ml-1">vs mois dernier</span>
                </div>
              </div>
            </div>

            {/* AI Learning Activity Chart (Mock) */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité d'apprentissage</h3>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-2" />
                  <p>Graphique d'activité d'apprentissage IA</p>
                  <p className="text-sm">Données en temps réel des interactions</p>
                </div>
              </div>
            </div>

            {/* User Behavior Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Comportement utilisateur</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-700">Pages vues</span>
                    </div>
                    <span className="font-semibold">8,432</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-gray-700">Interactions likées</span>
                    </div>
                    <span className="font-semibold">1,234</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Commentaires</span>
                    </div>
                    <span className="font-semibold">456</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ShoppingBag className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-700">Achats</span>
                    </div>
                    <span className="font-semibold">89</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences détectées</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Technologie</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-violet-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <span className="text-sm font-medium">87%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Business</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                      <span className="text-sm font-medium">72%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Lifestyle</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Formation</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                      <span className="text-sm font-medium">91%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres de l'IA</h2>

            {/* AI Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statut de l'intelligence artificielle</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${aiEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      IA {aiEnabled ? 'Activée' : 'Désactivée'}
                    </p>
                    <p className="text-sm text-gray-600">
                      {aiEnabled ? 'Recommandations et insights actifs' : 'Les fonctionnalités IA sont désactivées'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setAiEnabled(!aiEnabled)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    aiEnabled 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {aiEnabled ? 'Désactiver' : 'Activer'}
                </button>
              </div>
            </div>

            {/* AI Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences IA</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Recommandations personnalisées</p>
                    <p className="text-sm text-gray-600">Recevoir des suggestions basées sur votre activité</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Notifications d'insights</p>
                    <p className="text-sm text-gray-600">Être alerté des nouvelles analyses importantes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Apprentissage améliorant</p>
                    <p className="text-sm text-gray-600">Permettre à l'IA d'apprendre de vos interactions</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Partage de données anonyme</p>
                    <p className="text-sm text-gray-600">Aider à améliorer l'IA en partageant des données anonymisées</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Data Privacy */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confidentialité des données</h3>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">Données utilisées par l'IA</p>
                    <button className="text-violet-600 hover:text-violet-700 text-sm font-medium">
                      Voir détails
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    L'IA utilise vos interactions, préférences et historique pour améliorer les recommandations.
                  </p>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-gray-900">Durée de conservation</p>
                    <span className="text-sm text-gray-600">12 mois</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Vos données sont conservées pendant 12 mois puis automatiquement supprimées.
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4">
                  <button className="px-4 py-2 border border-violet-600 text-violet-600 rounded-lg hover:bg-violet-50">
                    Exporter mes données
                  </button>
                  <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
                    Supprimer toutes les données
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Learning Footer */}
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Intelligence Artificielle Continue</h2>
            </div>
            <p className="text-xl text-violet-100 mb-6">
              Notre IA apprend et s'améliore constamment pour vous offrir une expérience toujours plus personnalisée
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Cpu className="w-8 h-8 mx-auto mb-2" />
                <div className="text-lg font-semibold">Apprentissage Continu</div>
                <div className="text-sm text-violet-200">Modèles IA mis à jour quotidiennement</div>
              </div>
              <div className="text-center">
                <Database className="w-8 h-8 mx-auto mb-2" />
                <div className="text-lg font-semibold">Big Data</div>
                <div className="text-sm text-violet-200">Analyse de millions d'interactions</div>
              </div>
              <div className="text-center">
                <Network className="w-8 h-8 mx-auto mb-2" />
                <div className="text-lg font-semibold">Réseau Neuronal</div>
                <div className="text-sm text-violet-200">Algorithmes de deep learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}